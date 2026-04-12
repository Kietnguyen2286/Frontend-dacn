# Backend Test Structure

## Unit tests

Each backend module has its own folder:

- tests/unit/auth
- tests/unit/employees
- tests/unit/leaves
- tests/unit/attendance
- tests/unit/salary
- tests/unit/expenses
- tests/unit/kpi

Run unit tests:

```bash
npm run test:unit
```

## API tests (Postman + Newman)

Module definitions are split by folder:

- tests/api/modules/health
- tests/api/modules/auth
- tests/api/modules/employees
- tests/api/modules/leaves
- tests/api/modules/attendance
- tests/api/modules/salary
- tests/api/modules/expenses
- tests/api/modules/kpi

Generate the combined collection:

```bash
npm run test:api:build
```

Generated file:

- tests/api/postman_collection.json

Run with parser script from workspace root:

```bash
python test/parse_newman.py Backend-dacn/tests/api/postman_collection.json -o Backend-dacn/tests/api
```

Generated run result:

- tests/api/test_run.json
