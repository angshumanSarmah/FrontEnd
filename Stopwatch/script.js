let interVal;
let milliSecCounter = 0;
let secCounter = 0;
let minuteCounter = 0;
let hourCounter = 0;

let buttonStop,buttonStart, buttonReset, appendMilliSeconds, appendSeconds, appendMinutes, appendHours; 

function start() {
  interVal = setInterval(()=>{
    milliSecCounter++
    if(Number(milliSecCounter) === 100) {
      milliSecCounter = 00;
      secCounter++;
      secCounter = appendZero(secCounter);
      appendSeconds.innerText = secCounter;
    }
    if(Number(secCounter) === 60) {
      secCounter = 00;
      minuteCounter++;
      minuteCounter = appendZero(minuteCounter);
      appendMinutes.innerText = minuteCounter;
    }
    if(Number(minuteCounter) === 60) {
      minuteCounter = 0;
      hourCounter++;
      hourCounter = appendZero(hourCounter);
      minuteCounter = appendZero(minuteCounter);
      appendMinutes.innerText = minuteCounter;
      appendHours.innerText = hourCounter;
    }
    milliSecCounter = appendZero(milliSecCounter);
    appendMilliSeconds.innerText = milliSecCounter;
  }, 10)
}

function stop() {
  clearInterval(interVal);
}

function reset() {
  stop();
  milliSecCounter = 0;
  secCounter = 0;
  minuteCounter = 0;
  hourCounter = 0;
  appendHours.innerText = appendZero(hourCounter);
  appendMinutes.innerText = appendZero(minuteCounter);
  appendSeconds.innerText = appendZero(secCounter);
  appendMilliSeconds.innerText = appendZero(milliSecCounter);

}

function appendZero(value) {
  if(value<10) {
    value = '0'+value;
  }
  return value;
}

function onLoad() {
  appendMilliSeconds = document.getElementById('milli-seconds');
  appendSeconds = document.getElementById('seconds');
  appendMinutes = document.getElementById('minutes');
  appendHours = document.getElementById('hours');

  buttonStart = document.getElementById('button-start');
  buttonStop = document.getElementById('button-stop');
  buttonReset = document.getElementById('button-reset');

  buttonStart.addEventListener('click', start);
  buttonStop.addEventListener('click', stop);
  buttonReset.addEventListener('click', reset);

};

window.addEventListener('load', onLoad);