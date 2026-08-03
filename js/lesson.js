// ======================================
// LESSON PAGE
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    initLesson
);


// ======================================
// INIT LESSON
// ======================================

async function initLesson(){

    // ==========================
    // CEK USER LOGIN
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


    // ==========================
    // VALIDASI DATA USER
    // ==========================

    try{

        JSON.parse(
            userData
        );

    }catch(error){

        console.error(
            "Data user tidak valid:",
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
    // AMBIL LESSON ID DARI URL
    // ==========================

    const params =

        new URLSearchParams(

            window.location.search

        );


    const lessonId =

        params.get(
            "id"
        );


    // ==========================
    // VALIDASI LESSON ID
    // ==========================

    if(!lessonId){

        showLessonError(

            "LessonID tidak ditemukan."

        );

        return;

    }


    // ==========================
    // AKTIFKAN FITUR HALAMAN
    // ==========================

    setupLogout();

    setupMobileMenu();


    // ==========================
    // AMBIL DETAIL LESSON
    // ==========================

    try{

        const result =

            await getLessonDetail(

                lessonId

            );


        console.log(
            "Lesson Detail:",
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

            showLessonError(

                result.message ||

                "Gagal memuat materi."

            );

            return;

        }


        // ==========================
        // VALIDASI DATA LESSON
        // ==========================

        if(

            !result.lesson ||

            !result.lesson.githubUrl

        ){

            showLessonError(

                "URL materi belum tersedia."

            );

            return;

        }


        // ==========================
        // TAMPILKAN LESSON
        // ==========================

        renderLesson(

            result.lesson

        );


    }catch(error){

        console.error(

            "Error initLesson:",

            error

        );


        showLessonError(

            "Tidak dapat terhubung ke server."

        );

    }

}


// ======================================
// RENDER LESSON
// ======================================

function renderLesson(lesson){

    const container =

        document.getElementById(

            "lessonContent"

        );


    if(!container){

        console.error(

            "lessonContent tidak ditemukan."

        );

        return;

    }


    // ==========================
    // DATA LESSON
    // ==========================

    const title =

        lesson.title ||

        "Materi Lesson";


    const duration =

        lesson.duration ||

        "";


    const githubUrl =

        lesson.githubUrl;


    // ==========================
    // JUDUL HALAMAN
    // ==========================

    document.title =

        title +

        " | OLAH-DATA";


    // ==========================
    // TAMPILKAN MATERI
    // ==========================

    container.className =

        "lesson-view";


    container.innerHTML = `

        <article class="lesson-article">


            <!-- ================= -->
            <!-- HEADER LESSON -->
            <!-- ================= -->

            <div class="lesson-top">


                <div>


                    <span class="lesson-label">

                        <i
                            class="fa-solid fa-book-open"
                        ></i>

                        Materi Pelatihan

                    </span>


                    <h1 class="lesson-title">

                        ${escapeHTML(
                            title
                        )}

                    </h1>


                    ${

                        duration

                        ?

                        `

                        <div class="lesson-meta">

                            <i
                                class="fa-regular fa-clock"
                            ></i>

                            <span>

                                ${escapeHTML(
                                    duration
                                )}

                            </span>

                        </div>

                        `

                        :

                        ""

                    }


                </div>


                <!-- BUKA TAB BARU -->

                <a

                    href="${escapeAttribute(
                        githubUrl
                    )}"

                    target="_blank"

                    rel="noopener"

                    class="open-external"

                >

                    <i
                        class="fa-solid fa-arrow-up-right-from-square"
                    ></i>

                    Buka Penuh

                </a>


            </div>


            <!-- ================= -->
            <!-- IFRAME -->
            <!-- ================= -->

            <div class="lesson-frame-wrapper">


                <!-- Loading iframe -->

                <div
                    class="iframe-loading"
                    id="iframeLoading"
                >

                    <i
                        class="fa-solid fa-spinner"
                    ></i>

                    <p>

                        Memuat materi...

                    </p>

                </div>


                <!-- Website GitHub Pages -->

                <iframe

                    id="lessonFrame"

                    class="lesson-frame"

                    src="${escapeAttribute(
                        githubUrl
                    )}"

                    title="${escapeAttribute(
                        title
                    )}"

                    loading="eager"

                    allowfullscreen

                ></iframe>


            </div>


        </article>

    `;


    // ==========================
    // LOADING IFRAME
    // ==========================

    const frame =

        document.getElementById(

            "lessonFrame"

        );


    const loading =

        document.getElementById(

            "iframeLoading"

        );


    if(

        !frame ||

        !loading

    ){

        return;

    }


    // Sembunyikan loading
    // setelah iframe selesai dimuat

    frame.addEventListener(

        "load",

        function(){

            loading.classList.add(

                "hidden"

            );

        }

    );


    // Jika terlalu lama,
    // loading tetap disembunyikan

    setTimeout(

        function(){

            loading.classList.add(

                "hidden"

            );

        },

        10000

    );

}


// ======================================
// TAMPILKAN ERROR
// ======================================

function showLessonError(message){

    const container =

        document.getElementById(

            "lessonContent"

        );


    if(!container){

        return;

    }


    container.className =

        "lesson-error";


    container.innerHTML = `

        <div class="lesson-error-icon">

            ⚠️

        </div>


        <h2>

            Gagal Memuat Materi

        </h2>


        <p>

            ${escapeHTML(
                message
            )}

        </p>


        <a

            href="my-courses.html"

            class="back-button"

        >

            <i
                class="fa-solid fa-arrow-left"
            ></i>

            Kembali ke My Courses

        </a>

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


            // Hapus data login

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

        return;

    }


    // Buka / tutup sidebar

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


    // Tutup sidebar
    // saat overlay diklik

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
