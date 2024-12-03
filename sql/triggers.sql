CREATE OR REPLACE FUNCTION check_dob()
RETURNS TRIGGER AS $$
BEGIN
    IF (NEW.date_of_birth > CURRENT_DATE) THEN
        RAISE EXCEPTION 'Date of birth cannot be in the future.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER validate_dob
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION check_dob();

DROP TRIGGER validate_dob;