// ==========================================
// REGISTER
// ==========================================

const form = document.getElementById("registerForm");

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();

    const email = document.getElementById("email").value.trim();

    const whatsapp = document.getElementById("wa").value.trim();

    const password = document.getElementById("password").value;

    const confirm = document.getElementById("confirmPassword").value;

    if(password !== confirm){

        alert("Password tidak sama!");

        return;

    }

    const button = document.querySelector(".login-btn");

    button.disabled = true;

    button.innerHTML = "Mendaftarkan...";

    const result = await register({

        nama,

        email,

        whatsapp,

        password

    });

    alert(result.message);

    button.disabled = false;

    button.innerHTML = "DAFTAR";

    if(result.success){

        window.location.href = "login.html";

    }

});