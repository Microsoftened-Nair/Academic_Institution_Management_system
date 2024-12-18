document.addEventListener('DOMContentLoaded', () => {
    const courseList = document.getElementById('course-list');
    const addCourseForm = document.getElementById('add-course-form');

    const courses = [
        { title: 'Computer Science', description: 'Learn the fundamentals of programming and computer systems.', image: 'https://images.unsplash.com/photo-1610018556010-6a11691bc905?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tcHV0ZXIlMjBzY2llbmNlfGVufDB8fDB8fHww' },
        { title: 'Business Administration', description: 'Develop skills in management, finance, and entrepreneurship.', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QnVzaW5lc3MlMjBBZG1pbmlzdHJhdGlvbnxlbnwwfHwwfHx8MA%3D%3D' },
        { title: 'Graphic Design', description: 'Master the art of visual communication and digital design.', image: 'https://plus.unsplash.com/premium_photo-1661301026318-2ceafb57b0ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8R3JhcGhpYyUyMERlc2lnbnxlbnwwfHwwfHx8MA%3D%3D' },
        { title: 'Psychology', description: 'Explore the human mind and behavior through scientific study.', image: 'https://plus.unsplash.com/premium_photo-1682310144714-cb77b1e6d64a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UHN5Y2hvbG9neXxlbnwwfHwwfHx8MA%3D%3D' },
        { title: 'Environmental Science', description: 'Study the environment and learn about sustainability.', image: 'https://plus.unsplash.com/premium_photo-1661540998860-da104459c959?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RW52aXJvbm1lbnRhbCUyMFNjaWVuY2V8ZW58MHx8MHx8fDA%3D' },
        { title: 'Data Science', description: 'Learn to analyze and interpret complex data.', image: 'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RGF0YSUyMFNjaWVuY2V8ZW58MHx8MHx8fDA%3D' }
    ];

    function displayCourses() {
        courseList.innerHTML = '';
        courses.forEach((course, index) => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card');
            courseCard.innerHTML = `
                <img src="${course.image}" alt="${course.title}">
                <div class="course-info">
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <button onclick="removeCourse(${index})">Remove Course</button>
                </div>
            `;
            courseList.appendChild(courseCard);
        });
    }

    function addCourse(title, description, image) {
        courses.push({ title, description, image });
        displayCourses();
    }

    window.removeCourse = function(index) {
        courses.splice(index, 1);
        displayCourses();
    };

    addCourseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('course-title').value;
        const description = document.getElementById('course-description').value;
        const image = document.getElementById('course-image').value;
        addCourse(title, description, image);
        addCourseForm.reset();
    });

    displayCourses();
});

