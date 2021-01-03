use employee_DB;

-- Employee -------
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Craig", "Smith", 1, 1), ("Jim", "Jones", 2, 1), ("Alex", "Doe", 3, 2);

-- Role-------
INSERT INTO role (title, salary, department_id)
VALUE ("Director", 110000, 1), ("Manager", 90000, 1), ("Employee", 70000, 1);

-- Departments-----
INSERT INTO department (name)
VALUE ("Operations"), ("Sales");

