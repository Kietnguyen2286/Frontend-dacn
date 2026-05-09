(@tran_employee_id, 17500000, 1500000, 0, '2025-10-01', NOW(), NOW()),
-- ============================================================================

(@tran_employee_id, 'Finance Assistant', 'Junior Accountant', 'Finance', 'Finance', '2023-03-10', 'Initial hire', NOW()),
(@tran_employee_id, 'Accountant', 'Senior Accountant', 'Finance', 'Finance', '2025-10-15', 'Promotion - audit and close ownership', NOW());
-- USE employee_management_db;

-- Uncomment above if database doesn't exist, otherwise just use:
USE railway;

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER DATABASE railway CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE users CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE employees CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE leaves CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE attendance CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE salaries CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE expenses CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE kpis CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE work_history CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

SET @drop_salaries_unique = (
	SELECT IF(
		EXISTS(
			SELECT 1
			FROM information_schema.statistics
			WHERE table_schema = DATABASE()
				AND table_name = 'salaries'
				AND index_name = 'employee_id'
				AND non_unique = 0
		),
		'ALTER TABLE salaries DROP INDEX employee_id',
		'SELECT 1'
	)
);
PREPARE stmt FROM @drop_salaries_unique;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ============================================================================
-- STEP 2: Delete existing data (CAREFUL - this will delete all data!)
-- ============================================================================
DELETE FROM work_history;
DELETE FROM kpis;
DELETE FROM salaries;
DELETE FROM attendance;
DELETE FROM expenses;
DELETE FROM leaves;
DELETE FROM employees;
DELETE FROM users;

-- ============================================================================
-- STEP 3: INSERT USERS
-- ============================================================================
-- Test Accounts:
-- 1. Username: admin, Password: admin123
-- 2. Username: employee, Password: emp123  
-- 3. Username: nguyenvana, Password: Pass123!
-- 4. Username: tranvanb, Password: Pass123!

INSERT INTO users (username, password_hash, name, email, role, created_at, updated_at) 
VALUES 
('admin', '$2a$10$2QakONQqxZfpi5QhTH/AR.PFoaL9talll2u3Nym4uK3g9/qP/X/UW', 'Administrator', 'admin@company.com', 'admin', NOW(), NOW()),
('employee', '$2a$10$oR8lp3RvjrQXnr4j6jdJq.giSS1l6b5JJ2MD94iORHWChjN1x1MXW', 'John Doe', 'john@company.com', 'employee', NOW(), NOW()),
('nguyenvana', '$2a$10$K5ZWx6qKJPDd6.HgPf8dF.J8qKF5VjzKLVJmrRCvKIQ8FEQk5gWEC', 'Nguyễn Văn A', 'vana@company.com', 'employee', NOW(), NOW()),
('tranvanb', '$2a$10$K5ZWx6qKJPDd6.HgPf8dF.J8qKF5VjzKLVJmrRCvKIQ8FEQk5gWEC', 'Trần Văn B', 'vanb@company.com', 'employee', NOW(), NOW());

SET @admin_user_id = (SELECT id FROM users WHERE username = 'admin');
SET @employee_user_id = (SELECT id FROM users WHERE username = 'employee');
SET @nguyenvana_user_id = (SELECT id FROM users WHERE username = 'nguyenvana');
SET @tranvanb_user_id = (SELECT id FROM users WHERE username = 'tranvanb');

-- ============================================================================
-- STEP 4: INSERT EMPLOYEES
-- ============================================================================
INSERT INTO employees (user_id, employee_id, first_name, last_name, email, phone, department, position, hire_date, salary_grade, status, created_at, updated_at)
VALUES
(@employee_user_id, 'EMP001', 'John', 'Doe', 'john@company.com', '0981234567', 'IT', 'Backend Developer', '2023-01-15', 'Senior', 'active', NOW(), NOW()),
(@nguyenvana_user_id, 'EMP002', 'Nguyễn', 'Văn A', 'vana@company.com', '0982345678', 'HR', 'HR Manager', '2022-06-01', 'Senior', 'active', NOW(), NOW()),
(@tranvanb_user_id, 'EMP003', 'Trần', 'Văn B', 'vanb@company.com', '0983456789', 'Finance', 'Accountant', '2023-03-10', 'Junior', 'active', NOW(), NOW());

