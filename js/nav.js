const container = document.querySelector(".container");
const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");

registerBtn.addEventListener("click", () => container.classList.add("active"));
loginBtn.addEventListener("click", () => container.classList.remove("active"));

const formSteps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const stepTracker = document.getElementById("step-tracker");
const formErrorBanner = document.getElementById("form-error-banner");
let currentStep = 0;

const multiStepForm = document.getElementById("multiStepForm");

const fields = {
  Fname: {
    el: multiStepForm.Fname,
    pattern: /^.{2,}$/,
    error: "First name must be at least 2 characters.",
  },
  Lname: {
    el: multiStepForm.Lname,
    pattern: /^.{3,}$/,
    error: "Last name must be at least 3 characters.",
  },
  DOB: {
    el: multiStepForm.DOB,
    custom: (value) => {
      const dob = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      return age > 16 || (age === 16 && m >= 0);
    },
    error: "You must be at least 16 years old.",
  },
  username: {
    el: multiStepForm.username,
    pattern: /^[\w!@#$%^&*]{3,}$/,
    error: "Username must be at least 3 characters.",
  },
  email: {
    el: multiStepForm.email,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    error: "Invalid email format.",
  },
  phone_number: {
    el: multiStepForm.phone_number,
    pattern: /^\d{10,15}$/,
    optional: true,
    error: "Phone number must be 10–15 digits.",
  },
  security_question: {
    el: multiStepForm.security_question,
    pattern: /^(1001|1002|1003|1004)$/,
    error: "Please select a security question.",
  },
  security_answer: {
    el: multiStepForm.security_answer,
    pattern: /^[A-Za-z]{4,}$/,
    error: "Answer must be at least 4 characters and contain only letters.",
  },
  password: {
    el: multiStepForm.password,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/,
    error:
      "Password must be at least 10 characters with uppercase,lowercase, number, and special character.",
  },
  confirm_password: {
    el: multiStepForm.confirm_password,
    error: "Passwords do not match.",
  },
};

updateStepTracker();

function updateStepTracker() {
  stepTracker.textContent = `Step ${currentStep + 1} of ${formSteps.length}`;
}

function validateField(key) {
  const field = fields[key];
  const input = field.el;
  const val = input.value.trim();
  const box = input.closest(".input-box");
  const popup = box.querySelector(".error-popup");
  const icon = box.querySelector(".valid-icon");

  if (popup) popup.textContent = "";
  box.classList.remove("valid", "invalid");
  if (icon) icon.style.display = "none";

  if (field.optional && val === "") return true;

  if (key === "confirm_password") {
    if (val !== fields.password.el.value.trim()) {
      if (popup) popup.textContent = field.error;
      box.classList.add("invalid");
      return false;
    }
  } else if (field.custom && !field.custom(val)) {
    if (popup) popup.textContent = field.error;
    box.classList.add("invalid");
    return false;
  } else if (field.pattern && !field.pattern.test(val)) {
    if (popup) popup.textContent = field.error;
    box.classList.add("invalid");
    return false;
  }

  box.classList.add("valid");
  if (icon) icon.style.display = "inline";
  return true;
}

for (const key in fields) {
  const input = fields[key].el;
  input.addEventListener("input", () => validateField(key));
  if (key === "password") {
    input.addEventListener("input", () => validateField("confirm_password"));
  }
}

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const step = formSteps[currentStep];
    const stepInputs = step.querySelectorAll("[name]");
    let stepValid = true;

    stepInputs.forEach((input) => {
      const key = input.name;
      const isValid = validateField(key);
      if (!isValid) stepValid = false;
    });

    if (stepValid) {
      formSteps[currentStep].classList.remove("active");
      currentStep++;
      formSteps[currentStep].classList.add("active");
      updateStepTracker();
      formErrorBanner.classList.add("hidden");
    } else {
      formErrorBanner.classList.remove("hidden");
    }
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formSteps[currentStep].classList.remove("active");
    currentStep--;
    formSteps[currentStep].classList.add("active");
    updateStepTracker();
    formErrorBanner.classList.add("hidden");
  });
});

multiStepForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let allValid = true;

  for (const key in fields) {
    const isValid = validateField(key);
    if (!isValid) allValid = false;
  }

  if (allValid) {
    formErrorBanner.classList.add("hidden");
    this.submit();
  } else {
    formErrorBanner.classList.remove("hidden");
  }
});
document.querySelectorAll(".toggle-password").forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = btn.parentElement.querySelector("input");
    if (input.type === "password") {
      input.type = "text";
      btn.textContent = "Hide";
    } else {
      input.type = "password";
      btn.textContent = "Show";
    }
  });
});
