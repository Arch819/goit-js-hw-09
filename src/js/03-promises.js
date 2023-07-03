import Notiflix from 'notiflix';
import 'Notiflix/dist/notiflix-3.2.6.min.css';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;
  // if (!delay.value || !step.value || !amount.value) {
  //   return Notiflix.Notify.info('Fill in all fields');
  // }
  
  let delayInput = Number(delay.value);

  let amountValue = 0;
  let position = 0;

  const intervalId = setInterval(() => {
    if (amountValue === Number(amount.value)) {
      clearInterval(intervalId);
      return;
    }
    amountValue += 1;
    position += 1;
    createPromise(position, delayInput)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayInput += Number(step.value);
  }, 0);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}
