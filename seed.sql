use employee_DB;

-- Employee -------
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Craig", "Smith", 1, 1), ("Jim", "Jones", 2, 1), ("Alex", "Doe", 3, 2);

-- Role-------
INSERT INTO role (title, salary, department_id)
VALUE ("VP", 160000, 1), ("Director", 110000, 2), ("Manager", 90000, 3), ("Employee", 70000, 3);

-- Departments-----
INSERT INTO department (name)
VALUE ("Executive"), ("Operations"), ("Sales");

