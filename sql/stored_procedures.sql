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
    INSERT INTO users (first_name, last_name, gender, date_of_birth)
    VALUES (first_name, last_name, gender, date_of_birth)
    RETURNING user_id INTO new_user_id;

    INSERT INTO contact_information (user_id, phone_number, address, email) 
    VALUES (new_user_id, phone_number, address, email);

    INSERT INTO patient(patient_id)
    VALUES (new_user_id);
END $$;