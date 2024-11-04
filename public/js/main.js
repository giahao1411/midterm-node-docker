document.addEventListener("DOMContentLoaded", function () {
    const alertBox = document.getElementById("alert-box");

    if (alertBox) {
        setTimeout(() => {
            alertBox.style.transition = "opacity 1s ease";
            alertBox.style.opacity = 0;

            setTimeout(() => (alertBox.style.display = "none"), 1000);
        }, 2000);
    }
});
