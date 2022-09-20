INSERT INTO department (name)
VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, departmentID)
VALUES ("Sales Lead", 90000, 1),
       ("Salesperson", 70000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 100000, 2),
       ("Account Manager", 120000, 3),
       ("Accountant", 100000, 3),
       ("Legal Team Lead", 200000, 4),
       ("Lawyer", 150000, 4);

INSERT INTO employee (first_name, last_name, roleID, managerID)
VALUES ("Cody", "Blom", 1, NULL),
       ("Jason", "Fechete", 2, 1),
       ("Ashley", "Khuu", 3, NULL),
       ("Kevin", "Peters", 4, 3),
       ("Zoe", "Odell", 5, NULL),
       ("Andrew", "Brown", 6, 5),
       ("Sarah", "Lourd", 7, NULL),
       ("Ava", "Hammons", 8, 7);