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



//Add department
INSERT INTO departments (hospital_id, manager_id, name, description, phone_number)
VALUES (1, 67, 'Phlebotomy', 'The place where blood is drawn from patients for laboratory testing, transfusions, donations, or research purposes', 412531423);

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