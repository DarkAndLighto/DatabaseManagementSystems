DELETE FROM users
WHERE user_id = 12;

SELECT * FROM patient;
SELECT * FROM users;
SELECT * FROM contact_information;

SELECT
    *
FROM
    patient p
JOIN
    users u
ON
    u.user_id = p.patient_id
JOIN
    contact_information c
ON
    c.user_id = p.patient_id
ORDER BY
    u.user_id;
WHERE
    lower(u.user_id) = 16;

UPDATE 
    users
SET
    first_name = 'C',
    last_name = 'C'
WHERE
    user_id = 16;

UPDATE 
    contact_information
SET
    phone_number = 1555
WHERE
    user_id = 16;