SET @john_employee_id = (SELECT id FROM employees WHERE employee_id = 'EMP001');
SET @nguyen_employee_id = (SELECT id FROM employees WHERE employee_id = 'EMP002');
SET @tran_employee_id = (SELECT id FROM employees WHERE employee_id = 'EMP003');

-- ============================================================================
-- STEP 5: INSERT LEAVES (30 records total)
-- ============================================================================
INSERT INTO leaves (employee_id, leave_type, start_date, end_date, reason, status, created_at, updated_at)
VALUES
-- Employee 1 (John Doe) - 12 records
(@john_employee_id, 'annual', '2025-12-15', '2025-12-20', 'Holiday vacation', 'approved', NOW(), NOW()),
(@john_employee_id, 'sick', '2025-11-05', '2025-11-06', 'Medical appointment', 'approved', NOW(), NOW()),
(@john_employee_id, 'annual', '2026-01-10', '2026-01-12', 'New Year break', 'pending', NOW(), NOW()),
(@john_employee_id, 'annual', '2026-01-20', '2026-01-25', 'Family visit', 'pending', NOW(), NOW()),
(@john_employee_id, 'personal', '2025-10-20', '2025-10-20', 'Personal business', 'approved', NOW(), NOW()),
(@john_employee_id, 'annual', '2026-02-05', '2026-02-08', 'Tet holiday', 'approved', NOW(), NOW()),
(@john_employee_id, 'sick', '2026-02-15', '2026-02-16', 'Flu', 'pending', NOW(), NOW()),
(@john_employee_id, 'annual', '2026-02-25', '2026-02-28', 'Spring break', 'approved', NOW(), NOW()),
(@john_employee_id, 'personal', '2026-03-10', '2026-03-10', 'Children school', 'approved', NOW(), NOW()),
(@john_employee_id, 'annual', '2026-03-15', '2026-03-18', 'Easter holiday', 'pending', NOW(), NOW()),
(@john_employee_id, 'sick', '2026-03-20', '2026-03-20', 'Migraine', 'approved', NOW(), NOW()),
(@john_employee_id, 'annual', '2026-03-25', '2026-03-30', 'Summer break', 'approved', NOW(), NOW()),

-- Employee 2 (Nguyễn Văn A) - 10 records
(@nguyen_employee_id, 'annual', '2025-12-10', '2025-12-15', 'Holiday', 'approved', NOW(), NOW()),
(@nguyen_employee_id, 'sick', '2025-11-01', '2025-11-02', 'Doctor visit', 'approved', NOW(), NOW()),
(@nguyen_employee_id, 'annual', '2026-01-15', '2026-01-18', 'New Year break', 'approved', NOW(), NOW()),
(@nguyen_employee_id, 'personal', '2025-12-20', '2025-12-20', 'Family event', 'pending', NOW(), NOW()),
(@nguyen_employee_id, 'annual', '2026-02-10', '2026-02-12', 'Mid-year break', 'approved', NOW(), NOW()),
(@nguyen_employee_id, 'sick', '2026-02-20', '2026-02-21', 'Cold', 'pending', NOW(), NOW()),
(@nguyen_employee_id, 'annual', '2026-03-05', '2026-03-08', 'Spring holiday', 'approved', NOW(), NOW()),
(@nguyen_employee_id, 'personal', '2026-03-15', '2026-03-15', 'Office task', 'approved', NOW(), NOW()),
(@nguyen_employee_id, 'annual', '2026-04-10', '2026-04-15', 'April vacation', 'pending', NOW(), NOW()),
(@nguyen_employee_id, 'sick', '2026-04-20', '2026-04-20', 'Headache', 'approved', NOW(), NOW()),

