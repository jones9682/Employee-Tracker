DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department
(
    id INT
    AUTO_INCREMENT,
    name VARCHAR
    (30) NOT NULL,
    PRIMARY KEY
    (id)
);

    CREATE TABLE role
    (
        id INT
        AUTO_INCREMENT,
    title VARCHAR
        (30),
    salary DECIMAL
        (10, 2),
    department_id INT, 
    PRIMARY KEY
        (id)
);

        CREATE TABLE employee
        (
            id INT
            AUTO_INCREMENT,
    first_name VARCHAR
            (30),
    last_name VARCHAR
            (30),
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY
            (id),
    FOREIGN KEY
            (role_id) REFERENCES role
            (id),
    FOREIGN KEY
            (manager_id) REFERENCES employee
            (id)

);

            SELECT *
            FROM department;
            SELECT *
            FROM role;
            SELECT *
            FROM employee;

