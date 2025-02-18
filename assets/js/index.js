// Function to scroll to a section
function scrollToSection(id) {
    // If the clicked section is already active, do nothing
    const activeButton = document.querySelector('.nav-item.nav-link.active');
    const clickedButton = document.getElementById(`${id}Nav`);

    if (activeButton === clickedButton) {
        return; // Do nothing if the button is already active
    }

    // Scroll to the section smoothly
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });

    // Update the active button
    updateActiveButton(id);
}

// Function to highlight the active navbar link based on scroll position
window.addEventListener('scroll', () => {
    const sections = ['home', 'about', 'projects', 'contact'];
    let currentSection = '';

    // Check if the page is at the very top (or slightly off top) to highlight the home button
    if (window.scrollY === 0) {
        currentSection = 'home';  // Home section is active when at the top
    } else {
        // Check which section is in the viewport
        sections.forEach(section => {
            const element = document.getElementById(section);
            const rect = element.getBoundingClientRect();

            // If the section is in the viewport
            if (rect.top <= 0 && rect.bottom >= 0) {
                currentSection = section;
            }
        });
    }

    // Update the active button based on the section in view
    if (currentSection) {
        updateActiveButton(currentSection);
    }
});

// Function to update the active class for the navbar buttons
function updateActiveButton(id) {
    // Remove 'active' class from all buttons
    const sections = ['home', 'about', 'projects', 'contact'];
    sections.forEach(section => {
        const navItem = document.getElementById(`${section}Nav`);
        navItem.classList.remove('active');
    });

    // Add 'active' class to the current section's navbar button
    const activeButton = document.getElementById(`${id}Nav`);
    activeButton.classList.add('active');
}

// Initialize the active class on page load (set to Home initially)
window.addEventListener('load', () => {
    document.getElementById('homeNav').classList.add('active');
});
