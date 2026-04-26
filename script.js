document.addEventListener("DOMContentLoaded", () => {
    // Floating background circles
    const container = document.getElementById("bg-circles");
    for (let i = 0; i < 18; i++) {
        const circle = document.createElement("div");
        circle.classList.add("bg-circle");
        const size = Math.random() * 80 + 20;
        circle.style.width  = size + "px";
        circle.style.height = size + "px";
        circle.style.left   = Math.random() * 100 + "%";
        circle.style.animationDuration  = (Math.random() * 20 + 15) + "s";
        circle.style.animationDelay     = (Math.random() * -30) + "s";
        container.appendChild(circle);
    }

    const links = Array.from(document.querySelectorAll(".tab-link"));
    let currentIndex = 0;
    let animating = false;

    // If a ?tab= param is present, activate that tab before first paint
    const urlTab = new URLSearchParams(window.location.search).get("tab");
    if (urlTab) {
        const targetLink = links.find(l => l.dataset.tab === urlTab);
        if (targetLink) {
            document.querySelector(".tab-panel.active").classList.remove("active");
            document.querySelector(".tab-link.active").classList.remove("active");
            targetLink.classList.add("active");
            document.getElementById("tab-" + urlTab).classList.add("active");
            currentIndex = links.indexOf(targetLink);
        }
    }

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

            outPanel.classList.add(goingRight ? "swipe-out-left" : "swipe-out-right");
            inPanel.classList.add("active", goingRight ? "swipe-in-right" : "swipe-in-left");

            currentIndex = newIndex;

            outPanel.addEventListener("animationend", () => {
                outPanel.classList.remove("active", "swipe-out-left", "swipe-out-right");
                inPanel.classList.remove("swipe-in-right", "swipe-in-left");
                animating = false;
            }, { once: true });
        });
    });

    // Timeline scroll-driven line
    function updateTimelineLine() {
        const fill = document.querySelector(".timeline-line-fill");
        const timeline = document.querySelector(".timeline");
        if (!fill || !timeline) return;

        const rect = timeline.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1,
            (window.innerHeight - rect.top) / rect.height
        ));
        fill.style.height = (progress * 100) + "%";
    }

    window.addEventListener("scroll", updateTimelineLine);
    updateTimelineLine();

    // Intersection Observer for timeline cards sliding in and out
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible");
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".timeline-card").forEach(card => {
        timelineObserver.observe(card);
    });
});
