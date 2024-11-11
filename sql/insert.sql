DO $$
DECLARE 
    new_user_id INT;
BEGIN
    INSERT INTO users (first_name, last_name, gender, date_of_birth)
    VALUES ('Leonardo', 'Ajam', 'M', '1000-10-10')
    RETURNING user_id INTO new_user_id;

    INSERT INTO contact_information (user_id, phone_number, address, email) 
    VALUES (new_user_id, '4123211', 'Fifth Street', 'amm232ar1@example.com');

    INSERT INTO patient(patient_id)
    VALUES (new_user_id);
END $$;

SELECT
    *
FROM
    users u
JOIN
    contact_information c
ON
    u.user_id = c.user_id
ORDER BY
    u.user_id;




insert into city(name) VALUES ('aleppo');
insert into district(name) VALUES ('new_aleppo');

insert into hospital(city_id, district_id, name, address, phone_number, email) VALUES
(1, 1, 'Shafa', 'Zahra', 9631233128, 'Shafa@gmail.com')

SELECT
    c.city_id,
    d.district_id,
    h.hospital_id,
    h.name,
    h.address,
    h.phone_number,
    h.email
FROM
    hospital h
JOIN
    city c
    ON h.city_id = c.city_id
JOIN
    district d
    ON h.district_id = d.district_id
order by 
    hospital_id;


INSERT into patient(patient_id) VALUES (8);

INSERT into emergency_contact(patient_id, name, last_name, relationship, phone_number, email) 
VALUES (8, 'ALI', 'ALI`s last name', 'sibling', 213123, NULL);

INSERT into insurance(patient_id, insurance_provider, policy_number, coverage_amount)
VALUES (8, 'Vodafone', 101, 50000);


SELECT
    *
FROM
    users u
JOIN
    patient p
    ON p.patient_id = u.user_id
JOIN
    emergency_contact em
    ON p.patient_id = em.patient_id
Join
    insurance i
    ON p.patient_id = i.patient_id
WHERE
    p.patient_id = 8;