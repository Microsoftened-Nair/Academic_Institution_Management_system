document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Course data
    const courses = [
        { title: 'Computer Science', description: 'Learn the fundamentals of programming and computer systems.', image: 'https://images.unsplash.com/photo-1610018556010-6a11691bc905?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tcHV0ZXIlMjBzY2llbmNlfGVufDB8fDB8fHww' },
        { title: 'Business Administration', description: 'Develop skills in management, finance, and entrepreneurship.', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QnVzaW5lc3MlMjBBZG1pbmlzdHJhdGlvbnxlbnwwfHwwfHx8MA%3D%3D' },
        { title: 'Graphic Design', description: 'Master the art of visual communication and digital design.', image: 'https://plus.unsplash.com/premium_photo-1661301026318-2ceafb57b0ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8R3JhcGhpYyUyMERlc2lnbnxlbnwwfHwwfHx8MA%3D%3D' },
        { title: 'Psychology', description: 'Explore the human mind and behavior through scientific study.', image: 'https://plus.unsplash.com/premium_photo-1682310144714-cb77b1e6d64a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UHN5Y2hvbG9neXxlbnwwfHwwfHx8MA%3D%3D' },
        { title: 'Environmental Science', description: 'Study the environment and learn about sustainability.', image: 'https://plus.unsplash.com/premium_photo-1661540998860-da104459c959?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RW52aXJvbm1lbnRhbCUyMFNjaWVuY2V8ZW58MHx8MHx8fDA%3D' },
        { title: 'Data Science', description: 'Learn to analyze and interpret complex data.', image: 'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RGF0YSUyMFNjaWVuY2V8ZW58MHx8MHx8fDA%3D' }
    ];

    const courseGrid = document.getElementById('course-grid');

    // Create course cards
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        courseCard.innerHTML = `
            <img src="${course.image}" alt="${course.title}">
            <div class="course-info">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
            </div>
        `;
        courseGrid.appendChild(courseCard);
    });


    // Fetch and display staff hierarchy
    fetch('./data/hierarchy.json')
        .then(response => response.json())
        .then(data => {
            const orgChart = document.getElementById('org-chart');
            orgChart.appendChild(createHierarchyElement(data.institution));
        })
        .catch(error => console.error('Error fetching hierarchy data:', error));

    function createHierarchyElement(node) {
        const li = document.createElement('li');
        const div = document.createElement('div');
        div.className = 'staff-card';
        div.setAttribute('data-role', node.position);

        // const img = document.createElement('img');
        // img.src = `https://source.unsplash.com/100x100/?portrait,${node.position.toLowerCase().replace(/\s+/g, '')}`;
        // img.alt = node.name;

        const name = document.createElement('h3');
        name.textContent = node.name;

        const position = document.createElement('p');
        position.textContent = node.position;

        // div.appendChild(img);
        div.appendChild(name);
        div.appendChild(position);

        li.appendChild(div);

        if (node.children && node.children.length > 0) {
            const ul = document.createElement('ul');
            node.children.forEach(child => {
                ul.appendChild(createHierarchyElement(child));
            });
            li.appendChild(ul);
        }

        div.addEventListener('click', () => {
            let details = `Role: ${node.position}\n`;
            if (node.year_of_joining) {
                details += `Year of Joining: ${node.year_of_joining}\n`;
            }
            if (node.qualifications) {
                details += `Qualifications: ${node.qualifications}\n`;
            }
            if (node.courses_taught) {
                details += `Courses Taught:\n- ${node.courses_taught.join('\n- ')}`;
            }
            alert(details);
        });

        return li;
    }
});

