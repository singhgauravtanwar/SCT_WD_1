
let startTime = 0;
let elapsedTime = 0;
let timer = null;
let running = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(2, "0")
    );
}

function updateDisplay() {
    let currentTime = elapsedTime;

    if (running) {
        currentTime += performance.now() - startTime;
    }

    display.textContent = formatTime(currentTime);
}

// Start Button
document.getElementById("start").addEventListener("click", function () {
    if (!running) {
        startTime = performance.now();
        running = true;

        timer = setInterval(updateDisplay, 10);
    }
});

// Pause Button
document.getElementById("pause").addEventListener("click", function () {
    if (running) {
        elapsedTime += performance.now() - startTime;
        running = false;

        clearInterval(timer);
        updateDisplay();
    }
});

// Reset Button
document.getElementById("reset").addEventListener("click", function () {
    clearInterval(timer);

    running = false;
    startTime = 0;
    elapsedTime = 0;

    display.textContent = "00:00:00.00";
    laps.innerHTML = "";
});

// Lap Button
document.getElementById("lap").addEventListener("click", function () {
    if (running) {
        let currentTime = elapsedTime + (performance.now() - startTime);

        let lapItem = document.createElement("li");

        lapItem.textContent =
            "Lap " + (laps.children.length + 1) +
            " - " + formatTime(currentTime);

        laps.appendChild(lapItem);
    }
});
