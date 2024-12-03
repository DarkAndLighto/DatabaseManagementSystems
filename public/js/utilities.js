//The fields here are the columns of each table (as seen in PG admit)
const tableFields = {
    "users": ["user_id", "occupation", "first_name", "last_name", "gender", "date_of_birth"],
    "contact_information": ["contact_id", "user_id", "address", "email", "phone_number"],
    "patient": ["patient_id"],
    "managers": ["manager_id"],
    "doctors": ["doctor_id", "department_id", "license_id"],
    "departments": ["department_id", "hospital_id", "manager_id", "name", "description", "phone_number"],
    "emergency_contact": ["em_con_id", "first_name", "last_name", "gender", "date_of_birth", "relationship", "phone_number", "address", "email"],
    "insurance": ["insurance_id", "insurance_provider", "policy_number", "coverage_amount"],
    "appointments": ["appointment_id", "patient_id", "doctor_id", "app_date", "app_status"]
};

//The fields here are the headers in the table in which they're being displayed (can be anything)
const tableHeaders = {
    "users": [
        "",
        "#",
        "ID",
        "Occupation",
        "Name",
        "Last name",
        "Gender",
        "Date of Birth"
    ],
    "contact_information": [
        "",
        "#",
        "ID",
        "User ID",
        "Address",
        "Email",
        "Phone number"
    ],
    "patient": [
        "",
        "#",
        "ID"
    ],
    "managers": [
        "",
        "#",
        "ID"
    ],
    "doctors": [
        "",
        "#",
        "ID",
        "Department ID",
        "License ID"
    ],
    "departments": [
        "",
        "#",
        "ID",
        "hospital_id",
        "manager_id",
        "name", 
        "description", 
        "phone_number"
    ],
    "emergency_contact": [
        "",
        "#",
        "ID",
        "Name",
        "Last Name",
        "Gender",
        "Date of Birth",
        "Relationship",
        "Phone Number",
        "Address",
        "Email"
    ],
    "insurance": [
        "",
        "#",
        "ID",
        "Insurance provider",
        "Policy Number",
        "Coverage amount"
    ],
    "appointments": [
        "",
        "#",
        "ID",
        "Patient ID",
        "Doctor ID",
        "Appointment Date",
        "Appointment Status"
    ]
};

const dropdownItems = {
    "users": [
        ["user_id", "ID"],
        ["occupation", "Occupation"],
        ["first_name", "First name"],
        ["last_name", "Last name"],
        ["gender", "Gender"],
        ["date_of_birth", "Date of Birth"]
    ],
    "contact_information": [
        ["contact_id", "ID"],
        ["user_id", "User ID"],
        ["address", "Address"],
        ["email", "Email"],
        ["phone_number", "Phone number"]
    ],
    "patient": [
        ["patient_id", "ID"]
    ],
    "managers": [
        ["manager_id", "ID"]
    ],
    "doctors": [
        ["doctor_id", "ID"],
        ["department_id", "Department ID"],
        ["license_id", "License ID"]
    ],
    "departments": [
        ["department_id", "hospital_id", "manager_id", "name", "description", "phone_number"]
    ],
    "emergency_contact": [
        ["em_con_id", "ID"],
        ["first_name", "First name"],
        ["last_name", "Last name"],
        ["gender", "Gender"],
        ["date_of_birth", "Date of birth"],
        ["relationship", "Relationship"],
        ["phone_number", "Phone number"],
        ["address", "Address"],
        ["email", "Email"]
    ],
    "insurance": [
        ["insurance_id", "ID"],
        ["insurance_provider", "Insurance provider"],
        ["policy_number", "Policy Number"],
        ["coverage_amount", "Coverage amount"]
    ],
    "appointments": [
        ["appointment_id", "ID"],
        ["patient_id", "Patient ID"],
        ["doctor_id", "Doctor ID"],
        ["app_date", "Appointment Date"],
        ["app_status", "Appointment Status"]
    ]
};