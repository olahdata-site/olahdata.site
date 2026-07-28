// ==========================================
// TATA-DATA API
// ==========================================

const API_URL = "https://script.google.com/macros/s/AKfycbxaHZVffrICrFirgJPz4E6fL7eO9W7-ImJp1vhSA7akhe_5T9KzcLN0qNEegNNARezG/exec";

// Generic POST
async function post(action, data = {}) {

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },

            body: JSON.stringify({

                action,

                ...data

            })

        });

        return await response.json();

    } catch (err) {

        return {

            success: false,

            message: "Tidak dapat terhubung ke server."

        };

    }

}

// Register
async function register(data){

    return await post("register", data);

}

// Login
async function login(data){

    return await post("login", data);

}
