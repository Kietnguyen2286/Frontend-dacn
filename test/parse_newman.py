import json
import re
import uuid
import argparse
import subprocess
import os
import tempfile
from datetime import datetime, timezone


def _safe_response_code(execution):
    response = execution.get("response") or {}
    return int(response.get("code") or 0)


def _safe_response_status(execution):
    response = execution.get("response") or {}
    return response.get("status") or ""


def _safe_response_time(execution):
    response = execution.get("response") or {}
    value = response.get("responseTime")
    return int(value) if isinstance(value, (int, float)) else 0


def _build_url_from_request(request):
    url_obj = request.get("url") if isinstance(request, dict) else None
    if not url_obj:
        return ""

    if isinstance(url_obj, str):
        return url_obj

    raw = url_obj.get("raw")
    if raw:
        return raw

    host = url_obj.get("host") or []
    port = url_obj.get("port")
    path = url_obj.get("path") or []
    query = url_obj.get("query") or []

    host_str = "".join(host) if isinstance(host, list) else str(host)
    path_str = "/".join(path) if isinstance(path, list) else str(path)

    # host may already include protocol, as in "http://localhost:8080"
    if host_str.startswith("http://") or host_str.startswith("https://"):
        base = host_str.rstrip("/")
    else:
        protocol = url_obj.get("protocol") or "http"
        base = f"{protocol}://{host_str}" if host_str else ""

    if port and base and ":" not in base.split("//", 1)[-1]:
        base = f"{base}:{port}"

    url = f"{base}/{path_str}" if path_str else base

    if query and isinstance(query, list):
        kv = []
        for q in query:
            key = q.get("key")
            value = q.get("value")
            if key is not None:
                kv.append(f"{key}={value}" if value is not None else str(key))
        if kv:
            joiner = "&" if "?" in url else "?"
            url = f"{url}{joiner}{'&'.join(kv)}"

    return url


def _extract_tests_from_assertions(assertions):
    """Returns (tests_map, counts_map, all_tests_obj, pass_count, fail_count)."""
    tests = {}
    counts = {}
    all_tests = {}
    pass_count = 0
    fail_count = 0

    for assertion in assertions:
        name = assertion.get("assertion") or "Unnamed assertion"
        error = assertion.get("error")
        passed = error is None
        tests[name] = passed
        counts[name] = {"pass": 1 if passed else 0, "fail": 0 if passed else 1}
        all_tests[name] = passed
        if passed:
            pass_count += 1
        else:
            fail_count += 1

    return tests, counts, all_tests, pass_count, fail_count


def parse_newman_json_report(report_data, collection_name_from_file=""):
    run = report_data.get("run") or {}
    executions = run.get("executions") or []

    collection_name = collection_name_from_file or (report_data.get("collection") or {}).get("name") or ""
    started_at = report_data.get("timestamp") or datetime.now(timezone.utc).isoformat()

    results = []
    total_pass = 0
    total_fail = 0
    seen_positions = set()

    for execution in executions:
        item = execution.get("item") or {}
        cursor = execution.get("cursor") or {}
        request = execution.get("request") or {}
        method = request.get("method") or "GET"
        url = _build_url_from_request(request)

        dedupe_key = (cursor.get("iteration"), cursor.get("position"), item.get("name"))
        if dedupe_key in seen_positions:
            continue
        seen_positions.add(dedupe_key)

        assertions = execution.get("assertions") or []
        tests, test_pass_fail_counts, all_tests_obj, pass_count, fail_count = _extract_tests_from_assertions(assertions)
        total_pass += pass_count
        total_fail += fail_count

        time_ms = _safe_response_time(execution)
        results.append({
            "id": str(uuid.uuid4()),
            "name": item.get("name") or "",
            "url": url,
            "time": time_ms,
            "responseCode": {
                "code": _safe_response_code(execution),
                "name": _safe_response_status(execution)
            },
            "tests": tests,
            "testPassFailCounts": test_pass_fail_counts,
            "times": [time_ms],
            "allTests": [all_tests_obj],
            "_method": method
        })

    output = {
        "id": str(uuid.uuid4()),
        "name": collection_name,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "collection_id": str(uuid.uuid4()),
        "folder_id": 0,
        "environment_id": "0",
        "totalPass": total_pass,
        "delay": 0,
        "persist": True,
        "status": "finished",
        "startedAt": started_at,
        "totalFail": total_fail,
        "results": results,
        "count": 1,
        "totalTime": sum(r["time"] for r in results),
        "collection": {
            "requests": [{"id": r["id"], "method": r.get("_method", "GET")} for r in results]
        }
    }

    for r in results:
        if "_method" in r:
            del r["_method"]

    return output

def run_newman_json(collection_path):
    """Runs newman and returns parsed JSON reporter output."""
    print(f"Running newman on {collection_path}...")
    with tempfile.NamedTemporaryFile(delete=False, suffix=".json") as tmp:
        report_path = tmp.name

    try:
        # Use shell=True on Windows to find newman in PATH.
        # JSON reporter gives stable structured output regardless of console format.
        command = (
            f"newman run \"{collection_path}\" "
            f"--reporters json "
            f"--reporter-json-export \"{report_path}\""
        )
        subprocess.run(command, capture_output=True, text=True, encoding='utf-8', check=False, shell=True)

        if not os.path.exists(report_path):
            return None
        with open(report_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        print("Error: newman is not installed or not in PATH.")
        exit(1)
    finally:
        if os.path.exists(report_path):
            try:
                os.remove(report_path)
            except OSError:
                pass

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run Newman and generate a Postman test run JSON.")
    parser.add_argument("collection", help="Path to the Postman collection JSON file.")
    parser.add_argument("-o", "--output-dir", help="Directory to save the output JSON. Defaults to the collection's directory.", default=None)
    
    args = parser.parse_args()
    
    collection_path = args.collection
    if not os.path.exists(collection_path):
        print(f"Error: Collection file not found at {collection_path}")
        exit(1)
        
    output_dir = args.output_dir
    if output_dir is None:
        output_dir = os.path.dirname(os.path.abspath(collection_path))
        
    if not os.path.exists(output_dir):
        os.makedirs(output_dir, exist_ok=True)
        
    # Run newman and get JSON report
    newman_report = run_newman_json(collection_path)

    if not newman_report:
        print("Error: Newman did not produce JSON report. Make sure newman is installed and the collection path is correct.")
        exit(1)
        
    # Extract collection name from the JSON file
    collection_name = ""
    try:
        with open(collection_path, 'r', encoding='utf-8') as f:
            collection_data = json.load(f)
            collection_name = collection_data.get("info", {}).get("name", "")
    except Exception as e:
        print(f"Warning: Could not read collection name from file: {e}")
        
    # Parse output
    parsed_json = parse_newman_json_report(newman_report, collection_name)
    
    # Generate output filename based on collection name
    collection_filename = os.path.basename(collection_path)
    # Remove file extension and sanitize name
    collection_name = os.path.splitext(collection_filename)[0]
    output_filename = "test_run.json"
    output_path = os.path.join(output_dir, output_filename)
    
    # Save JSON
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(parsed_json, f, indent=4)
        
    print(f"Test run JSON saved to: {output_path}")