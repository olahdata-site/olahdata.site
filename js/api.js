// ======================================
// TATA-DATA LMS
// API
// ======================================

const API_URL = "https://script.google.com/macros/s/AKfycbxr-u331aOQBVEHrzf6YWDrD6FnNiIHbBr3KZKMVtO1LWwcwgFoal-LZKn2Cev0QbLe/exec";

// Generic POST
async function post(action, data = {}) {

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                action,
                ...data

            })

        });

        const result = await response.json();

        return result;

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
