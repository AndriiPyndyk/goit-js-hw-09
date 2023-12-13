import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onStartClick);

function onStartClick(evt) {
  evt.preventDefault();

  const firstDelay = parseInt(form.elements.delay.value);
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);

  createPromises(amount, firstDelay, step);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}

function createPromises(amount, firstDelay, step) {
  for (let i = 1; i <= amount; i += 1) {
    const currentDelay = firstDelay + (i - 1) * step;

    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
