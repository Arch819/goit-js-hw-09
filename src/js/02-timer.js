import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
Notiflix.Notify.init({
  width: '320px',
  clickToClose: true,
  pauseOnHover: true,
  fontSize: '14px',
});
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() < 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    if (selectedDates[0] - Date.now() > 0) {
      startBtn.disabled = false;
    }
  },
};
const { enableTime, time_24hr, defaultDate, minuteIncrement, onClose } =
  options;

const flatpickrResult = flatpickr('#datetime-picker', {
  enableTime,
  time_24hr,
  defaultDate,
  minuteIncrement,
  onClose,
});

const timer = {
  intervalId: null,
  deltaTime() {
    return flatpickrResult.selectedDates[0] - Date.now();
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
