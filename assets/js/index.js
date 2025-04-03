// Function to scroll to a section
function scrollToSection(id) {
    // Scroll to the section smoothly
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });

    // Remove 'active' class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

    // Add 'active' class to the clicked button
    document.getElementById(`${id}Nav`).classList.add('active');
}

// Function to highlight the active navbar link based on scroll position
window.addEventListener('scroll', () => {
    const sections = ['home', 'about', 'projects', 'contact'];
    let currentSection = '';

    sections.forEach(section => {
        const element = document.getElementById(section);
        const rect = element.getBoundingClientRect();

        // Check if the section is in the viewport
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
            currentSection = section;
        }
    });

    // Update the active button based on the section in view
    if (currentSection) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        document.getElementById(`${currentSection}Nav`).classList.add('active');
    }
});


window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    document.querySelector(".progress-bar").style.height = `${scrollPercent}%`;
});