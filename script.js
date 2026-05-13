// ctrl + s = save file for program update
let interval;

const audio = new Audio("freesound_community-metronome-85688.mp3");

function click() {
    audio.currentTime = 0;
    audio.play();
}

function start() {
    let bpm = Number(bpmInput.value);
    let intervalTime = 60000 / bpm;

    clearInterval(interval);
    click(); 
    interval = setInterval(click, intervalTime);
}

function stop() {
    clearInterval(interval);
}
const slider = document.getElementById("bpm-slider");
const display = document.getElementById("bpm-display");
const bpmInput = document.getElementById("bpm")

slider.oninput = function () {
    bpmInput.value = this.value
    display.textContent = this.value;
};
bpmInput. oninput = function () {
    slider.value = this.value;
    display.textContent = this.value;
}


