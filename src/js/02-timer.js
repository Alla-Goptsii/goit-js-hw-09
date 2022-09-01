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
console.log(refs.input);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    // const different = selectedDates[0] - dateNow;
    // console.log('залишилось часу', different);
    // console.log(options.);
  },
};

const dateNow = Date.now();
console.log('час зараз', dateNow);
let selectedDate = null;

const startTime = flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < dateNow) {
      alert('Please choose a date in the future');
      return;
    }
    if (selectedDates[0] >= dateNow) {
      selectedDate = selectedDates[0];
      console.log('обрана дата', selectedDate.getTime());
      refs.buttonStart.addEventListener('click', onStartTime);
    }
    const diffrentTime = selectedDate.getTime() - dateNow;
    console.log('залишилося', diffrentTime);
  },
});

function onStartTime() {
  console.log('buttonClick', 'click');

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
    //   console.log({ 'days': ${days}, 'hours':${hours}, 'minutes':${minutes}, 'seconds':${seconds} });
  }

  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

  return { days, hours, minutes, seconds };
}

// addLeadingZero(value).padStart();
