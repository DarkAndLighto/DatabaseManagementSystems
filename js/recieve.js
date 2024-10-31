// js/recieve.js
document.addEventListener("DOMContentLoaded", () => {
    // Get the form element by ID
    const form = document.getElementById("userForm");

    // Add an event listener to handle form submission
    form.addEventListener("submit", (event) => {
        // Prevent the default form submission
        event.preventDefault();

        // Extract values from the form fields
        const name = document.getElementById("name").value;
        const lastName = document.getElementById("last_name").value;
        const gender = document.getElementById("gender").value;
        const dateOfBirth = document.getElementById("date_birth").value;
        const phoneNumber = document.getElementById("phone_number").value;
        const address = document.getElementById("address").value;
        const email = document.getElementById("email").value;

        // Log or handle the extracted values as needed
        console.log({
            name,
            lastName,
            gender,
            dateOfBirth,
            phoneNumber,
            address,
            email
        });
    });
});
