document.addEventListener("DOMContentLoaded", () => {
    const links = Array.from(document.querySelectorAll(".tab-link"));
    let currentIndex = 0;
    let animating = false;

    // Fade up the initial panel once on load
    const initialPanel = document.querySelector(".tab-panel.active");
    initialPanel.classList.add("fade-up");
    initialPanel.addEventListener("animationend", () => {
        initialPanel.classList.remove("fade-up");
    }, { once: true });

    links.forEach((link, newIndex) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            if (newIndex === currentIndex || animating) return;

            animating = true;
            const goingRight = newIndex > currentIndex;
            const outPanel = document.getElementById("tab-" + links[currentIndex].dataset.tab);
            const inPanel  = document.getElementById("tab-" + link.dataset.tab);

            links.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            // Slide out the current panel
            outPanel.classList.add(goingRight ? "swipe-out-left" : "swipe-out-right");

            // Slide in the new panel
            inPanel.classList.add("active", goingRight ? "swipe-in-right" : "swipe-in-left");

            currentIndex = newIndex;

            outPanel.addEventListener("animationend", () => {
                outPanel.classList.remove("active", "swipe-out-left", "swipe-out-right");
                inPanel.classList.remove("swipe-in-right", "swipe-in-left");
                animating = false;
            }, { once: true });
        });
    });
});
