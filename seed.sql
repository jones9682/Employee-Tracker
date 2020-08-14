USE employee_tracker_db;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 70000, 1),
    ('Lead Engineer', 130000, 2),
    ('Software Engineer', 110000, 2),
    ('Accountant', 120000, 3),
    ('Leagal Team Lead', 240000, 4),
    ('Lawyer', 185000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Wick', 1, null),
    ('Bart', 'Simpson', 3, null),
    ('Frodo', 'Baggins', 4, 2),
    ('Bobby', 'Jones', 6, null),
    ('Tom', 'Hanks', 2, 1),
    ('Harry', 'Potter', 2, 1);





