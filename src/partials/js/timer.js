import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  btnStart: document.querySelector('button'),
  spanDays: document.querySelector('[data-days]'),
  spanHours: document.querySelector('[data-hours]'),
  spanMinutes: document.querySelector('[data-minutes]'),
  spanSeconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  intervalId: null,

  onClose(selectedDates) {
    if (selectedDates[0].getTime() - Date.now() < 0) {
      Notiflix.Notify.warning('Please choose a date in the future');
      refs.btnStart.disabled = true;
    } else {
      refs.btnStart.disabled = false;
      refs.btnStart.addEventListener('click', () => {
        this.intervalId = setInterval(() => {
          const { days, hours, minutes, seconds } = convertMs(
            selectedDates[0].getTime() - Date.now()
          );

          refs.spanDays.textContent = addLeadingZero(days);
          refs.spanHours.textContent = addLeadingZero(hours);
          refs.spanMinutes.textContent = addLeadingZero(minutes);
          refs.spanSeconds.textContent = addLeadingZero(seconds);
          if (selectedDates[0].getTime() - Date.now() < 1000) {
            Notiflix.Notify.success('Time is out');
            refs.btnStart.disabled = true;
            clearInterval(this.intervalId);
          }
        }, 1000);
      });
    }
    console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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
