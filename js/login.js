// ======================================
// LOGIN
// ======================================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    const btn = loginForm.querySelector("button");

    btn.disabled = true;
    btn.innerHTML = "Sedang Login...";

    const result = await login({

        email,
        password

    });

    btn.disabled = false;
    btn.innerHTML = "LOGIN";

    if(result.success){

        // Simpan user
        localStorage.setItem(
            "user",
            JSON.stringify(result.user)
        );

        alert("Login berhasil!");

        location.href = "dashboard.html";

    }else{

        alert(result.message);

    }

});
