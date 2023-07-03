import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
//import 'Notiflix/dist/notiflix-3.2.6.min.css';
Notiflix.Notify.init({
  width: '320px',
  clickToClose: true,
  pauseOnHover: true,
  fontSize: '14px',
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
const { enableTime, time_24hr, defaultDate, minuteIncrement, onClose } =
  options;
const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');


const flatpickrResult = flatpickr('#datetime-picker', {
  enableTime,
  time_24hr,
  defaultDate,
  minuteIncrement,
  onClose,
});
startBtn.disabled = true;

const timer = {
  intervalId: null,
  deltaTime() {
    return flatpickrResult.selectedDates[0] - Date.now();
  },
  onDateSelection() {
    if (this.deltaTime() < 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    if (this.deltaTime() > 0) {
      startBtn.disabled = false;
    }
  },
  startTimer() {
    startBtn.disabled = true;
    this.intervalId = setInterval(() => {
      const deltaTime = this.deltaTime();
      if (deltaTime <= 1000) {
        this.stopTimer();
        Notiflix.Notify.success('That time has come', {
          position: 'center-center',
          timeout: 6000,
          fontSize: '20px',
        });
      }
      const { days, hours, minutes, seconds } = convertMs(deltaTime);

      daysEl.textContent = days;
      hoursEl.textContent = hours;
      minutesEl.textContent = minutes;
      secondsEl.textContent = seconds;
    }, 1000);
  },
  stopTimer() {
    clearInterval(this.intervalId);
  },
};

inputEl.addEventListener('change', timer.onDateSelection.bind(timer));
startBtn.addEventListener('click', timer.startTimer.bind(timer));

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
