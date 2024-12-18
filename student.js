document.addEventListener('DOMContentLoaded', () => {
    const studentInfo = document.getElementById('student-info');
    const enrolledCourses = document.getElementById('enrolled-courses');
    const studentPhoto = document.getElementById('student-photo');

    // Mock student data (replace with actual data in a real application)
    const student = {
        name: 'John Doe',
        id: '12345',
        major: 'Computer Science',
        year: 'Junior',
        photo: 'https://source.unsplash.com/300x300/?student'
    };

    // Mock enrolled courses (replace with actual data in a real application)
    const courses = [
        { title: 'Introduction to Programming', grade: 'A' },
        { title: 'Data Structures', grade: 'B+' },
        { title: 'Web Development', grade: 'A-' }
    ];

    function displayStudentInfo() {
        studentPhoto.src = student.photo;
        studentInfo.innerHTML = `
            <p><strong>Name:</strong> ${student.name}</p>
            <p><strong>Student ID:</strong> ${student.id}</p>
            <p><strong>Major:</strong> ${student.major}</p>
            <p><strong>Year:</strong> ${student.year}</p>
        `;
    }

    function displayEnrolledCourses() {
        enrolledCourses.innerHTML = '';
        courses.forEach(course => {
            const div = document.createElement('div');
            div.className = 'course-card';
            div.innerHTML = `
                <h3>${course.title}</h3>
                <p>Grade: ${course.grade}</p>
            `;
            enrolledCourses.appendChild(div);
        });
    }

    displayStudentInfo();
    displayEnrolledCourses();
});

