import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('[data-start]');
const inputDate = document.querySelector('#datetime-picker');

// ------------------------------------------------

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      Notify.failure('Будь ласка виберіть дату в майбутньому');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr('input#datetime-picker', options);

// ----------------------------------------------

startBtn.addEventListener('click', onStartClick);

function onStartClick() {
  const selectedDate = flatpickr.parseDate(inputDate.value);

  if (selectedDate) {
    startTimer(selectedDate);
  } else {
    Notify.failure('Вибрана недійcна дата');
  }
}

// ----------------------------------------------

function startTimer(endDate) {
  const intervalId = setInterval(() => {
    const currentTime = new Date();
    const deltaTime = endDate - currentTime;

    if (deltaTime <= 0) {
      clearInterval(intervalId);
      Notify.success('Зворотній відлік завершено');
      startBtn.disabled = true;
    } else {
      updateTimerDisplay(deltaTime);
    }
  }, 1000);
}

function updateTimerDisplay(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  daysRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minutesRef.textContent = addLeadingZero(minutes);
  secondsRef.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}

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
}
