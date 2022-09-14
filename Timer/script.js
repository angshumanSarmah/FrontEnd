const daysElem = document.getElementById('days-value');
console.log(daysElem)
const hoursElem = document.getElementById('hours-value');
const minutesElem = document.getElementById('minutes-value');
const secondsElem = document.getElementById('seconds-value');


setInterval(()=>{
    const dateFuture = new Date('01-10-2023');
    const dateNow = new Date();
    
    // const seconds = Math.floor((dateFuture - (dateNow))/1000);
    // const minutes = Math.floor(seconds/60);
    // const hours = Math.floor(minutes/60);
    // const days = Math.floor(hours/24);
    
    // const daysLeft = days;
    // const hoursLeft = hours-(days*24);
    // const minutesLeft = minutes-(days*24*60)-(hours*60);
    // const secondsLeft = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
    let seconds = Math.floor((dateFuture - (dateNow))/1000);
    let minutes = Math.floor(seconds/60);
    let hours = Math.floor(minutes/60);
    let days = Math.floor(hours/24);
    
    hours = hours-(days*24);
    minutes = minutes-(days*24*60)-(hours*60);
    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

    daysElem.innerHTML = days;
    hoursElem.innerHTML = hours;
    minutesElem.innerHTML = minutes;
    secondsElem.innerHTML = seconds;
}, 1000)