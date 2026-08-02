// ======================================
// MY COURSES
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    initMyCourses
);


// ======================================
// INIT MY COURSES
// ======================================

async function initMyCourses(){

    // ==========================
    // Ambil data user
    // ==========================

    const userData =
        localStorage.getItem(
            "user"
        );


    // Jika belum login

    if(!userData){

        window.location.href =
            "login.html";

        return;

    }


    // Ubah JSON menjadi object

    let user;


    try{

        user =
            JSON.parse(
                userData
            );

    }catch(error){

        console.error(
            "Data user rusak:",
            error
        );


        localStorage.removeItem(
            "user"
        );


        window.location.href =
            "login.html";

        return;

    }


    // ==========================
    // Validasi UserID
    // ==========================

    if(!user.id){

        alert(
            "Data user tidak lengkap. Silakan login kembali."
        );


        localStorage.removeItem(
            "user"
        );


        window.location.href =
            "login.html";

        return;

    }


    // ==========================
    // Aktifkan fitur halaman
    // ==========================

    setupLogout();

    setupMobileMenu();


    // ==========================
    // Load course user
    // ==========================

    await loadMyCourses(
        user.id
    );

}


// ======================================
// LOAD MY COURSES
// ======================================

async function loadMyCourses(userId){

    const container =
        document.getElementById(
            "myCourseContainer"
        );


    // Pastikan container ada

    if(!container){

        console.error(
            "myCourseContainer tidak ditemukan."
        );

        return;

    }


    // ==========================
    // TAMPILKAN LOADING
    // ==========================

    container.innerHTML = `

        <div class="loading-course">

            <i
                class="fa-solid fa-spinner"
            ></i>

            <h3>

                Memuat kelas...

            </h3>

            <p>

                Tunggu sebentar,
                kelas kamu sedang disiapkan.

            </p>

        </div>

    `;


    try{

        // ==========================
        // AMBIL COURSE DARI API
        // ==========================

        const result =
            await getMyCourses(
                userId
            );


        console.log(
            "My Courses:",
            result
        );


        // ==========================
        // REQUEST GAGAL
        // ==========================

        if(!result){

            throw new Error(
                "Server tidak memberikan respons."
            );

        }


        if(!result.success){

            renderCourseError(

                result.message ||

                "Gagal memuat kelas."

            );

            return;

        }


        // ==========================
        // TAMPILKAN COURSE
        // ==========================

        renderMyCourses(

            result.courses || []

        );


    }catch(error){

        console.error(
            "Error loadMyCourses:",
            error
        );


        renderCourseError(

            "Tidak dapat terhubung ke server."

        );

    }

}


// ======================================
// RENDER MY COURSES
// ======================================

function renderMyCourses(courses){

    const container =
        document.getElementById(
            "myCourseContainer"
        );


    if(!container){

        return;

    }


    // Kosongkan container

    container.innerHTML = "";


    // ==========================
    // BELUM ADA COURSE
    // ==========================

    if(

        !courses ||

        courses.length === 0

    ){

        container.innerHTML = `

            <div class="empty-course">

                <div class="empty-icon">

                    📚

                </div>

                <h3>

                    Belum Ada Kelas

                </h3>

                <p>

                    Kamu belum memiliki kelas.
                    Masukkan kode license
                    di halaman Dashboard
                    untuk membuka kelas.

                </p>

            </div>

        `;

        return;

    }


    // ==========================
    // TAMPILKAN COURSE
    // ==========================

    courses.forEach(

        function(course){

            // Thumbnail

            const thumbnail =

                course.thumbnail ||

                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200";


            // Level

            const level =

                course.level ||

                "Basic";


            // Deskripsi

            const description =

                course.description ||

                "Mulai belajar dan tingkatkan kemampuanmu.";


            // ==========================
            // PROGRESS SEMENTARA
            // ==========================

            /*
                Progress asli belum dihitung
                dari sheet Progress.

                Untuk tahap ini,
                tampilkan 0%.
            */

            const progress = 0;

            const completed = 0;

            const totalLesson = 0;


            // ==========================
            // BUAT CARD
            // ==========================

            container.innerHTML += `

                <article class="course-card">

                    <img

                        src="${thumbnail}"

                        alt="${escapeHTML(
                            course.name
                        )}"

                    >


                    <div class="course-content">


                        <!-- LEVEL -->

                        <span class="course-level">

                            ${escapeHTML(
                                level
                            )}

                        </span>


                        <!-- NAMA COURSE -->

                        <h3>

                            ${escapeHTML(
                                course.name
                            )}

                        </h3>


                        <!-- DESKRIPSI -->

                        <p class="course-description">

                            ${escapeHTML(
                                description
                            )}

                        </p>


                        <!-- PROGRESS HEADER -->

                        <div class="progress-header">

                            <span>

                                Progress

                            </span>


                            <span
                                class="progress-percent"
                            >

                                ${progress}%

                            </span>

                        </div>


                        <!-- PROGRESS BAR -->

                        <div class="progress-bar">

                            <div

                                class="progress-fill"

                                style="
                                    width:${progress}%
                                "

                            ></div>

                        </div>


                        <!-- PROGRESS TEXT -->

                        <p class="progress-text">

                            ${completed}
                            dari
                            ${totalLesson}
                            lesson selesai

                        </p>


                        <!-- BUTTON -->

                        <button

                            type="button"

                            class="course-btn"

                            onclick="
                                openCourse(
                                    '${escapeAttribute(
                                        course.courseId
                                    )}'
                                )
                            "

                        >

                            Continue Learning →

                        </button>


                    </div>

                </article>

            `;

        }

    );

}


