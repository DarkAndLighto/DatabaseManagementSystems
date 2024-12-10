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
