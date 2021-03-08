INSERT INTO department (department_name)
VALUES
('Sales'), 
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles (title, salary, department_name)
VALUES 
('Lead Engineer', 150000, 'Engineering'),
('Legal Team Lead', 180000, 'Legal'),
('Accountant', 70000, 'Finance'),
('Sales Lead', 100000, 'Sales'),
('Salesperson', 80000, 'Sales'),
('Software Engineer', 120000, 'Engineering'),
('Lawyer', 150000, 'Legal');


INSERT INTO employees (first_name, last_name, title, manager_name)
VALUES 
('Sage', 'Huegel', 'Salesperson', NULL),
('Brandon', 'Robinson', 'Accountant', NULL,
('Tyler','Kaphingst', 'salesperson', NULL),
('Alex', 'Schmitt', 'Software Engineer', 'Jimbo'),
('Nicole', 'Meyers', 'Lawyer', 'Samantha'),
('Emily', 'Krueger', 'Software Engineer', 'Jimbo'),
('Dr', 'Moose', 'Accountant', 'Samantha');
