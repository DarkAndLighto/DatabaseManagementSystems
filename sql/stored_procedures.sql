CREATE OR REPLACE PROCEDURE add_new_user(
    IN first_name TEXT,
    IN last_name TEXT,
    IN gender CHAR,
    IN date_of_birth DATE,
    IN phone_number INT,
    IN address TEXT,
    IN email TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE 
    new_user_id INT;
BEGIN
    INSERT INTO users (occupation, first_name, last_name, gender, date_of_birth)
    VALUES ('Patient', first_name, last_name, gender, date_of_birth)
    RETURNING user_id INTO new_user_id;

    INSERT INTO contact_information (user_id, phone_number, address, email) 
    VALUES (new_user_id, phone_number, address, email);

    INSERT INTO patient(patient_id)
    VALUES (new_user_id);
END $$;



CREATE OR REPLACE PROCEDURE add_emergency_contact(
    IN patient_id INT,
    IN first_name TEXT,
    IN last_name TEXT,
    IN gender CHAR,
    IN date_of_birth DATE,
    IN relationship TEXT,
    IN phone_number TEXT,
    IN address TEXT,
    IN email TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO emergency_contact (patient_id, first_name, last_name, gender, date_of_birth, relationship, phone_number, address, email)
    VALUES (patient_id, first_name, last_name, gender, date_of_birth, relationship, phone_number, address, email);
END;
$$;


















///add doctor
DO $$
DECLARE 
    new_user_id INT;
BEGIN
    INSERT INTO users (first_name, last_name, gender, date_of_birth)
    VALUES ('Muhammad', 'Al Shawwa', 'M', '8/20/570')
    RETURNING user_id INTO new_user_id;

    INSERT INTO contact_information (user_id, phone_number, address, email) 
    VALUES (new_user_id, 510349102, 'Damascus', 'm@as');

    INSERT INTO doctors (doctor_id, department_id, license_id)
    VALUES (new_user_id, 2, '65432');
END $$;




///add manager
DO $$
DECLARE 
    new_user_id INT;
BEGIN
    INSERT INTO users (first_name, last_name, gender, date_of_birth)
    VALUES ('Not Ammar', 'Not Ajam', 'M', '5/21/1999')
    RETURNING user_id INTO new_user_id;

    INSERT INTO contact_information (user_id, phone_number, address, email) 
    VALUES (new_user_id, 8751827401, 'Damascus', 'na@ng');

    INSERT INTO managers (manager_id)
    VALUES (new_user_id);
END $$;

select * from managers;