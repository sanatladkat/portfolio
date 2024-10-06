document.addEventListener("DOMContentLoaded", () => {
    loadBlogs();
    loadProjects();
    initScroll('blog-scroll');
    initScroll('projects-scroll');
    autoScroll('blog-scroll'); // Start auto-scrolling for blogs
    autoScroll('projects-scroll'); // Start auto-scrolling for projects
});

function autoScroll(containerId) {
    const container = document.getElementById(containerId);
    const scrollAmount = 1; // Change this value for faster/slower scrolling

    setInterval(() => {
        container.scrollLeft += scrollAmount;
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
            container.scrollLeft = 0; // Reset scroll to the start
        }
    }, 20); // Adjust interval for smoothness
}


async function loadBlogs() {
    const blogContainer = document.getElementById('blog-scroll');
    
    const loadingIndicator = document.createElement('div');
    loadingIndicator.textContent = 'Loading blogs...';
    blogContainer.appendChild(loadingIndicator);
    
    try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@arsanatl');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        blogContainer.removeChild(loadingIndicator);
        
        if (!data.items || data.items.length === 0) {
            blogContainer.innerHTML = '<p>No blog posts found.</p>';
            return;
        }

        data.items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description}</p>                
            `;
            blogContainer.appendChild(card);
        });
    } catch (error) {
        if (blogContainer.contains(loadingIndicator)) {
            blogContainer.removeChild(loadingIndicator);
        }
        console.error('Error loading blogs:', error);
        blogContainer.innerHTML = '<p>Failed to load blogs. Please try again later.</p>';
    }
}

// Load GitHub Projects
async function loadProjects() {
    const projectContainer = document.getElementById('projects-scroll');
    projectContainer.innerHTML = '<div>Loading projects...</div>'; // Show loading message

    try {
        const response = await fetch('https://api.github.com/users/sanatladkat/repos');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Clear loading message
        projectContainer.innerHTML = '';

        if (!data.length) {
            projectContainer.innerHTML = '<p>No projects found.</p>';
            return;
        }

        const scrollWrapper = document.createElement('div');
        scrollWrapper.classList.add('scroll-wrapper');

        data.forEach(project => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.description || 'No description provided'}</p>
                <a href="${project.html_url}" target="_blank">View Project</a>
            `;
            projectContainer.appendChild(card);
        });
        // Duplicate the content for seamless scrolling
        scrollWrapper.appendChild(scrollWrapper.cloneNode(true));
        projectContainer.appendChild(scrollWrapper);

    } catch (error) {
        console.error('Error loading projects:', error);
        projectContainer.innerHTML = '<p>Failed to load projects. Please try again later.</p>';
    }
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