-- Employee 3 (Trần Văn B) - 8 records
(@tran_employee_id, 'annual', '2025-12-01', '2025-12-05', 'Holiday', 'approved', NOW(), NOW()),
(@tran_employee_id, 'sick', '2025-11-10', '2025-11-11', 'Sick leave', 'approved', NOW(), NOW()),
(@tran_employee_id, 'annual', '2026-01-20', '2026-01-22', 'New Year', 'approved', NOW(), NOW()),
(@tran_employee_id, 'personal', '2025-12-25', '2025-12-25', 'Birthday', 'approved', NOW(), NOW()),
(@tran_employee_id, 'annual', '2026-02-15', '2026-02-18', 'Tet holiday', 'approved', NOW(), NOW()),
(@tran_employee_id, 'sick', '2026-03-01', '2026-03-01', 'Dental', 'pending', NOW(), NOW()),
(@tran_employee_id, 'annual', '2026-03-20', '2026-03-25', 'Spring break', 'pending', NOW(), NOW()),
(@tran_employee_id, 'personal', '2026-04-10', '2026-04-10', 'Personal business', 'approved', NOW(), NOW());

-- ============================================================================
-- STEP 6: INSERT EXPENSES (25 records total)
-- ============================================================================
INSERT INTO expenses (employee_id, amount, description, category, date, status, created_at, updated_at)
VALUES
-- Employee 1 (John Doe) - 10 expenses
(@john_employee_id, 5000000, 'Máy in, giấy A4, bút viết', 'Văn phòng phẩm', '2026-01-05', 'approved', NOW(), NOW()),
(@john_employee_id, 8000000, 'Hóa đơn tháng 12/2025', 'Điện nước', '2026-01-01', 'approved', NOW(), NOW()),
(@john_employee_id, 15000000, 'Chi phí quảng cáo Facebook Ads', 'Marketing', '2026-01-03', 'pending', NOW(), NOW()),
(@john_employee_id, 12000000, 'Khóa học React Advanced', 'Đào tạo', '2026-01-02', 'approved', NOW(), NOW()),
(@john_employee_id, 3500000, 'Mua bàn ghế văn phòng', 'Văn phòng phẩm', '2026-01-04', 'approved', NOW(), NOW()),
(@john_employee_id, 20000000, 'Quảng cáo Google Ads', 'Marketing', '2026-01-06', 'pending', NOW(), NOW()),
(@john_employee_id, 25000000, 'Tham dự hội thảo HN', 'Du lịch công tác', '2026-01-08', 'approved', NOW(), NOW()),
(@john_employee_id, 18000000, 'Bảo hiểm sức khỏe nhân viên', 'Bảo hiểm', '2026-01-10', 'approved', NOW(), NOW()),
(@john_employee_id, 6000000, 'Mua tài liệu in ấn', 'Văn phòng phẩm', '2026-01-12', 'pending', NOW(), NOW()),
(@john_employee_id, 7500000, 'Hóa đơn tháng 01/2026', 'Điện nước', '2026-01-15', 'approved', NOW(), NOW()),

-- Employee 2 (Nguyễn Văn A) - 8 expenses
(@nguyen_employee_id, 4000000, 'Tuyển dụng quảng cáo', 'Marketing', '2026-01-07', 'approved', NOW(), NOW()),
(@nguyen_employee_id, 10000000, 'Hội thảo nhân sự', 'Đào tạo', '2026-01-09', 'approved', NOW(), NOW()),
(@nguyen_employee_id, 3000000, 'Phòng họp setup', 'Văn phòng phẩm', '2026-01-11', 'pending', NOW(), NOW()),
(@nguyen_employee_id, 9000000, 'Công cụ HR software', 'Công nghệ', '2026-01-13', 'approved', NOW(), NOW()),
(@nguyen_employee_id, 5500000, 'Team building event', 'Khác', '2026-01-14', 'pending', NOW(), NOW()),
(@nguyen_employee_id, 6000000, 'Văn phòng supplies', 'Văn phòng phẩm', '2026-01-16', 'approved', NOW(), NOW()),
(@nguyen_employee_id, 11000000, 'Tuyên dụng event', 'Marketing', '2026-01-17', 'approved', NOW(), NOW()),
(@nguyen_employee_id, 2500000, 'Coffee supplies', 'Khác', '2026-01-18', 'approved', NOW(), NOW()),

