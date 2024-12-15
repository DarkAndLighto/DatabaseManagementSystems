CREATE OR REPLACE FUNCTION set_payment_amount()
RETURNS TRIGGER AS $$
DECLARE
    department_name VARCHAR(20);
BEGIN
    -- Retrieve the department name based on the appointment's doctor
    SELECT d.name
    INTO department_name
    FROM appointments a
    JOIN doctors doc ON a.doctor_id = doc.doctor_id
    JOIN departments d ON doc.department_id = d.department_id
    WHERE a.appointment_id = NEW.appointment_id;

    -- Set the payment amount based on the department
    CASE department_name
        WHEN 'Gastroenterology' THEN NEW.amount := 50;
        WHEN 'Phlebotomy' THEN NEW.amount := 75;
        WHEN 'Dermatology' THEN NEW.amount := 25;
        ELSE RAISE EXCEPTION 'Unknown department: %', department_name;
    END CASE;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_payment_amount
BEFORE INSERT ON payments
FOR EACH ROW
EXECUTE FUNCTION set_payment_amount();












CREATE OR REPLACE PROCEDURE generate_prescription(
    IN new_appointment_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Insert a new prescription entry for the provided appointment ID
    INSERT INTO prescriptions (appointment_id)
    VALUES (new_appointment_id);

    -- Return success message for logging/debugging
    RAISE NOTICE 'Prescription generated for appointment ID %.', new_appointment_id;
END;
$$;


drop FUNCTION assign_random_values_to_medications;
CREATE OR REPLACE FUNCTION assign_random_values_to_medications()
RETURNS TRIGGER AS $$
DECLARE
    admin_methods TEXT[] := ARRAY['Oral', 'Injection', 'Topical', 'Inhalation'];
    manufacturers TEXT[] := ARRAY['PharmaCorp', 'MediSupply', 'HealthPlus', 'BioLife'];
    medication_names TEXT[] := ARRAY[
        'Panacea', 'Medica', 'CuraTab', 'Healzyme', 'TheraMax', 
        'ReliefX', 'VitaPlus', 'NeuroAid', 'ImmunoCare', 'CardioFit'
    ];
    year_offset INT;
BEGIN
    -- Assign random values for each field
    NEW.administration_method := admin_methods[ceil(random() * array_length(admin_methods, 1))::int];
    NEW.manufacturer := manufacturers[ceil(random() * array_length(manufacturers, 1))::int];
    NEW.name := medication_names[ceil(random() * array_length(medication_names, 1))::int];
    
    -- Calculate random expiry date
    year_offset := (1 + ceil(random() * 1)::int); -- Randomly choose 1 or 2 years
    NEW.expiry_date := CURRENT_DATE + (interval '1 year' * year_offset);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_random_values
BEFORE INSERT ON medications 
FOR EACH ROW
EXECUTE FUNCTION assign_random_values_to_medications();







/*                                         */
CREATE OR REPLACE FUNCTION after_insert_prescription()
RETURNS TRIGGER AS $$
DECLARE
    random_medication_id INT;
    dosage INT := NEW.dosage;
BEGIN
    -- Select a random medication
    SELECT medication_id INTO random_medication_id
    FROM medications
    ORDER BY random()
    LIMIT 1;

    -- Update the supply of the selected medication
    UPDATE medications
    SET supply = supply - dosage
    WHERE medication_id = random_medication_id;

    -- Insert the relation into prescription_medications
    INSERT INTO prescription_medications(prescription_id, medication_id)
    VALUES (NEW.prescription_id, random_medication_id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_prescription_insert
AFTER INSERT ON prescriptions
FOR EACH ROW
EXECUTE FUNCTION after_insert_prescription();












CREATE OR REPLACE FUNCTION after_insert_insurance()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the patient's balance
    UPDATE patient
    SET balance = balance + NEW.coverage_amount
    WHERE patient.patient_id = NEW.patient_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_insert_insurance
AFTER INSERT ON insurance
FOR EACH ROW
EXECUTE FUNCTION after_insert_insurance();














CREATE OR REPLACE FUNCTION enforce_max_emergency_contacts()
RETURNS TRIGGER AS $$
BEGIN
    -- Check the current number of emergency contacts for the patient
    IF (SELECT COUNT(*) FROM emergency_contact WHERE patient_id = NEW.patient_id) >= 5 THEN
        RAISE EXCEPTION 'A patient can have a maximum of 5 emergency contacts.';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER enforce_max_emergency_contacts_trigger
BEFORE INSERT ON emergency_contact
FOR EACH ROW
EXECUTE FUNCTION enforce_max_emergency_contacts();