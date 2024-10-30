let lastScrollTop = 0;
const footer = document.querySelector("footer");

// Check if scrolling is possible on page load
window.addEventListener("load", function () {
    if (document.documentElement.scrollHeight <= window.innerHeight) {
        footer.style.display = "block"; // Show footer if no scroll
    }
});

// Detect scroll to show/hide footer based on direction
window.addEventListener("scroll", function () {
    const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

    if (document.documentElement.scrollHeight > window.innerHeight) {
        // Only toggle footer on scroll if the page is scrollable
        if (currentScrollTop > lastScrollTop) {
            footer.style.display = "block"; // Show footer when scrolling down
        } else {
            footer.style.display = "none"; // Hide footer when scrolling up
        }
    }

    // Update last scroll position
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Prevents negative values
});

window.addEventListener("DOMContentLoaded", function () {
    const footer = document.querySelector("footer");
    footer.style.display = "none";
});
