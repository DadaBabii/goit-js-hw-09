const form = document.querySelector('.form');
console.log(form);
// const firstDelay = document.querySelector('input[name="delay"]');
// console.dir(firstDelay.value);
// const delayStep = document.querySelector('input[name="step"]');
// console.log(delayStep);
// const amount = document.querySelector('input[name="amount"]');
// console.log(amount);
const btn = document.querySelector('button');
console.log(btn);



form.addEventListener('submit', onclick);

function onclick(event) {
  event.preventDefault();
  const firstDelay = Number(form.delay.value);
  const delayStep = Number(form.step.value);
  const amount = Number(form.amount.value);

  for (let i = 0; i < amount; i += 1) {
    let position = i + 1;
    let delay = firstDelay + delayStep * i;


    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

  }
  event.currentTarget.reset();

}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  });
}
