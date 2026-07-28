// ======================================
// DASHBOARD
// ======================================

document.addEventListener("DOMContentLoaded", initDashboard);

async function initDashboard(){

    // ==========================
    // Cek Login
    // ==========================

    const user = JSON.parse(localStorage.getItem("user"));

    if(!user){

        window.location.href = "login.html";

        return;

    }

    // ==========================
    // Tampilkan Nama User
    // ==========================

    document.getElementById("userName").textContent = user.nama;

    // ==========================
    // Load Course
    // ==========================

    await loadCourses(user.id);

}

// ======================================
// LOAD COURSES
// ======================================

async function loadCourses(userId){

    const result = await getMyCourses(userId);

    if(!result.success){

        alert(result.message);

        return;

    }

    renderCourses(result.courses);

}

// ======================================
// RENDER COURSE
// ======================================

function renderCourses(courses){

    const container = document.getElementById("courseContainer");

    container.innerHTML = "";

    // ==========================
    // Belum ada Course
    // ==========================

    if(courses.length===0){

        container.innerHTML=`

            <div class="empty-course">

                <h2>📚 Belum Ada Kelas</h2>

                <p>

                    Redeem license terlebih dahulu
                    untuk membuka kelas.

                </p>

            </div>

        `;

        return;

    }

    // ==========================
    // Loop Course
    // ==========================

    courses.forEach(course=>{

        container.innerHTML += `

            <div class="course-card">

                <img src="${course.thumbnail}" alt="${course.name}">

                <div class="course-content">

                    <span class="course-level">

                        ${course.level}

                    </span>

                    <h3>

                        ${course.name}

                    </h3>

                    <p>

                        ${course.description}

                    </p>

                    <button
                        class="course-btn"
                        onclick="openCourse('${course.courseId}')">

                        Continue Learning →

                    </button>

                </div>

            </div>

        `;

    });

}

// ======================================
// OPEN COURSE
// ======================================

function openCourse(courseId){

    window.location.href =
        `course.html?id=${courseId}`;

}
