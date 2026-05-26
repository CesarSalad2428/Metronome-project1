// ctrl + s = save file for program update
let nextTick = 0; 
let interval = 0; // ms between clicks
const audio = new Audio("freesound_community-metronome-85688.mp3");

function click() { 
    audio.currentTime = 0;
    audio.play();
}

function scheduler() {
   const now = performance.now();

    if (now >= nextTick) {
        click()
        nextTick += interval;
    }
    requestAnimationFrame(scheduler);
}
function start() {
    const bpm = Number(bpmInput.value);
    nextTick = performance.now();
    interval = 60000 / bpm
    scheduler();
}
function stop() {
    nextTick = Infinity
}
const slider = document.getElementById("bpm-slider");
const display = document.getElementById("bpm-display");
const bpmInput = document.getElementById("bpm")

slider.oninput = function () {
    bpmInput.value = this.value
    display.textContent = this.value;
}
bpmInput. oninput = function () {
    slider.value = this.value;
    display.textContent = this.value;
}
