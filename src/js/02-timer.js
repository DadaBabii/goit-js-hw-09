// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// дисплей календарю
const myInput = document.querySelector('input#datetime-picker');
console.log(myInput);
// дисплей відліку
const timerFace = document.querySelector('.timer');
console.log(timerFace);
timerFace.style.display = 'flex';
const fieldFace = document.querySelectorAll('.field');
// console.dir(fieldFace);
// Знаходимо кнопку Start
const buttonStart = document.querySelector('button[data-start]');
console.log(buttonStart);
let timerTime = null;
let targetTime = null;
let timerId = null;


//  ----знаходиимо значення годинника
const dataDays = document.querySelector('.value[data-days]');
console.log(dataDays);
const dataHours = document.querySelector('.value[data-hours]');
const dataMinutes = document.querySelector('.value[data-minutes]');
const dataSeconds = document.querySelector('.value[data-seconds]');



// Додаємо стилі на лічільник
for (const el of fieldFace) {
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.marginRight = '10px';
};


// обєкт з опціями для Pickera
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
    //Метод onClose() з об'єкта параметрів викликається щоразу під час 
    // закриття елемента інтерфейсу, який створює flatpickr.Саме у ньому варто обробляти дату, 
    // обрану користувачем. 
    // Параметр selectedDates - це масив обраних дат, тому ми беремо перший елемент.
  onClose(selectedDates) {
      targetTime = selectedDates[0].getTime();
      console.log(selectedDates[0].getTime());
      // Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future".
      if (selectedDates[0].getTime() <= new Date().getTime()) {
       
       return window.alert("Please choose a date in the future");
      };

      // Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
    // Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому.
      if (selectedDates[0].getTime() > new Date().getTime()) {
        /// кнопка Start
        buttonStart.addEventListener('click', onClickBtn);
       
      }
    },
     
};

// Бібліотека очікує, що її ініціалізують на елементі input[type="text"],
//  тому ми додали до HTML документу поле input#datetime - picker.
const fp = flatpickr(myInput, { ...options });

// Для підрахунку значень використовуй 
// готову функцію convertMs, де 
// ms - різниця між кінцевою і поточною датою в мілісекундах

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};



// Натисканням на кнопку «Start» починається відлік часу до обраної дати з моменту натискання.
function onClickBtn(event) {

  timerId = setInterval(() => {
    const currentTime = new Date();
    console.log(currentTime);
    
    const timerTime = targetTime - currentTime; 
    console.log(timerTime)

    if (timerTime < 1000) {
      clearInterval(timerId)
    };

   
    // Присвоюємо значення залишку часу
    const { days, hours, minutes, seconds } = convertMs(timerTime);


   
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);

   

  }, 1000);
    
    console.log('ms');
};


// Приводимо до строки та додаємо 0 першою цифрою
function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
};