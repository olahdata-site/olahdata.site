// ======================================
// COURSE PAGE
// ======================================

document.addEventListener(

    "DOMContentLoaded",

    initCourse

);


// ======================================
// INIT COURSE
// ======================================

async function initCourse(){


    // ==========================
    // Cek user login
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
    // Ambil CourseID dari URL
    // ==========================

    const params =
        new URLSearchParams(
            window.location.search
        );


    const courseId =
        params.get(
            "id"
        );


    // ==========================
    // Validasi CourseID
    // ==========================

    if(!courseId){

        showCourseError(

            "CourseID tidak ditemukan."

        );

        return;

    }


    // ==========================
    // Ambil data course
    // ==========================

    const result =
        await getCourseDetail(
            courseId
        );


    // ==========================
    // Request gagal
    // ==========================

    if(!result.success){

        showCourseError(

            result.message

        );

        return;

    }


    // ==========================
    // Tampilkan Course
    // ==========================

    renderCourse(

        result.course,

        result.modules

    );

}


// ======================================
// RENDER COURSE
// ======================================

function renderCourse(

    course,

    modules

){


    const container =
        document.getElementById(
            "courseContainer"
        );


    const thumbnail =
        course.thumbnail ||

        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200";


    container.innerHTML = `


        <!-- COURSE HEADER -->

        <section class="course-hero">


            <img

                src="${thumbnail}"

                alt="${course.name}"

            >


            <div class="course-info">


                <span class="course-level">

                    ${course.level || "Basic"}

                </span>


                <h1>

                    ${course.name}

                </h1>


                <p>

                    ${course.description || ""}

                </p>


            </div>


        </section>


        <!-- MODULE -->

        <section class="module-section">


            <h2>

                Course Content

            </h2>


            <div class="module-list">


                ${renderModules(
                    modules
                )}


            </div>


        </section>


    `;

}


// ======================================
// RENDER MODULE
// ======================================

function renderModules(modules){


    // Belum ada module

    if(

        !modules ||

        modules.length === 0

    ){

        return `

            <div class="empty-module">

                <h3>

                    Belum ada module

                </h3>


                <p>

                    Materi untuk kelas ini
                    sedang disiapkan.

                </p>

            </div>

        `;

    }


    // Tampilkan module

    return modules.map(

        function(module,index){


            return `


                <article class="module-card">


                    <div class="module-header">


                        <div>


                            <span class="module-number">

                                Module ${index + 1}

                            </span>


                            <h3>

                                ${module.title}

                            </h3>


                        </div>


                        <span class="lesson-count">

                            ${module.lessons.length}

                            Lesson

                        </span>


                    </div>


                    <div class="lesson-list">


                        ${renderLessons(

                            module.lessons

                        )}


                    </div>


                </article>


            `;

        }

    ).join("");

}


// ======================================
// RENDER LESSON
// ======================================

function renderLessons(lessons){


    if(

        !lessons ||

        lessons.length === 0

    ){

        return `

            <p class="no-lesson">

                Belum ada lesson.

            </p>

        `;

    }


    return lessons.map(

        function(lesson,index){


            return `


                <a

                    class="lesson-item"

                    href="lesson.html?id=${encodeURIComponent(
                    lesson.lessonId
                    )}"

                >


                    <span class="lesson-number">

                        ${index + 1}

                    </span>


                    <span class="lesson-title">

                        ${lesson.title}

                    </span>


                    <span class="lesson-duration">

                        ${lesson.duration || ""}

                    </span>


                    <i

                        class="fa-solid fa-arrow-up-right-from-square"

                    ></i>


                </a>


            `;

        }

    ).join("");

}


// ======================================
// ERROR
// ======================================

function showCourseError(message){


    const container =
        document.getElementById(
            "courseContainer"
        );


    container.innerHTML = `


        <section class="error-box">


            <h2>

                Gagal memuat kelas

            </h2>


            <p>

                ${message}

            </p>


            <a

                href="dashboard.html"

                class="back-button"

            >

                Kembali ke Dashboard

            </a>


        </section>


    `;

}
