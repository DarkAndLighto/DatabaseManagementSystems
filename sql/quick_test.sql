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

SELECT * FROM managers;

//Add department
INSERT INTO departments (hospital_id, manager_id, name, description, phone_number)
VALUES (1, 74, 'Dermatology', 'the medical discipline that is concerned with the diagnosis and treatment of diseases of the skin, hair, and nails in both children and adults.', 963531423);

SELECT 
    *
FROM 
    users u
JOIN
    doctors d
ON
    d.doctor_id = u.user_id
JOIN
    contact_information c
ON
    u.user_id = c.user_id
WHERE 
    department_id = 2;

SELECT * FROM appointments a
JOIN payments p
ON a.appointment_id = p.appointment_id
JOIN patient
ON patient.patient_id = a.patient_id
WHERE patient.patient_id = 16;