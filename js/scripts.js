document.addEventListener("DOMContentLoaded", () => {
    loadBlogs();
    loadProjects();
    initScroll('blog-scroll');
    initScroll('projects-scroll');
});

async function loadBlogs() {
    try {
        const response = await fetch('https://feed2json.org/convert?url=https://medium.com/feed/@arsanatl');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        const blogContainer = document.getElementById('blog-scroll');
        
        data.items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <h2>${item.title}</h2>
                <p>${item.description}</p>
                <a href="${item.link}" target="_blank">Read more</a>
            `;
            blogContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading blogs:', error);
    }
}

// Load GitHub Projects
async function loadProjects() {
    const response = await fetch('https://api.github.com/users/sanatladkat/repos');
    const data = await response.json();
    const projectContainer = document.getElementById('projects-scroll');
    
    data.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h2>${project.name}</h2>
            <p>${project.description || 'No description provided'}</p>
            <a href="${project.html_url}" target="_blank">View Project</a>
        `;
        projectContainer.appendChild(card);
    });
}

// Initialize Horizontal Scroll
function initScroll(containerId) {
    const container = document.getElementById(containerId);
    let isDown = false;
    let startX, scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // The amount to scroll
        container.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    container.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchend', () => {
        isDown = false;
    });

    container.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // The amount to scroll
        container.scrollLeft = scrollLeft - walk;
    });
}