-- Employee 3 (Trần Văn B) - 7 expenses
(@tran_employee_id, 7000000, 'Báo cáo tài chính dịch vụ', 'Tư vấn', '2026-01-08', 'approved', NOW(), NOW()),
(@tran_employee_id, 3000000, 'Software accounting', 'Công nghệ', '2026-01-10', 'approved', NOW(), NOW()),
(@tran_employee_id, 12000000, 'Audit external', 'Kiểm toán', '2026-01-12', 'pending', NOW(), NOW()),
(@tran_employee_id, 4500000, 'Tài liệu kế toán', 'Văn phòng phẩm', '2026-01-14', 'approved', NOW(), NOW()),
(@tran_employee_id, 8000000, 'Training kế toán', 'Đào tạo', '2026-01-15', 'pending', NOW(), NOW()),
(@tran_employee_id, 2000000, 'Bút và sổ', 'Văn phòng phẩm', '2026-01-17', 'approved', NOW(), NOW()),
(@tran_employee_id, 5500000, 'Báo cáo ngân hàng', 'Khác', '2026-01-19', 'approved', NOW(), NOW());

-- ============================================================================
-- STEP 7: INSERT SALARIES (15 records)
-- ============================================================================
INSERT INTO salaries (employee_id, base_salary, allowances, deductions, effective_date, created_at, updated_at)
VALUES
(@john_employee_id, 25000000, 5000000, 0, '2026-01-01', NOW(), NOW()),
(@john_employee_id, 25000000, 3000000, 0, '2025-12-01', NOW(), NOW()),
(@john_employee_id, 25000000, 4000000, 500000, '2025-11-01', NOW(), NOW()),
(@john_employee_id, 24500000, 3500000, 250000, '2025-10-01', NOW(), NOW()),
(@john_employee_id, 24000000, 3000000, 0, '2025-09-01', NOW(), NOW()),
(@nguyen_employee_id, 22000000, 4000000, 0, '2026-01-01', NOW(), NOW()),
(@nguyen_employee_id, 22000000, 3500000, 0, '2025-12-01', NOW(), NOW()),
(@nguyen_employee_id, 22000000, 3000000, 0, '2025-11-01', NOW(), NOW()),
(@nguyen_employee_id, 21000000, 3000000, 0, '2025-10-01', NOW(), NOW()),
(@nguyen_employee_id, 20500000, 2500000, 0, '2025-09-01', NOW(), NOW()),
(@tran_employee_id, 18000000, 2000000, 0, '2026-01-01', NOW(), NOW()),
(@tran_employee_id, 18000000, 1500000, 200000, '2025-12-01', NOW(), NOW()),
(@tran_employee_id, 18000000, 2000000, 0, '2025-11-01', NOW(), NOW()),
(@tran_employee_id, 17500000, 1500000, 0, '2025-10-01', NOW(), NOW()),
(@tran_employee_id, 17000000, 1500000, 0, '2025-09-01', NOW(), NOW());

-- ============================================================================
-- STEP 8: INSERT ATTENDANCE (24 records)
-- ============================================================================
INSERT INTO attendance (employee_id, check_in_date, check_in_time, check_out_time, status, created_at)
VALUES
-- Employee 1 - January 2026
(@john_employee_id, '2026-01-02', '2026-01-02 08:15:00', '2026-01-02 17:30:00', 'present', NOW()),
(@john_employee_id, '2026-01-03', '2026-01-03 08:00:00', '2026-01-03 17:45:00', 'present', NOW()),
(@john_employee_id, '2026-01-04', '2026-01-04 09:30:00', '2026-01-04 18:00:00', 'late', NOW()),
(@john_employee_id, '2026-01-05', '2026-01-05 08:20:00', '2026-01-05 17:15:00', 'present', NOW()),
(@john_employee_id, '2026-01-06', NULL, NULL, 'absent', NOW()),
(@john_employee_id, '2026-01-07', '2026-01-07 08:10:00', '2026-01-07 17:00:00', 'present', NOW()),
(@john_employee_id, '2026-01-08', '2026-01-08 08:05:00', '2026-01-08 17:30:00', 'present', NOW()),
(@john_employee_id, '2026-01-09', '2026-01-09 08:00:00', '2026-01-09 12:00:00', 'half-day', NOW()),
(@john_employee_id, '2026-01-10', '2026-01-10 08:30:00', '2026-01-10 17:45:00', 'present', NOW()),
(@john_employee_id, '2026-01-12', '2026-01-12 08:15:00', '2026-01-12 17:20:00', 'present', NOW()),
(@john_employee_id, '2026-01-13', '2026-01-13 08:00:00', '2026-01-13 18:00:00', 'present', NOW()),
(@john_employee_id, '2026-01-14', '2026-01-14 08:45:00', '2026-01-14 17:30:00', 'late', NOW()),
(@john_employee_id, '2026-01-15', '2026-01-15 08:10:00', '2026-01-15 17:15:00', 'present', NOW()),
(@john_employee_id, '2026-01-16', '2026-01-16 08:00:00', '2026-01-16 17:00:00', 'present', NOW()),

