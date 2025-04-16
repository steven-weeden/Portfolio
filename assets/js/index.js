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

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".home-text");
    let index = 0;

    function typeNext() {
        if (index >= elements.length) return;

        const el = elements[index];
        const parent = el.closest(".col");

        if (parent) {
            parent.style.display = "block";
        } else {
            el.style.display = "block";
        }

        const fullHTML = el.innerHTML.trim();
        const temp = document.createElement("div");
        temp.innerHTML = fullHTML;

        const output = [];
        function flatten(node) {
            for (let child of node.childNodes) {
                if (child.nodeType === Node.TEXT_NODE) {
                    const text = child.textContent;
                    for (let char of text) {
                        output.push({ type: "text", content: char });
                    }
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    const span = document.createElement(child.tagName);
                    for (let attr of child.attributes) {
                        span.setAttribute(attr.name, attr.value);
                    }
                    const nested = [];
                    flatten(child); // Recursive fill into `output`
                    output.push({ type: "element", element: span, children: nested });
                }
            }
        }

        // Updated flatten that returns children array to preserve structure
        function flatten(node, container = output) {
            for (let child of node.childNodes) {
                if (child.nodeType === Node.TEXT_NODE) {
                    const text = child.textContent;
                    for (let char of text) {
                        container.push({ type: "text", content: char });
                    }
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    const span = document.createElement(child.tagName);
                    for (let attr of child.attributes) {
                        span.setAttribute(attr.name, attr.value);
                    }
                    const nested = [];
                    flatten(child, nested); // recurse into children
                    container.push({ type: "element", element: span, children: nested });
                }
            }
        }

        flatten(temp);

        el.innerHTML = ""; // Clear the element

        function typeRecursive(container, targetEl) {
            let i = 0;

            function step() {
                if (i >= container.length) {
                    el.classList.add("finished");
                    index++;
                    setTimeout(typeNext, 200);
                    return;
                }

                const node = container[i];

                if (node.type === "text") {
                    targetEl.append(node.content);
                    i++;
                    setTimeout(step, 80);
                } else if (node.type === "element") {
                    const clone = node.element.cloneNode(false);
                    targetEl.appendChild(clone);
                    let childIndex = 0;

                    function typeChild() {
                        if (childIndex >= node.children.length) {
                            i++;
                            setTimeout(step, 0);
                            return;
                        }

                        const child = node.children[childIndex];

                        if (child.type === "text") {
                            clone.append(child.content);
                            childIndex++;
                            setTimeout(typeChild, 80);
                        } else if (child.type === "element") {
                            const childClone = child.element.cloneNode(false);
                            clone.appendChild(childClone);
                            typeRecursive([child], childClone);
                            childIndex++;
                        }
                    }

                    typeChild();
                }
            }

            step();
        }

        typeRecursive(output, el);
    }

    typeNext();
});



