//The fields here are the columns of each table (as seen in PG admit)
const tableFields = {
    "users": ["user_id", "occupation", "first_name", "last_name", "gender", "date_of_birth"],
    "patient": ["patient_id", "balance"],
    "managers": ["manager_id"],
    "doctors": ["doctor_id", "department_id", "license_id"],
    "nurses": ["nurse_id", "department_id"],
    "staff": ["staff_id", "department_id", "role"],
    "contact_information": ["contact_id", "user_id", "address", "email", "phone_number"],
    "departments": ["department_id", "hospital_id", "manager_id", "name", "description", "phone_number"],
    "emergency_contact": ["em_con_id", "first_name", "last_name", "gender", "date_of_birth", "relationship", "phone_number", "address", "email"],
    "insurance": ["insurance_id", "insurance_provider", "policy_number", "coverage_amount"],
    "appointments": ["appointment_id", "patient_id", "doctor_id", "app_date", "app_status"],
    "payments": ["payment_id", "appointment_id", "amount"],
    "prescriptions": ["prescription_id", "appointment_id", "dosage", "start_date", "end_date"],
    "medications": ["medication_id", "name", "administration_method", "manufacturer", "expiry_date", "supply"],
    "prescription_medications": ["pres_med_id", "prescription_id", "medication_id"],
    "city": ["city_id", "name"],
    "district": ["district_id", "name"]
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
        "ID",
        "Account Balance"
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
    "staff": [
        "",
        "#",
        "ID",
        "Department ID",
        "Role"
    ],
    "nurses": [
        "",
        "#",
        "ID",
        "Department ID"
    ],
    "appointments": [
        "",
        "#",
        "ID",
        "Patient ID",
        "Doctor ID",
        "Appointment Date",
        "Appointment Status"
    ],
    "payments": [
        "",
        "#",
        "ID",
        "Appointment ID",
        "amount"
    ],
    "city": [
        "",
        "#",
        "ID",
        "Name"
    ],
    "prescriptions": [
        "",
        "#",
        "ID",
        "Appointment ID",
        "Dosage",
        "Start date",
        "End date"
    ],
    "medications": [
        "",
        "#",
        "ID",
        "Name",
        "Administration Method",
        "Manufacturer",
        "Expiry date",
        "supply"
    ],
    "prescription_medications": [
        "",
        "#",
        "ID",
        "Prescription ID",
        "Medication ID"
    ],
    "district": [
        "",
        "#",
        "ID",
        "Name"
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
        ["patient_id", "ID"],
        ["balance", "Account Balance"]
    ],
    "managers": [
        ["manager_id", "ID"]
    ],
    "doctors": [
        ["doctor_id", "ID"],
        ["department_id", "Department ID"],
        ["license_id", "License ID"]
    ],
    "staff": [
        ["staff_id", "ID"],
        ["department_id", "Department ID"],
        ["role", "Role"]
    ],
    "nurses": [
        ["nurse_id", "ID"],
        ["department_id", "Department ID"]
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
    ],
    "payments": [
        ["payment_id", "ID"],
        ["appointment_id", "ID"],
        ["amount", "Amount"]
    ],
    "prescriptions": [
        ["prescription_id", "ID"],
        ["appointment_id", "Appointment ID"],
        ["dosage", "Dosage"],
        ["start_date", "Start date"],
        ["end_date", "End date"]
    ],
    "medications": [
        ["medication_id", "ID"],
        ["name", "Name"],
        ["administration_method", "Administration method"],
        ["manufacturer", "Manufacturer"],
        ["expiry_date", "Expiry date"],
        ["supply", "Supply"]
    ],
    "prescription_medications": [
        ["pres_med_id", "ID"],
        ["prescription_id", "Prescription ID"],
        ["medication_id", "Medication ID"]
    ],
    "city": [
        ["city_id", "ID"],
        ["name", "Name"]
    ],
    "district": [
        ["district_id", "ID"],
        ["name", "Name"]
    ]
};