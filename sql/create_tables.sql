CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    gender CHAR(1) CHECK (gender IN ('M', 'F')) NOT NULL,
    date_of_birth DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS contact_information (
    contact_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    phone_number VARCHAR(15) NOT NULL,
    address VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL
);

DO $$
DECLARE 
    new_user_id INT;
BEGIN
    -- Insert the user and get the user_id
    INSERT INTO users (first_name, last_name, gender, date_of_birth) 
    VALUES ('Ammar', 'Ajam', 'M', '1000-10-10')
    RETURNING user_id INTO new_user_id;

    -- Now use the captured user_id to insert into contact_information
    INSERT INTO contact_information (user_id, phone_number, address, email) 
    VALUES (new_user_id, '12345', 'Fifth Street', 'ammarajam08@example.com');
END $$;

SELECT 
    u.user_id, 
    u.first_name, 
    u.last_name, 
    u.gender, 
    u.date_of_birth, 
    c.phone_number, 
    c.address, 
    c.email
FROM 
    users u
JOIN 
    contact_information c
ON 
    u.user_id = c.user_id;


select * from users;
select * from contact_information;

DELETE from users;
DELETE from contact_information;


CREATE TABLE IF NOT EXISTS patients (
    user_id INT PRIMARY KEY,
    department_id VARCHAR(255),
    license_id INT NOT NULL,
    CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(user_id)
);


CREATE TABLE doctors (
);




SELECT * FROM users;
SELECT * FROM patients;
SELECT * FROM doctors;



DELETE FROM users;
DELETE FROM patients;
DELETE FROM doctors;


drop TABLE patients;
drop TABLE doctors;
drop TABLE users;

CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    department_id INT,
    CONSTRAINT fk_department
        FOREIGN KEY (department_id) 
        REFERENCES departments (department_id),
);