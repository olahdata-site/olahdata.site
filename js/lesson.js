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


    if(!userData){

        window.location.href =
            "login.html";

        return;

    }


    // ==========================
    // AMBIL PARAMETER URL
    // ==========================

    const params =
        new URLSearchParams(
            window.location.search
        );


    const courseId =
        params.get(
            "courseId"
        );


    const moduleId =
        params.get(
            "moduleId"
        );


    let lessonId =
        params.get(
            "lessonId"
        );


    // ==========================
    // VALIDASI
    // ==========================

    if(

        !courseId ||

        !moduleId

    ){

        showLessonError(

            "CourseID atau ModuleID tidak ditemukan."

        );

        return;

    }


    // ==========================
    // AMBIL DATA COURSE
    // ==========================

    const result =
        await getCourseDetail(
            courseId
        );


    // ==========================
    // REQUEST GAGAL
    // ==========================

    if(!result.success){

        showLessonError(

            result.message

        );

        return;

    }


    // ==========================
    // CARI MODULE
    // ==========================

    const selectedModule =
        result.modules.find(

            function(module){

                return (

                    String(
                        module.moduleId
                    )

                    ===

                    String(
                        moduleId
                    )

                );

            }

        );


    // ==========================
    // MODULE TIDAK DITEMUKAN
    // ==========================

    if(!selectedModule){

        showLessonError(

            "Module tidak ditemukan."

        );

        return;

    }


    // ==========================
    // CEK LESSON
    // ==========================

    if(

        !selectedModule.lessons ||

        selectedModule.lessons.length === 0

    ){

        showLessonError(

            "Module ini belum memiliki lesson."

        );

        return;

    }


    // ==========================
    // JIKA LESSON BELUM DIPILIH
    // AMBIL LESSON PERTAMA
    // ==========================

    if(!lessonId){

        lessonId =

            selectedModule
            .lessons[0]
            .lessonId;

    }


    // ==========================
    // CARI LESSON AKTIF
    // ==========================

    let selectedLesson =
        selectedModule
        .lessons
        .find(

            function(lesson){

                return (

                    String(
                        lesson.lessonId
                    )

                    ===

                    String(
                        lessonId
                    )

                );

            }

        );


    // ==========================
    // JIKA LESSON TIDAK ADA
    // BUKA LESSON PERTAMA
    // ==========================

    if(!selectedLesson){

        selectedLesson =

            selectedModule
            .lessons[0];

    }


    // ==========================
    // TAMPILKAN HALAMAN
    // ==========================

    renderLessonPage(

        result.course,

        selectedModule,

        selectedLesson

    );

}

// ======================================
// RENDER LESSON PAGE
// ======================================

