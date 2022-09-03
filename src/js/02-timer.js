import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  seconds: document.querySelector('[data-seconds]'),
  minutes: document.querySelector('[data-minutes]'),
};

let selectedDate = null;
refs.buttonStart.disabled = true;
// refs.buttonStart = 'disabled';

const startTime = flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    if (selectedDates[0].getTime() > Date.now()) {
      selectedDate = selectedDates[0];

      refs.buttonStart.disabled = false;
      refs.buttonStart.addEventListener('click', onStartTime);
    }
  },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function onStartTime() {
  refs.buttonStart.disabled = true;

  setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedDate.getTime() - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    // const { time } = convertMs(deltaTime);

    console.log(`${days}::${hours}::${minutes}::${seconds}`);

    // updateClockFase(days, hours, minutes, seconds);
    // updateClockFase();
  }, 1000);
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockFase({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}
