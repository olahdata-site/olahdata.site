// ======================================
// REGISTER
// ======================================

const form = document.getElementById("registerForm");

form.addEventListener("submit", registerAccount);

async function registerAccount(e){

    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();

    const email = document.getElementById("email").value.trim();

    const whatsapp = document.getElementById("wa").value.trim();

    const password = document.getElementById("password").value;

    const confirm = document.getElementById("confirmPassword").value;

    // ==========================
    // Validasi Frontend
    // ==========================

    if(
        !nama ||
        !email ||
        !whatsapp ||
        !password ||
        !confirm
    ){

        alert("Semua field wajib diisi.");

        return;

    }

    if(password !== confirm){

        alert("Konfirmasi password tidak sama.");

        return;

    }

    // ==========================
    // Disable Button
    // ==========================

    const button = document.querySelector("#registerForm button");

    button.disabled = true;

    button.innerHTML = "Mendaftarkan...";

    // ==========================
    // Kirim ke API
    // ==========================

    const result = await register({

        nama,

        email,

        whatsapp,

        password

    });

    // ==========================
    // Enable Button
    // ==========================

    button.disabled = false;

    button.innerHTML = "Daftar";

    // ==========================
    // Response
    // ==========================

    if(result.success){

        alert(result.message);

        form.reset();

        window.location.href="login.html";

    }else{

        alert(result.message);

    }

}
