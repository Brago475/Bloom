const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');
const formSteps = document.querySelectorAll('.form-step');

let currentStep = 0;

nextBtns.forEach(button => {
  button.addEventListener('click', () => {
    formSteps[currentStep].classList.remove('active');
    currentStep++;
    formSteps[currentStep].classList.add('active');
  });
});

prevBtns.forEach(button => {
  button.addEventListener('click', () => {
    formSteps[currentStep].classList.remove('active');
    currentStep--;
    formSteps[currentStep].classList.add('active');
  });
});
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');
const container = document.querySelector('.container');

registerBtn.addEventListener('click', () => {
  container.classList.add('active'); 
});

loginBtn.addEventListener('click', () => {
  container.classList.remove('active'); 
});
