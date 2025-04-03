// Function to scroll to a section
function scrollToSection(id) {
    // If the clicked section is already active, do nothing
    const activeButton = document.querySelector('.nav-item.nav-link.active');
    const clickedButton = document.getElementById(`${id}Nav`);

    if (activeButton === clickedButton) {
        return; // Do nothing if the button is already active
    }

    // Get the section element
    const section = document.getElementById(id);

    // Calculate an offset for better visibility (e.g., to compensate for margins)
    const offset = 150; // Adjust this value based on your layout

    // Scroll to the section smoothly with the offset
    window.scrollTo({
        top: section.offsetTop - offset, // Apply offset to the scroll position
        behavior: 'smooth'
    });

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
            if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
                currentSection = section;
            }
        });
    }

    // Update the active button based on the section in view
    if (currentSection) {
        updateActiveButton(currentSection);
        toggleNavbarName(currentSection); // Hide/show navbar name based on section
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

function toggleNavbarName(section) {
    const navbarName = document.querySelector('.navbar-brand');

    if (section === 'home') {
        navbarName.classList.remove('animate__bounceInLeft');
        navbarName.classList.add('animate__bounceOutLeft'); // Add fadeIn animation
    } else {
        navbarName.classList.remove('animate__bounceOutLeft');
        navbarName.classList.add('animate__bounceInLeft');  // Add the bounceInLeft animation
        navbarName.style.display = 'block';  // Show name on other sections
        
    }
}

document.addEventListener("scroll", function() {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let progress = (scrollTop / scrollHeight) * 100;

    document.querySelector(".progress-bar").style.height = progress + "%";
    document.querySelector(".progress-bar").setAttribute("aria-valuenow", progress);
});
