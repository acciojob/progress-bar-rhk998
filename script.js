// Get all circle elements and line elements
const circles = document.querySelectorAll(".circle"); // Use querySelectorAll for classes
const lines = document.querySelectorAll(".line");     // Use querySelectorAll for classes

const nextButton = document.getElementById("next"); // Use getElementById for IDs
const prevButton = document.getElementById("prev"); // Use getElementById for IDs

let currentActive = 1; // Renamed 'val' to 'currentActive' for clarity, starts at 1

// Add event listeners
nextButton.addEventListener("click", () => {
    currentActive++; // Increment the active step
    if (currentActive > circles.length) { // Prevent exceeding the number of circles
        currentActive = circles.length;
    }
    updateUI(); // Update the UI
});

prevButton.addEventListener("click", () => {
    currentActive--; // Decrement the active step
    if (currentActive < 1) { // Prevent going below 1
        currentActive = 1;
    }
    updateUI(); // Update the UI
});

function updateUI() {
    // Update circles' active state
    circles.forEach((circle, idx) => {
        if (idx < currentActive) { // If the index is less than the current active step, make it active
            circle.classList.add("active");
        } else {
            circle.classList.remove("active"); // Otherwise, remove active
        }
    });

    // Update lines' active state
    // A line should be active if the circle *after* it is active.
    // Or, more simply, if the current active step is greater than the line's index.
    lines.forEach((line, idx) => {
        if (idx < currentActive - 1) { // Line connects circle idx to idx+1. So line idx is active if circle idx+1 (which is at currentActive) is active.
            line.classList.add("active");
        } else {
            line.classList.remove("active");
        }
    });

    // Update button states (enabled/disabled)
    if (currentActive === 1) {
        prevButton.disabled = true; // Disable Prev button at the first step
    } else if (currentActive === circles.length) {
        nextButton.disabled = true; // Disable Next button at the last step
    } else {
        prevButton.disabled = false; // Enable both buttons in between
        nextButton.disabled = false;
    }
}

// Initial call to set the UI state when the page loads
updateUI();