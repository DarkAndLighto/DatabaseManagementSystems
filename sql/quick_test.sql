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

SELECT * from emergency_contact;




SELECT * FROM emergency_contact c
INNER JOIN patient p
ON c.patient_id = p.patient_id
WHERE p.patient_id = 42;

INSERT INTO insurance (patient_id, insurance_provider, policy_number, coverage_amount)
VALUES (16, 'me', '55555', 155000);