-- Employee 2 - January 2026
(@nguyen_employee_id, '2026-01-02', '2026-01-02 08:30:00', '2026-01-02 17:00:00', 'present', NOW()),
(@nguyen_employee_id, '2026-01-03', '2026-01-03 08:15:00', '2026-01-03 17:30:00', 'present', NOW()),
(@nguyen_employee_id, '2026-01-04', '2026-01-04 08:00:00', '2026-01-04 17:15:00', 'present', NOW()),
(@nguyen_employee_id, '2026-01-05', '2026-01-05 08:20:00', '2026-01-05 17:45:00', 'present', NOW()),
(@nguyen_employee_id, '2026-01-06', '2026-01-06 09:00:00', '2026-01-06 18:00:00', 'late', NOW()),

-- Employee 3 - January 2026
(@tran_employee_id, '2026-01-02', '2026-01-02 08:00:00', '2026-01-02 17:00:00', 'present', NOW()),
(@tran_employee_id, '2026-01-03', '2026-01-03 08:15:00', '2026-01-03 17:30:00', 'present', NOW()),
(@tran_employee_id, '2026-01-04', '2026-01-04 08:10:00', '2026-01-04 17:15:00', 'present', NOW()),
(@tran_employee_id, '2026-01-05', NULL, NULL, 'absent', NOW()),
(@tran_employee_id, '2026-01-06', '2026-01-06 08:00:00', '2026-01-06 17:00:00', 'present', NOW());

-- ============================================================================
-- STEP 9: INSERT KPIs (15 records)
-- ============================================================================
INSERT INTO kpis (employee_id, metric, target, actual, period, created_at, updated_at)
VALUES
-- Employee 1 - IT/Developer KPIs (5 records)
(@john_employee_id, 'Code commits per week', 20, 22, 'Q1 2026', NOW(), NOW()),
(@john_employee_id, 'Bug fixes per month', 15, 18, 'Jan 2026', NOW(), NOW()),
(@john_employee_id, 'Project completion rate', 90, 95, 'Q1 2026', NOW(), NOW()),
(@john_employee_id, 'Code review quality score', 85, 88, 'Jan 2026', NOW(), NOW()),
(@john_employee_id, 'Customer satisfaction', 80, 92, 'Q1 2026', NOW(), NOW()),

-- Employee 2 - HR Manager KPIs (5 records)
(@nguyen_employee_id, 'Recruitment completion rate', 80, 75, 'Jan 2026', NOW(), NOW()),
(@nguyen_employee_id, 'Employee retention rate', 95, 96, 'Q1 2026', NOW(), NOW()),
(@nguyen_employee_id, 'Training programs conducted', 4, 5, 'Q1 2026', NOW(), NOW()),
(@nguyen_employee_id, 'Employee satisfaction score', 75, 82, 'Jan 2026', NOW(), NOW()),
(@nguyen_employee_id, 'HR response time (hours)', 24, 18, 'Jan 2026', NOW(), NOW()),

