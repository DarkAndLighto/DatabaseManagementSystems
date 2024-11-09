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
    c.user_id = p.patient_id;