// ======================================
// OPEN COURSE
// ======================================

function openCourse(courseId){

    if(!courseId){

        alert(
            "CourseID tidak ditemukan."
        );

        return;

    }


    window.location.href =

        "course.html?id=" +

        encodeURIComponent(
            courseId
        );

}


// ======================================
// ERROR COURSE
// ======================================

function renderCourseError(message){

    const container =
        document.getElementById(
            "myCourseContainer"
        );


    if(!container){

        return;

    }


    container.innerHTML = `

        <div class="empty-course">

            <div class="empty-icon">

                ⚠️

            </div>

            <h3>

                Gagal Memuat Kelas

            </h3>

            <p>

                ${escapeHTML(
                    message
                )}

            </p>

        </div>

    `;

}


// ======================================
// LOGOUT
// ======================================

function setupLogout(){

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    if(!logoutBtn){

        return;

    }


    logoutBtn.addEventListener(

        "click",

        function(e){

            e.preventDefault();


            const confirmLogout =

                confirm(

                    "Yakin ingin keluar dari akun?"

                );


            if(!confirmLogout){

                return;

            }


            // Hapus data user

            localStorage.removeItem(
                "user"
            );


            // Kembali ke login

            window.location.href =
                "login.html";

        }

    );

}


// ======================================
// MOBILE MENU
// ======================================

function setupMobileMenu(){

    const menuBtn =
        document.getElementById(
            "mobileMenuBtn"
        );


    const sidebar =
        document.getElementById(
            "sidebar"
        );


    const overlay =
        document.getElementById(
            "mobileOverlay"
        );


    if(

        !menuBtn ||

        !sidebar ||

        !overlay

    ){

        console.log(

            "Elemen mobile menu tidak ditemukan."

        );

        return;

    }


    // ==========================
    // BUKA / TUTUP SIDEBAR
    // ==========================

    menuBtn.addEventListener(

        "click",

        function(){

            sidebar.classList.toggle(
                "active"
            );


            overlay.classList.toggle(
                "active"
            );

        }

    );


    // ==========================
    // TUTUP SAAT OVERLAY DIKLIK
    // ==========================

    overlay.addEventListener(

        "click",

        function(){

            sidebar.classList.remove(
                "active"
            );


            overlay.classList.remove(
                "active"
            );

        }

    );

}


// ======================================
// ESCAPE HTML
// ======================================

function escapeHTML(value){

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value || "";


    return div.innerHTML;

}


// ======================================
// ESCAPE ATTRIBUTE
// ======================================

function escapeAttribute(value){

    return String(

        value || ""

    )

    .replaceAll(
        "&",
        "&amp;"
    )

    .replaceAll(
        "'",
        "&#39;"
    )

    .replaceAll(
        '"',
        "&quot;"
    )

    .replaceAll(
        "<",
        "&lt;"
    )

    .replaceAll(
        ">",
        "&gt;"
    );

}
