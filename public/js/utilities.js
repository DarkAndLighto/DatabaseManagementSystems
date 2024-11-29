//The fields here are the columns of each table (as seen in PG admit)
const tableFields = {
    "users": ["user_id", "first_name", "last_name", "gender", "date_of_birth"],
    "contact_information": ["contact_id", "user_id", "address", "email", "phone_number"],
    "patient": ["patient_id"],
    "emergency_contact": ["em_con_id", "first_name", "last_name", "gender", "date_of_birth", "relationship", "phone_number", "address", "email"],
    "insurance": ["insurance_id", "insurance_provider", "policy_number", "coverage_amount"]
};

//The fields here are the headers in the table in which they're being displayed (can be anything)
const tableHeaders = {
    "users": [
        "",
        "#",
        "ID",
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
    ]
};

const dropdownItems = {
    "users": [
        ["user_id", "ID"],
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
    ]
};