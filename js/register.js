// ============================================================
// PAWFEE CAFÉ - register.js
// Handles: multi-step form, validation, login simulation
// ============================================================

// ---- STEP 1: grab all elements we need ----
const stepEl = {
  s1:       document.getElementById('step-1'),
  s2signup: document.getElementById('step-2-signup'),
  s2login:  document.getElementById('step-2-login'),
  s3signup: document.getElementById('step-3-signup'),
  s3login:  document.getElementById('step-3-login')
};

const progEl = {
  p1: document.getElementById('prog-1'),
  p2: document.getElementById('prog-2'),
  p3: document.getElementById('prog-3'),
  line1: document.querySelectorAll('.progress-line')[0],
  line2: document.querySelectorAll('.progress-line')[1]
};

// ---- STEP 2: helper functions ----

// showStep: hides all steps, then shows only the one you want
function showStep(stepToShow) {
  Object.values(stepEl).forEach(function(step) {
    step.classList.remove('active');
  });
  stepToShow.classList.add('active');
}

// updateProgress: updates which dots are active or done
function updateProgress(stepNumber) {
  // reset all first
  [progEl.p1, progEl.p2, progEl.p3].forEach(function(dot) {
    dot.classList.remove('active', 'done');
  });
  [progEl.line1, progEl.line2].forEach(function(line) {
    line.classList.remove('done');
  });

  // apply correct state based on step number
  if (stepNumber === 1) {
    progEl.p1.classList.add('active');
  }
  if (stepNumber === 2) {
    progEl.p1.classList.add('done');
    progEl.line1.classList.add('done');
    progEl.p2.classList.add('active');
  }
  if (stepNumber === 3) {
    progEl.p1.classList.add('done');
    progEl.p2.classList.add('done');
    progEl.line1.classList.add('done');
    progEl.line2.classList.add('done');
    progEl.p3.classList.add('active');
  }
}

// showError: puts a message under a field and marks it red
function showError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.classList.add('invalid');
  error.textContent = message;
}

// clearError: removes the red border and error message
function clearError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.classList.remove('invalid');
  error.textContent = '';
}

// redirectAfterLogin: sets localStorage flag then redirects
function redirectAfterLogin() {
  localStorage.setItem('justLoggedIn', 'true');
  setTimeout(function() {
    window.location.href = '../html/index.html';
  }, 1500); // waits 1.5 seconds so user can read success message
}

// ---- STEP 3: signup validation ----
function validateSignup() {
  let isValid = true;

  const firstName  = document.getElementById('first-name').value.trim();
  const lastName   = document.getElementById('last-name').value.trim();
  const email      = document.getElementById('email').value.trim();
  const phone      = document.getElementById('phone').value.trim();
  const password   = document.getElementById('password').value;
  const age        = document.getElementById('age').value;
  const gender     = document.getElementById('gender').value;

  // clear all errors first
  clearError('first-name', 'err-first-name');
  clearError('last-name',  'err-last-name');
  clearError('email',      'err-email');
  clearError('phone',      'err-phone');
  clearError('password',   'err-password');
  clearError('age',        'err-age');
  clearError('gender',     'err-gender');

  // validate each field
if (firstName === '') {
  showError('first-name', 'err-first-name', 'First name is required.');
  isValid = false;
} else if (!/^[a-zA-Z\s]+$/.test(firstName)) {
  showError('first-name', 'err-first-name', 'First name must contain letters only.');
  isValid = false;
}

  if (lastName === '') {
  showError('last-name', 'err-last-name', 'Last name is required.');
  isValid = false;
} else if (!/^[a-zA-Z\s]+$/.test(lastName)) {
  showError('last-name', 'err-last-name', 'Last name must contain letters only.');
  isValid = false;
}

  if (email === '') {
    showError('email', 'err-email', 'Email is required.');
    isValid = false;
  } else if (!email.includes('@')) {
    showError('email', 'err-email', 'Please enter a valid email.');
    isValid = false;
  }

  if (phone === '') {
    showError('phone', 'err-phone', 'Phone number is required.');
    isValid = false;
  } else if (phone.length < 10) {
    showError('phone', 'err-phone', 'Please enter a valid phone number.');
    isValid = false;
  }

  if (password === '') {
  showError('password', 'err-password', 'Password is required.');
  isValid = false;
} else if (password.length < 8) {
  showError('password', 'err-password', 'Password must be at least 8 characters.');
  isValid = false;
} else if (!/[A-Z]/.test(password)) {
  showError('password', 'err-password', 'Password must include at least one capital letter.');
  isValid = false;
} else if (!/[a-z]/.test(password)) {
  showError('password', 'err-password', 'Password must include at least one small letter.');
  isValid = false;
} else if (!/[0-9]/.test(password)) {
  showError('password', 'err-password', 'Password must include at least one number.');
  isValid = false;
} else if (!/[^a-zA-Z0-9]/.test(password)) {
  showError('password', 'err-password', 'Password must include at least one symbol e.g. !@#$');
  isValid = false;
}

  if (age === '' || Number(age) < 18) {
    showError('age', 'err-age', 'You must be 18 or above to register.');
    isValid = false;
  }

  if (gender === '') {
    showError('gender', 'err-gender', 'Please select your gender.');
    isValid = false;
  }

  return isValid;
}

