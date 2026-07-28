// ======================================
// TATA-DATA LMS
// API
// ======================================

const API_URL = "https://script.google.com/macros/s/AKfycbz2hedPSBvIktgtlpkmYKGtDHTqlg30F8OLZ79NH9TP_VOoBiR9WWLCypxNyra7TnwL/exec";

// Generic POST
async function post(action, data = {}) {

    const formData = new URLSearchParams();

    formData.append("action", action);

    Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            body: formData
        });

        return await response.json();

    } catch (error) {

        console.error(error);

        return {
            success: false,
            message: "Tidak dapat terhubung ke server."
        };

    }

}

// Register
async function register(data) {

    return await post("register", data);

}

// Login
async function login(data){

    return await post("login", data);

}