-- Employee 3 - Accountant KPIs (5 records)
(@tran_employee_id, 'Invoice processing time (days)', 5, 4, 'Jan 2026', NOW(), NOW()),
(@tran_employee_id, 'Financial accuracy rate', 99, 99.5, 'Q1 2026', NOW(), NOW()),
(@tran_employee_id, 'Month-end close completion', 100, 100, 'Jan 2026', NOW(), NOW()),
(@tran_employee_id, 'Expense report verification', 95, 98, 'Jan 2026', NOW(), NOW()),
(@tran_employee_id, 'Audit preparation readiness', 90, 92, 'Q1 2026', NOW(), NOW());

-- ============================================================================
-- STEP 10: INSERT WORK HISTORY (12 records)
-- ============================================================================
INSERT INTO work_history (employee_id, previous_position, current_position, previous_department, current_department, transfer_date, reason, created_at)
VALUES
(@john_employee_id, 'Intern Developer', 'Junior Developer', 'IT', 'IT', '2022-01-10', 'Completed internship and joined full-time', NOW()),
(@john_employee_id, 'Junior Developer', 'Backend Developer', 'IT', 'IT', '2024-06-01', 'Promotion - 1 year performance', NOW()),
(@john_employee_id, 'Frontend Developer', 'Junior Developer', 'IT', 'IT', '2023-01-15', 'Initial hire', NOW()),
(@john_employee_id, 'Backend Developer', 'Senior Backend Developer', 'IT', 'IT', '2025-12-01', 'Promotion - strong architecture ownership', NOW()),
(@nguyen_employee_id, 'HR Intern', 'HR Coordinator', 'HR', 'HR', '2021-06-01', 'Initial hire after internship', NOW()),
(@nguyen_employee_id, 'HR Recruiter', 'HR Manager', 'HR', 'HR', '2023-12-01', 'Promotion - Leadership skills', NOW()),
(@nguyen_employee_id, 'HR Coordinator', 'HR Recruiter', 'HR', 'HR', '2022-06-01', 'Career development', NOW()),
(@nguyen_employee_id, 'HR Manager', 'Senior HR Manager', 'HR', 'HR', '2025-11-01', 'Promotion - employee retention improvements', NOW()),
(@tran_employee_id, 'Finance Intern', 'Junior Accountant', 'Finance', 'Finance', '2022-03-10', 'Initial hire after internship', NOW()),
(@tran_employee_id, 'Junior Accountant', 'Accountant', 'Finance', 'Finance', '2023-09-15', 'Promotion - Proficiency increase', NOW()),
(@tran_employee_id, 'Finance Assistant', 'Junior Accountant', 'Finance', 'Finance', '2023-03-10', 'Initial hire', NOW()),
(@tran_employee_id, 'Accountant', 'Senior Accountant', 'Finance', 'Finance', '2025-10-15', 'Promotion - audit and close ownership', NOW());

-- ============================================================================
-- STEP 11: VERIFY DATA INSERTION
-- ============================================================================
-- Run these queries to verify all data was inserted correctly

SELECT 'DATA INSERTION VERIFICATION' as `Status`;
SELECT '=' as `=`, '=' as `=`, '=' as `=`, '=' as `=`, '=' as `=`, '=' as `=`, '=' as `=`, '=' as `=`;

SELECT 'Users' as `Table`, COUNT(*) as `Count` FROM users
UNION ALL
SELECT 'Employees', COUNT(*) FROM employees
UNION ALL
SELECT 'Leaves', COUNT(*) FROM leaves
UNION ALL
SELECT 'Expenses', COUNT(*) FROM expenses
UNION ALL
SELECT 'Salaries', COUNT(*) FROM salaries
UNION ALL
SELECT 'Attendance', COUNT(*) FROM attendance
UNION ALL
SELECT 'KPIs', COUNT(*) FROM kpis
UNION ALL
SELECT 'Work History', COUNT(*) FROM work_history;

SELECT '' as ``;
SELECT '✓ All data inserted successfully!' as `Status`;
SELECT '' as ``;
SELECT 'TEST CREDENTIALS:' as `Info`;
SELECT '  Admin: admin / admin123' as ``;
SELECT '  Employee 1: employee / emp123' as ``;
SELECT '  Employee 2: nguyenvana / Pass123!' as ``;
SELECT '  Employee 3: tranvanb / Pass123!' as ``;
