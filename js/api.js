// ======================================
// OLAH-DATA LMS
// API
// ======================================

const API_URL = "https://script.google.com/macros/s/AKfycby97KPJDtGHoHl65tPXUmIjYHr_XmlOaHMMzFo5KANiBShUd0e5Q9IUaCMI3UUFzUCz/exec";

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

const text = await response.text();

console.log("Status :", response.status);
console.log("Response :", text);

return JSON.parse(text);

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

// Redeem License
async function redeem(data){

    return await post("redeem", data);

}

// ======================================
// GET MY COURSES
// ======================================

async function getMyCourses(userId){

    return await post("myCourses",{

        userId

    });

}

// ======================================
// REDEEM
// ======================================

async function redeem(data){

    return await post("redeem",data);

}

// ======================================
// REDEEM LICENSE
// ======================================

async function redeemLicense(data){

    return await post({

        action: "redeemLicense",

        userId: data.userId,

        nama: data.nama,

        license: data.license

    });

}
