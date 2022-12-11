const settingButton = document.querySelector('.settings').firstElementChild;
const startButton = document.querySelector('.start');
const minutesContainer = document.querySelector('.minutes')
const secondsContainer = document.querySelector('.seconds')
const timerRing = document.querySelector('.ring')

const minutesInput = minutesContainer.firstElementChild
const secondsInput = secondsContainer.firstElementChild
let isActivated = false
let timeUp = false


// reset timer
const configTimer = () => {
    minutesInput.removeAttribute('disabled')
    secondsInput.removeAttribute('disabled')
}

const updateTimer = (minutes, seconds) => {
    minutesInput.setAttribute('value', minutes); // set minutes value to input
    secondsInput.setAttribute('value', seconds); // set seconds value to input
    minutesInput.value = minutesInput.getAttribute('value') // set minutes value to input  | update UI
    secondsInput.value = secondsInput.getAttribute('value') // set seconds value to input  | update UI

}

function timer(minutes, seconds) {
    let timer = setInterval(function () {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }
        if (minutes < 0) {
            clearInterval(timer);
            timeUp = true
        }
        if (isActivated === false) {
            clearInterval(timer)
        }else{
            timerRing.firstElementChild.removeAttribute("class")
        }
        updateTimer(minutes, seconds)

        if (timeUp === true) {
            timerRing.firstElementChild.setAttribute('class', 'ending') //
            timeUp = false
            alert('Time is up!');
            updateTimer('15', '00')
            startButton.textContent = "start"

        }


    }, 1000);

}

// start timer
const startTimer = () => {
    const startButtonContent = startButton.textContent
    if (startButtonContent === "start") {

        minutesInput.setAttribute('disabled', 'true')
        secondsInput.setAttribute('disabled', 'true')
        startButton.textContent = "stop"
        isActivated = true
        timer(minutesInput.value, secondsInput.value)
    } else if (startButtonContent === "stop") {
        isActivated = false
        startButton.textContent = "start"
        configTimer()
    }

}

settingButton.addEventListener('click', configTimer) // open settings
startButton.addEventListener('click', startTimer) // start timer

