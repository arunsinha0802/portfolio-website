// Wait until the page loads
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("clickBtn");

    button.addEventListener("click", () => {
        alert("Button clicked!");
    });
});