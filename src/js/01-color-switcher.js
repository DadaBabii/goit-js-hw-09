const btnStart = document.querySelector('button[data-start]');
console.log(btnStart);
const btnStop = document.querySelector('button[data-stop]');
const bcgColor = document.querySelector('body');

let timeOutId = null;
let isActive = false;

btnStart.addEventListener('click', onClickStart);
btnStop.addEventListener('click', onClickStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onClickStart(evt) {
    if (isActive) {
        return;
    }
  timeOutId = setInterval(()=>{
         isActive = true;     
    bcgColor.style.backgroundColor = getRandomHexColor();

},1000)
};

function onClickStop(evt) {
    // bcgColor.style.backgroundColor = '#fafafa';
    clearInterval(timeOutId);
    isActive = false;
}; 



