// document.addEventListener('DOMContentLoaded', function () {
//     const blogContainer = document.querySelector('.blog-container');
//     const projectContainer = document.querySelector('.project-container');

//     // Function to fetch and display blogs
//     function loadBlogs() {
//         fetch('data/blogs.json')
//             .then(response => {
//                 if (!response.ok) throw new Error('Network response was not ok');
//                 return response.json();
//             })
//             .then(data => {
//                 data.forEach(blog => {
//                     const blogDiv = document.createElement('div');
//                     blogDiv.innerHTML = `
//                         <img src="${blog.thumbnail}" alt="${blog.title}" class="thumbnail">
//                         <h4>${blog.title}</h4>
//                         <p>${blog.description}</p>
//                         <a href="${blog.link}" target="_blank">Read More</a>
//                     `;
//                     blogContainer.appendChild(blogDiv);
//                 });
//             })
//             .catch(error => console.error('Error fetching blogs:', error));
//     }

//     // Function to fetch and display projects
//     function loadProjects() {
//         fetch('data/projects.json')
//             .then(response => {
//                 if (!response.ok) throw new Error('Network response was not ok');
//                 return response.json();
//             })
//             .then(data => {
//                 data.forEach(project => {
//                     const projectDiv = document.createElement('div');
//                     projectDiv.innerHTML = `
//                         <img src="${project.thumbnail}" alt="${project.title}" class="thumbnail">
//                         <h4>${project.title}</h4>
//                         <p>${project.description}</p>
//                         <a href="${project.link}" target="_blank">View Project</a>
//                     `;
//                     projectContainer.appendChild(projectDiv);
//                 });
//             })
//             .catch(error => console.error('Error fetching projects:', error));
//     }

//     // Load blogs and projects
//     loadBlogs();
//     loadProjects();

//     // Infinite horizontal scrolling functionality
//     const scrollSpeed = 1; // Adjust this value for faster/slower scrolling
//     let blogScrollInterval;
//     let projectScrollInterval;

//     function startScrolling(container) {
//         const scrollInterval = setInterval(() => {
//             container.scrollLeft += scrollSpeed;
//             if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
//                 container.scrollLeft = 0; // Reset to the start to create an infinite effect
//             }
//         }, 20);

//         return scrollInterval;
//     }

//     blogScrollInterval = startScrolling(blogContainer);
//     projectScrollInterval = startScrolling(projectContainer);

//     // Stop scrolling on mouse over
//     blogContainer.addEventListener('mouseover', () => clearInterval(blogScrollInterval));
//     projectContainer.addEventListener('mouseover', () => clearInterval(projectScrollInterval));

//     // Restart scrolling when mouse leaves
//     blogContainer.addEventListener('mouseleave', () => {
//         blogScrollInterval = startScrolling(blogContainer);
//     });
//     projectContainer.addEventListener('mouseleave', () => {
//         projectScrollInterval = startScrolling(projectContainer);
//     });
// });

// document.addEventListener('DOMContentLoaded', function () {
//     const blogContainer = document.querySelector('.blog-container');
//     const projectContainer = document.querySelector('.project-container');

//     // Function to fetch and display blogs
//     function loadBlogs() {
//         fetch('data/blogs.json')
//             .then(response => {
//                 if (!response.ok) throw new Error('Network response was not ok');
//                 return response.json();
//             })
//             .then(data => {
//                 data.forEach(blog => {
//                     const blogDiv = document.createElement('div');
//                     blogDiv.innerHTML = `
//                         <img src="${blog.thumbnail}" alt="${blog.title}" class="thumbnail">
//                         <h4>${blog.title}</h4>
//                         <p>${blog.description}</p>
//                         <a href="${blog.link}" target="_blank">Read More</a>
//                     `;
//                     blogContainer.appendChild(blogDiv);
//                 });
//             })
//             .catch(error => console.error('Error fetching blogs:', error));
//     }

//     // Function to fetch and display projects
//     function loadProjects() {
//         fetch('data/projects.json')
//             .then(response => {
//                 if (!response.ok) throw new Error('Network response was not ok');
//                 return response.json();
//             })
//             .then(data => {
//                 data.forEach(project => {
//                     const projectDiv = document.createElement('div');
//                     projectDiv.innerHTML = `
//                         <img src="${project.thumbnail}" alt="${project.title}" class="thumbnail">
//                         <h4>${project.title}</h4>
//                         <p>${project.description}</p>
//                         <a href="${project.link}" target="_blank">View Project</a>
//                     `;
//                     projectContainer.appendChild(projectDiv);
//                 });
//             })
//             .catch(error => console.error('Error fetching projects:', error));
//     }