// ---- STEP 4: store registered user for login simulation ----
// we save the email, password and name in memory (not localStorage)
// so login can check against it in the same session
let registeredUser = null;

// ---- STEP 5: button event listeners ----

// "Create Account" button on step 1
document.getElementById('go-signup').addEventListener('click', function() {
  showStep(stepEl.s2signup);
  updateProgress(2);
});

// "Login" button on step 1
document.getElementById('go-login').addEventListener('click', function() {
  showStep(stepEl.s2login);
  updateProgress(2);
});

// "Back" on signup form
document.getElementById('back-signup').addEventListener('click', function() {
  showStep(stepEl.s1);
  updateProgress(1);
});

// "Back" on login form
document.getElementById('back-login').addEventListener('click', function() {
  showStep(stepEl.s1);
  updateProgress(1);
});

// "Next" on signup form: validate then proceed to step 3
document.getElementById('next-signup').addEventListener('click', function() {
  if (!validateSignup()) return; // stop here if invalid

  // save registered user for login simulation
  registeredUser = {
    firstName: document.getElementById('first-name').value.trim(),
    lastName:  document.getElementById('last-name').value.trim(),
    email:     document.getElementById('email').value.trim(),
    phone:     document.getElementById('phone').value.trim(),
    password:  document.getElementById('password').value
  };

  // fill in success card
  document.getElementById('welcome-name').textContent =
    'Hi ' + registeredUser.firstName + ' ' + registeredUser.lastName + '! 🐾';
  document.getElementById('welcome-phone').textContent =
    'Your membership number: ' + registeredUser.phone;

  showStep(stepEl.s3signup);
  updateProgress(3);
  redirectAfterLogin();
});

// "Login" button on login form: check credentials
document.getElementById('submit-login').addEventListener('click', function() {
  const loginEmail    = document.getElementById('login-email').value.trim();
  const loginPassword = document.getElementById('login-password').value;
  const failBox       = document.getElementById('login-fail');

  clearError('login-email',    'err-login-email');
  clearError('login-password', 'err-login-password');
  failBox.style.display = 'none';

  // basic empty checks
  let isValid = true;
  if (loginEmail === '') {
    showError('login-email', 'err-login-email', 'Email is required.');
    isValid = false;
  }
  if (loginPassword === '') {
    showError('login-password', 'err-login-password', 'Password is required.');
    isValid = false;
  }
  if (!isValid) return;

  // check against registered user
  if (
    registeredUser &&
    loginEmail === registeredUser.email &&
    loginPassword === registeredUser.password
  ) {
    // login success
    document.getElementById('login-welcome-name').textContent =
      'Welcome back, ' + registeredUser.firstName + '! 🐾';
    showStep(stepEl.s3login);
    updateProgress(3);
    redirectAfterLogin();
  } else {
    // login fail
    failBox.style.display = 'block';
  }
});