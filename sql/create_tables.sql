CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    gender CHAR(1) CHECK (gender IN ('M', 'F')) NOT NULL,
    date_of_birth DATE NOT NULL
);

CREATE TABLE contact_information (
    contact_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    phone_number VARCHAR(11) NOT NULL UNIQUE,
    address VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE hospital (
    hospital_id SERIAL PRIMARY KEY,
    city_id INT REFERENCES city(city_id) ON DELETE CASCADE,
    district_id INT REFERENCES district(district_id) ON DELETE CASCADE,
    manager_id INT REFERENCES managers(manager_id) ON DELETE CASCADE,
    name VARCHAR(30) NOT NULL,
    address VARCHAR(30) NOT NULL UNIQUE,
    phone_number VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(30) NOT NULL UNIQUE
);


CREATE TABLE city (
    city_id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE district (
    district_id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE patient(
    patient_id INT PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE emergency_contact(
    em_con_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patient(patient_id) ON DELETE CASCADE,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    gender CHAR(1) CHECK (gender IN ('M', 'F')) NOT NULL,
    date_of_birth DATE NOT NULL CHECK (date_of_birth <= CURRENT_DATE),
    relationship VARCHAR(30) NOT NULL,
    phone_number VARCHAR(11) NOT NULL UNIQUE,
    address VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE insurance(
    insurance_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patient(patient_id) ON DELETE CASCADE,
    insurance_provider VARCHAR(30) NOT NULL,
    policy_number VARCHAR(5) NOT NULL CHECK (length(policy_number) = 5),
    coverage_amount INT NOT NULL
);

CREATE TABLE departments(
    department_id SERIAL PRIMARY KEY,
    hospital_id INT REFERENCES hospital(hospital_id) ON DELETE CASCADE,
    manager_id INT REFERENCES managers(manager_id) ON DELETE CASCADE,
    name VARCHAR(20) NOT NULL UNIQUE,
    description VARCHAR(255),
    phone_number INT NOT NULL UNIQUE
);

CREATE TABLE managers(
    manager_id SERIAL PRIMARY KEY
);

CREATE TABLE doctors(
    doctor_id INT PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    department_id INT REFERENCES departments(department_id) ON DELETE CASCADE,
    license_id INT NOT NULL
);

CREATE TABLE staff(
    staff_id INT PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    department_id INT REFERENCES departments(department_id) ON DELETE CASCADE,
    role VARCHAR(255) NOT NULL
);

CREATE TABLE nurses(
    nurse_id INT PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE appointments(
    appointment_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patient(patient_id) ON DELETE CASCADE,
    doctor_id INT REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    app_date data NOT NULL CHECK (app_date > CURRENT_DATE),
    app_status char(2) CHECK (app_status IN ('SC', 'CO', 'CA'))
);

select * from appointments;
ALTER TABLE appointments
ADD CONSTRAINT app_date CHECK (app_date > CURRENT_DATE);

CREATE TABLE payments(
    payment_id SERIAL PRIMARY KEY,
    date VARCHAR(255) NOT NULL,
    method VARCHAR(30) NOT NULL,
    amount INT NOT NULL
);

CREATE TABLE prescriptions(
    prescription_id SERIAL PRIMARY KEY,
    appointment_id INT REFERENCES appointments(appointment_id) ON DELETE CASCADE,
    dosage INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    notes VARCHAR(255)
);

CREATE TABLE prescription_medications(
    pres_med_id SERIAL PRIMARY KEY,
    prescription_id INT REFERENCES prescriptions(prescription_id) ON DELETE CASCADE,
    medication_id INT REFERENCES medications(medication_id) ON DELETE CASCADE
);

CREATE TABLE medications(
    medication_id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE,
    adminstraiton_method VARCHAR(30) NOT NULL,
    manufacturer VARCHAR(255) NOT NULL,
    expiry_date DATE NOT NULL
);