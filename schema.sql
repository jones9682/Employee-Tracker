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
        (30) NOT NULL,
    salary DECIMAL
        (10, 2), NOT NULL
    department_id INT NOT NULL
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
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY
            (id),

);

            SELECT *
            FROM department;
            SELECT *
            FROM role;
            SELECT *
            FROM employee;

