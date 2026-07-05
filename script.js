const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let nextNoteTime = 0;
let bpm = 120;
let isRunning = false;
let clickBuffer = null;
let subdivision = 1;
let subCounter = 0;
let beat = 0;

const clickSound = document.getElementById("click-sound");

document.querySelectorAll(".sub-btn").forEach(button => {
    button.addEventListener("click", () => {
        clickSound.currentTime = 0; 
        clickSound.play();
    });
});


function playAccentClick(time) {
    const source = audioCtx.createBufferSource();
    const gain = audioCtx.createGain();
    gain.gain.value = 1.65; 

    source.buffer = clickBuffer;
    source.connect(gain).connect(audioCtx.destination);
    source.start(time);
}

async function loadClickSound() {
    const response = await fetch("freesound_community-metronome-85688.mp3");
    const arrayBuffer = await response.arrayBuffer();
    clickBuffer = await audioCtx.decodeAudioData(arrayBuffer);
}

loadClickSound(); 

function playClick(time) {
    const source = audioCtx.createBufferSource();
    source.buffer = clickBuffer;
    source.connect(audioCtx.destination);
    source.start(time);
}

function scheduler() {
    if (!isRunning) return;
    
    while (nextNoteTime < audioCtx.currentTime + 0.1) {

        if (subCounter === 0 && beat === 0) {
            playAccentClick(nextNoteTime);
        } else {
            playClick(nextNoteTime);
        }

        subCounter++;

        if (subCounter >= subdivision) {
            subCounter = 0;
            beat = (beat + 1) % 4;
        }

        nextNoteTime += (60 / bpm) / subdivision;
    }

    setTimeout(scheduler, 25);
}

function stopMetronome() {
    isRunning = false;

    nextNoteTime = 0;
    subCounter = 0;
    beat = 0;
}
function toggleMetronome() {
    const icon = document.getElementById("play-icon");
    if (isRunning) {
        stopMetronome();

        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");

        return;
    } 

    bpm = Number(bpmInput.value);
    isRunning = true;

    audioCtx.resume(); 

    nextNoteTime = audioCtx.currentTime;
    scheduler();

    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
}

function eighthNoteInterval(bpm) {
    return (60 / bpm) / 2;
}

const slider = document.getElementById("bpm-slider");
const display = document.getElementById("bpm-display");
const bpmInput = document.getElementById("bpm");

slider.oninput = function () {
    bpmInput.value = this.value;
    display.textContent = this.value;
};

bpmInput.oninput = function () {
    slider.value = this.value;
    display.textContent = this.value;
};
function changeBPM (amount) {
    let currentBPM = Number(bpmInput.value);

    currentBPM += amount;

    bpm= currentBPM
    bpmInput.value = currentBPM;
    slider.value = currentBPM;
    display.textContent = currentBPM;
}

function setSubdivision(value, element) {
    subdivision = value;

    document.querySelectorAll('.sub-btn').forEach(btn => 
        btn.classList.remove('active')
    );

    element.classList.add('active');
}
let isPlaying = false;

const toggleBtn = document.getElementById("toggle-rudiment");
const rudimentSection = document.querySelector(".rudiment-stuff");

toggleBtn.onclick = function () {
    rudimentSection.classList.toggle("hidden");
};

const dropdownBtn = document.querySelector(".dropdown-btn");
const dropdownMenu = document.querySelector(".dropdown-menu");
const selected = document.getElementById("selected-rudiment");
const items = document.querySelectorAll(".dropdown-item");

dropdownBtn.onclick = function () {
    dropdownMenu.classList.toggle("show");
}

// dropdown items
items.forEach(item => {

    item.onclick = function() {

        selected.textContent = this.textContent;

        dropdownMenu.classList.remove("show");

    };

});

const arrow = document.querySelector(".dropdown-btn i");

dropdownBtn.onclick = function () {

    dropdownMenu.classList.toggle("show");

    arrow.classList.toggle("rotate");

}
