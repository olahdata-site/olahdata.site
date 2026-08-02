// ======================================
// REDEEM LICENSE
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("redeemBtn");

    if(btn){

        btn.addEventListener("click", redeemLicense);

    }

});

async function redeemLicense(){

    const user = JSON.parse(localStorage.getItem("user"));

    const code = document
        .getElementById("licenseCode")
        .value
        .trim();

    if(code===""){

        alert("Masukkan kode license.");

        return;

    }

    const btn=document.getElementById("redeemBtn");

    btn.disabled=true;
    btn.innerHTML="Redeeming...";

    const result = await redeemLicense({
        userId: user.id,
        nama: user.nama,
        license: licenseCode
    });

    btn.disabled=false;
    btn.innerHTML="Redeem";

    alert(result.message);

    if(result.success){

        document.getElementById("licenseCode").value="";

        await loadCourses(user.id);

    }

}
