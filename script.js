// ctrl + s = save file for program update
let interval;

const audio = new Audio("freesound_community-metronome-85688.mp3");

function click() {
    audio.currentTime = 0;
    audio.play();
}

function start() {
    let bpm = Number(document.getElementById('bpm').value);
    let intervalTime = 60000 / bpm;

    clearInterval(interval);
    click(); // immediate beat (removes “first delay” feeling)
    interval = setInterval(click, intervalTime);
}

function stop() {
    clearInterval(interval);
}


