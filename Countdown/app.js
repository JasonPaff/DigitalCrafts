const countdownLabel = document.getElementById("CountDownLabel");
const numberTextBox = document.getElementById("NumberTextBox");
const startTimerButton = document.getElementById("StartTimerButton");

function StartTimer(){
    let time = numberTextBox.value;
    numberTextBox.value = "";
    countdownLabel.innerHTML = time;
    let intervalId = window.setInterval(function() {
        time--;
        countdownLabel.innerHTML = time;

        if (time == 0) window.clearInterval(intervalId);
    }, 1000);
}

startTimerButton.addEventListener("click", () => StartTimer());