//     // Load blogs and projects
//     loadBlogs();
//     loadProjects();

//     // Infinite horizontal scrolling functionality
//     const scrollSpeed = 1; // Adjust this value for faster/slower scrolling
//     let blogScrollInterval;
//     let projectScrollInterval;

//     function startScrolling(container) {
//         return setInterval(() => {
//             container.scrollLeft += scrollSpeed;

//             // Restart the scroll if it reaches the end
//             if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
//                 container.scrollLeft = 0; // Reset to the start
//             }
//         }, 20);
//     }

//     blogScrollInterval = startScrolling(blogContainer);
//     projectScrollInterval = startScrolling(projectContainer);

//     // Stop scrolling on mouse over
//     blogContainer.addEventListener('mouseover', () => {
//         clearInterval(blogScrollInterval);
//     });

//     projectContainer.addEventListener('mouseover', () => {
//         clearInterval(projectScrollInterval);
//     });

//     // Restart scrolling when mouse leaves
//     blogContainer.addEventListener('mouseleave', () => {
//         blogScrollInterval = startScrolling(blogContainer);
//     });

//     projectContainer.addEventListener('mouseleave', () => {
//         projectScrollInterval = startScrolling(projectContainer);
//     });
// });

document.addEventListener('DOMContentLoaded', function () {
    const blogContainer = document.querySelector('.blog-container');
    const projectContainer = document.querySelector('.project-container');

    // Function to fetch and display blogs from Medium RSS feed
    function loadBlogs() {
        const feedUrl = 'https://medium.com/feed/@arsanatl';
        
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`)
            .then(response => response.json())
            .then(data => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(data.contents, 'text/xml');
                const items = xml.querySelectorAll('item');

                items.forEach(item => {
                    const title = item.querySelector('title').textContent;
                    const description = item.querySelector('description').textContent;
                    const link = item.querySelector('link').textContent;
                    const thumbnail = item.querySelector('media\\:thumbnail') ? item.querySelector('media\\:thumbnail').getAttribute('url') : '';

                    const blogDiv = document.createElement('div');
                    blogDiv.innerHTML = `
                        <img src="${thumbnail}" alt="${title}" class="thumbnail">
                        <h4>${title}</h4>
                        <p>${description}</p>
                        <a href="${link}" target="_blank">Read More</a>
                    `;
                    blogContainer.appendChild(blogDiv);
                });
                
                // Duplicate the blogs for infinite scrolling
                const clone = blogContainer.cloneNode(true);
                blogContainer.appendChild(clone);
            })
            .catch(err => console.error('Error fetching Medium feed:', err));
    }

    // Function to fetch and display projects (remains the same)
    function loadProjects() {
        fetch('data/projects.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(project => {
                    const projectDiv = document.createElement('div');
                    projectDiv.innerHTML = `
                        <img src="${project.thumbnail}" alt="${project.title}" class="thumbnail">
                        <h4>${project.title}</h4>
                        <p>${project.description}</p>
                        <a href="${project.link}" target="_blank">View Project</a>
                    `;
                    projectContainer.appendChild(projectDiv);
                });
                // Duplicate the projects for infinite scrolling
                const clone = projectContainer.cloneNode(true);
                projectContainer.appendChild(clone);
            });
    }

    // Load blogs and projects
    loadBlogs();
    loadProjects();

    // Infinite horizontal scrolling functionality (remains the same)
    const scrollSpeed = 1; // Adjust this value for faster/slower scrolling
    let scrollInterval;

    function startScrolling(container) {
        scrollInterval = setInterval(() => {
            container.scrollLeft += scrollSpeed;
            if (container.scrollLeft >= container.scrollWidth / 2) {
                container.scrollLeft = 0; // Reset to the start to create an infinite effect
            }
        }, 20);
    }

    startScrolling(blogContainer);
    startScrolling(projectContainer);

    // Stop scrolling on mouse over (remains the same)
    blogContainer.addEventListener('mouseover', () => clearInterval(scrollInterval));
    projectContainer.addEventListener('mouseover', () => clearInterval(scrollInterval));

    // Restart scrolling when mouse leaves (remains the same)
    blogContainer.addEventListener('mouseleave', () => startScrolling(blogContainer));
    projectContainer.addEventListener('mouseleave', () => startScrolling(projectContainer));
});