function renderLessonPage(

    course,

    module,

    activeLesson

){

    const container =
        document.getElementById(
            "lessonContainer"
        );


    if(!container){

        return;

    }

// ==========================
// SET TOMBOL KEMBALI
// ==========================

const backToCourse =
    document.getElementById(
        "backToCourse"
    );


if(

    backToCourse &&

    courseId

){

    backToCourse.href =

        `course.html?id=${

            encodeURIComponent(
                courseId
            )

        }`;

}
    // ==========================
    // URL KEMBALI
    // ==========================

    const backUrl =

        `course.html?id=${encodeURIComponent(

            course.courseId

        )}`;


    // ==========================
    // INDEX LESSON AKTIF
    // ==========================

    const activeIndex =

        module.lessons.findIndex(

            function(lesson){

                return (

                    String(
                        lesson.lessonId
                    )

                    ===

                    String(
                        activeLesson.lessonId
                    )

                );

            }

        );


    // ==========================
    // LESSON SEBELUMNYA
    // ==========================

    const previousLesson =

        activeIndex > 0

        ? module.lessons[
            activeIndex - 1
        ]

        : null;


    // ==========================
    // LESSON BERIKUTNYA
    // ==========================

    const nextLesson =

        activeIndex <

        module.lessons.length - 1

        ? module.lessons[
            activeIndex + 1
        ]

        : null;


    // ==========================
    // RENDER
    // ==========================

    container.innerHTML = `


        <!-- HEADER -->

        <header class="lesson-topbar">


            <a

                href="${backUrl}"

                class="back-course-btn"

            >

                <i class="fa-solid fa-arrow-left"></i>

                Kembali ke Course

            </a>


            <div class="lesson-navigation">


                ${

                    previousLesson

                    ?

                    `

                    <a

                        href="${createLessonUrl(

                            course.courseId,

                            module.moduleId,

                            previousLesson.lessonId

                        )}"

                        class="nav-lesson-btn"

                    >

                        <i class="fa-solid fa-chevron-left"></i>

                        Sebelumnya

                    </a>

                    `

                    :

                    `

                    <button

                        class="nav-lesson-btn"

                        disabled

                    >

                        <i class="fa-solid fa-chevron-left"></i>

                        Sebelumnya

                    </button>

                    `

                }


                ${

                    nextLesson

                    ?

                    `

                    <a

                        href="${createLessonUrl(

                            course.courseId,

                            module.moduleId,

                            nextLesson.lessonId

                        )}"

                        class="nav-lesson-btn"

                    >

                        Selanjutnya

                        <i class="fa-solid fa-chevron-right"></i>

                    </a>

                    `

                    :

                    `

                    <button

                        class="nav-lesson-btn"

                        disabled

                    >

                        Selanjutnya

                        <i class="fa-solid fa-chevron-right"></i>

                    </button>

                    `

                }


            </div>


        </header>


        <!-- LAYOUT -->

        <main class="lesson-layout">


            <!-- MATERI -->

            <section class="lesson-main">


                <div class="lesson-heading">


                    <span class="module-label">

                        ${module.title}

                    </span>


                    <h1>

                        ${activeLesson.title}

                    </h1>


                    <p>

                        <i class="fa-regular fa-clock"></i>

                        ${

                            activeLesson.duration

                            ||

                            "Durasi tidak tersedia"

                        }

                    </p>


                </div>


                <div class="lesson-frame-wrapper">


                    <iframe

                        class="lesson-frame"

                        src="${activeLesson.githubUrl}"

                        title="${activeLesson.title}"

                        loading="lazy"

                        allowfullscreen

                    ></iframe>


                </div>


            </section>


            <!-- SIDEBAR LESSON -->

            <aside class="lesson-sidebar">


                <div class="lesson-sidebar-header">


                    <span>

                        Module

                    </span>


                    <h2>

                        ${module.title}

                    </h2>


                    <p>

                        ${module.lessons.length}

                        Lesson

                    </p>


                </div>


                <div class="lesson-sidebar-list">


                    ${renderModuleLessons(

                        course.courseId,

                        module,

                        activeLesson.lessonId

                    )}


                </div>


            </aside>


        </main>


    `;

}

// ======================================
// BUAT URL LESSON
// ======================================

function createLessonUrl(

    courseId,

    moduleId,

    lessonId

){

    return (

        `lesson.html?courseId=${

            encodeURIComponent(
                courseId
            )

        }&moduleId=${

            encodeURIComponent(
                moduleId
            )

        }&lessonId=${

            encodeURIComponent(
                lessonId
            )

        }`

    );

}


// ======================================
// RENDER LESSON MODULE
// ======================================

function renderModuleLessons(

    courseId,

    module,

    activeLessonId

){

    return module.lessons.map(

        function(

            lesson,

            index

        ){


            const isActive =

                String(
                    lesson.lessonId
                )

                ===

                String(
                    activeLessonId
                );


            return `


                <a

                    href="${createLessonUrl(

                        courseId,

                        module.moduleId,

                        lesson.lessonId

                    )}"

                    class="module-lesson-item

                    ${

                        isActive

                        ?

                        "active"

                        :

                        ""

                    }"

                >


                    <span class="module-lesson-number">

                        ${index + 1}

                    </span>


                    <span class="module-lesson-info">


                        <strong>

                            ${lesson.title}

                        </strong>


                        <small>

                            ${

                                lesson.duration

                                ||

                                ""

                            }

                        </small>


                    </span>


                    <i

                        class="fa-solid

                        ${

                            isActive

                            ?

                            "fa-play"

                            :

                            "fa-chevron-right"

                        }"

                    ></i>


                </a>


            `;

        }

    ).join("");

}

// ======================================
// ERROR
// ======================================

function showLessonError(message){

    const container =
        document.getElementById(
            "lessonContainer"
        );


    if(!container){

        return;

    }


    container.innerHTML = `


        <section class="lesson-error">


            <h2>

                Gagal memuat materi

            </h2>


            <p>

                ${message}

            </p>


            <a

                href="dashboard.html"

            >

                Kembali ke Dashboard

            </a>


        </section>


    `;

}
