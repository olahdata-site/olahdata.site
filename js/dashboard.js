// ======================================
// DASHBOARD
// ======================================

document.addEventListener("DOMContentLoaded", initDashboard);


// ======================================
// INIT DASHBOARD
// ======================================

async function initDashboard(){

    // ==========================
    // Ambil data user
    // ==========================

    const userData = localStorage.getItem("user");

    // Jika belum login
    if(!userData){

        window.location.href = "login.html";

        return;

    }

    // Ubah data JSON menjadi object
    const user = JSON.parse(userData);

    // ==========================
    // Tampilkan nama user
    // ==========================

    const userName = document.getElementById("userName");

    if(userName){

        userName.textContent = user.nama;

    }

    // ==========================
    // Aktifkan logout
    // ==========================

    setupLogout();

    // ==========================
    // Aktifkan menu mobile
    // ==========================

    setupMobileMenu();

    // ==========================
    // Load course
    // ==========================

    await loadCourses(user.id);

}


// ======================================
// LOGOUT
// ======================================

function setupLogout(){

    const logoutBtn = document.getElementById("logoutBtn");

    if(!logoutBtn){

        return;

    }

    logoutBtn.addEventListener("click", function(e){

        e.preventDefault();

        const confirmLogout = confirm(
            "Yakin ingin keluar dari akun?"
        );

        if(!confirmLogout){

            return;

        }

        // Hapus data login
        localStorage.removeItem("user");

        // Kembali ke halaman login
        window.location.href = "login.html";

    });

}


// ======================================
// LOAD COURSES
// ======================================

async function loadCourses(userId){

    const container =
        document.getElementById("courseContainer");

    // Tampilkan loading
    container.innerHTML = `

        <div class="empty-course">

            <h3>Memuat kelas...</h3>

            <p>
                Tunggu sebentar, kelas kamu sedang disiapkan.
            </p>

        </div>

    `;

    // Ambil course dari backend
    const result = await getMyCourses(userId);

    // Jika request gagal
    if(!result.success){

        container.innerHTML = `

            <div class="empty-course">

                <h3>Gagal memuat kelas</h3>

                <p>
                    ${result.message}
                </p>

            </div>

        `;

        return;

    }

    // Tampilkan course
    renderCourses(result.courses);

}


// ======================================
// RENDER COURSES
// ======================================

function renderCourses(courses){

    const container =
        document.getElementById("courseContainer");

    // Kosongkan container
    container.innerHTML = "";

    // ==========================
    // BELUM ADA COURSE
    // ==========================

    if(!courses || courses.length === 0){

        container.innerHTML = `

            <div class="empty-course">

                <div class="empty-icon">

                    📚

                </div>

                <h3>

                    Belum Ada Kelas

                </h3>

                <p>

                    Masukkan kode license di atas
                    untuk membuka kelas pertamamu.

                </p>

            </div>

        `;

        return;

    }

    // ==========================
    // TAMPILKAN COURSE
    // ==========================

    courses.forEach(function(course){

        const thumbnail = course.thumbnail
            ? course.thumbnail
            : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200";

        const level = course.level
            ? course.level
            : "Basic";

        const description = course.description
            ? course.description
            : "Mulai belajar dan tingkatkan kemampuanmu.";

        container.innerHTML += `

            <article class="course-card">

                <img
                    src="${thumbnail}"
                    alt="${course.name}"
                >

                <div class="course-content">

                    <span class="course-level">

                        ${level}

                    </span>

                    <h3>

                        ${course.name}

                    </h3>

                    <p>

                        ${description}

                    </p>

                    <button
                        class="course-btn"
                        onclick="openCourse('${course.courseId}')"
                    >

                        Continue Learning →

                    </button>

                </div>

            </article>

        `;

    });

}


// ======================================
// OPEN COURSE
// ======================================

function openCourse(courseId){

    window.location.href =
        `course.html?id=${encodeURIComponent(courseId)}`;

}


// ======================================
// MOBILE MENU
// ======================================

function setupMobileMenu(){

    const menuBtn =
        document.getElementById("mobileMenuBtn");

    const sidebar =
        document.querySelector(".sidebar");

    const overlay =
        document.getElementById("mobileOverlay");

    if(!menuBtn || !sidebar || !overlay){

        return;

    }


    // Buka / tutup sidebar

    menuBtn.addEventListener("click", function(){

        sidebar.classList.toggle("active");

        overlay.classList.toggle("active");

    });


    // Tutup ketika area gelap diklik

    overlay.addEventListener("click", function(){

        sidebar.classList.remove("active");

        overlay.classList.remove("active");

    });

}
