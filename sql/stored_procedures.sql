/* This should be add_new_patient**   */
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
    INSERT INTO users(occupation, first_name, last_name, gender, date_of_birth)
    VALUES ('Patient', first_name, last_name, gender, date_of_birth)
    RETURNING user_id INTO new_user_id;

    INSERT INTO contact_information(user_id, phone_number, address, email) 
    VALUES (new_user_id, phone_number, address, email);

    INSERT INTO patient(patient_id)
    VALUES (new_user_id);
END $$;


drop procedure book_new_appointment;
CREATE OR REPLACE PROCEDURE book_new_appointment(
    IN patient_id INT,
    IN doctor_id INT,
    IN app_date DATE,
    IN app_status CHAR(2)
)
LANGUAGE plpgsql
AS $$
DECLARE
    new_appointment_id INT;
BEGIN
    -- Insert into appointments and retrieve the ID
    INSERT INTO appointments(patient_id, doctor_id, app_date, app_status)
    VALUES (patient_id, doctor_id, app_date, app_status)
    RETURNING appointment_id INTO new_appointment_id;

    -- Insert into payments (amount will be set by the trigger)
    INSERT INTO payments(appointment_id)
    VALUES (new_appointment_id);
END;
$$;



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





///process appointment
DROP PROCEDURE process_appointment;
CREATE OR REPLACE PROCEDURE process_appointment(
    IN process_appointment_id INT
)
LANGUAGE plpgsql
AS $$
DECLARE
    process_patient_id INT;
    process_amount INT;
    process_patient_balance INT;
    process_appointment_status CHAR(2);
BEGIN
    -- Retrieve details about the appointment and payment
    SELECT a.patient_id, p.amount, a.app_status 
    INTO process_patient_id, process_amount, process_appointment_status
    FROM appointments a
    JOIN payments p ON a.appointment_id = p.appointment_id
    WHERE a.appointment_id = process_appointment_id;

    -- Check if the appointment is already completed
    IF process_appointment_status = 'CO' THEN
        RAISE EXCEPTION 'Appointment is already completed.';
    END IF;
    
    -- Get the current balance of the patient
    SELECT pt.balance INTO process_patient_balance
    FROM patient pt
    WHERE pt.patient_id = process_patient_id;
    
    -- Check if the patient has enough balance
    IF process_patient_balance >= process_amount THEN
        -- Deduct the payment amount from the patient's balance
        UPDATE patient
        SET balance = balance - process_amount
        WHERE patient_id = process_patient_id;
        
        -- Set the appointment status to 'CO' (Completed)
        UPDATE appointments
        SET app_status = 'CO'
        WHERE appointment_id = process_appointment_id;

        -- Call the new procedure to generate a prescription
        CALL generate_prescription(process_appointment_id);
        
        -- Return success message
        RAISE NOTICE 'Appointment completed successfully, and prescription generated.';
    ELSE
        -- Return insufficient balance message
        RAISE EXCEPTION 'Insufficient balance to complete the appointment.';
    END IF;
END;
$$;















///add doctor
DO $$
DECLARE 
    new_user_id INT;
BEGIN
    INSERT INTO users (first_name, last_name, gender, date_of_birth, occupation)
    VALUES ('Rojda', 'bulbul', 'F', '11/10/2002', 'Doctor')
    RETURNING user_id INTO new_user_id;

    INSERT INTO contact_information (user_id, phone_number, address, email) 
    VALUES (new_user_id, 523522432, 'Sanlıurfa', 'ezzrojim@gmail.com');

    INSERT INTO doctors (doctor_id, department_id, license_id)
    VALUES (new_user_id, 3, 34271);
END $$;


///add manager
DO $$
DECLARE 
    new_user_id INT;
BEGIN
    INSERT INTO users (first_name, last_name, gender, date_of_birth, occupation)
    VALUES ('Hadi', 'Kazziha', 'M', '8/13/1993', 'Manager')
    RETURNING user_id INTO new_user_id;

    INSERT INTO contact_information (user_id, phone_number, address, email) 
    VALUES (new_user_id, 9631812401, 'Damascus', 'h@ka');

    INSERT INTO managers (manager_id)
    VALUES (new_user_id);
END $$;

select * from managers;