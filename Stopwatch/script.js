let interVal;
let secCounter = 0;
let minuteCounter = 0;
let hourCounter = 0;

let buttonStop,buttonStart, buttonReset, appendSeconds, appendMinutes, appendHours; 

function start() {
  interVal = setInterval(()=>{
    secCounter++;
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
    secCounter = appendZero(secCounter);
    appendSeconds.innerText = secCounter;
  }, 1000)
}

function stop() {
  clearInterval(interVal);
}

function reset() {
  stop();
  secCounter = 0;
  minuteCounter = 0;
  hourCounter = 0;
  appendHours.innerText = appendZero(hourCounter);
  appendMinutes.innerText = appendZero(minuteCounter);
  appendSeconds.innerText = appendZero(secCounter);

}

function appendZero(value) {
  if(value<10) {
    value = '0'+value;
  }
  return value;
}

function onLoad() {
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