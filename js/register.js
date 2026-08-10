// register.js — multi-step signup/login form + validation.
// user gets saved to localStorage so login still works after a refresh

// grab all the step + progress-bar elements up front
const stepEl = {
	s1:       document.getElementById('step-1'),
	s2signup: document.getElementById('step-2-signup'),
	s2login:  document.getElementById('step-2-login'),
	s3signup: document.getElementById('step-3-signup'),
	s3login:  document.getElementById('step-3-login')
};

const progEl = {
	p1:    document.getElementById('prog-1'),
	p2:    document.getElementById('prog-2'),
	p3:    document.getElementById('prog-3'),
	line1: document.querySelectorAll('.progress-line')[0],
	line2: document.querySelectorAll('.progress-line')[1]
};

// pull back whatever user was saved last time, if any
let registeredUser = null;
const savedUser = localStorage.getItem('pawfeeUser');
if (savedUser)
{
	registeredUser = JSON.parse(savedUser);
}

// ---- helpers ----

// hide every step, show just this one
function showStep(stepToShow)
{
	Object.values(stepEl).forEach(function(step)
	{
		step.classList.remove('active');
	});
	stepToShow.classList.add('active');
}

// updates the progress dots/lines to match the current step
function updateProgress(stepNumber)
{
	[progEl.p1, progEl.p2, progEl.p3].forEach(function(dot)
	{
		dot.classList.remove('active', 'done');
	});
	[progEl.line1, progEl.line2].forEach(function(line)
	{
		line.classList.remove('done');
	});

	if (stepNumber === 1)
	{
		progEl.p1.classList.add('active');
	}
	if (stepNumber === 2)
	{
		progEl.p1.classList.add('done');
		progEl.line1.classList.add('done');
		progEl.p2.classList.add('active');
	}
	if (stepNumber === 3)
	{
		progEl.p1.classList.add('done');
		progEl.p2.classList.add('done');
		progEl.line1.classList.add('done');
		progEl.line2.classList.add('done');
		progEl.p3.classList.add('active');
	}
}

// red border + error text under a field
function showError(inputId, errorId, message)
{
	const input = document.getElementById(inputId);
	const error = document.getElementById(errorId);
	input.classList.add('invalid');
	input.setAttribute('aria-invalid', 'true');
	error.textContent = message;
}

// undo showError
function clearError(inputId, errorId)
{
	const input = document.getElementById(inputId);
	const error = document.getElementById(errorId);
	input.classList.remove('invalid');
	input.removeAttribute('aria-invalid');
	error.textContent = '';
}

// wipe the signup form back to empty
function resetSignupForm()
{
	document.getElementById('first-name').value = '';
	document.getElementById('last-name').value  = '';
	document.getElementById('email').value      = '';
	document.getElementById('phone').value      = '';
	document.getElementById('password').value   = '';
	document.getElementById('age').value        = '';
	document.getElementById('gender').value     = '';
	document.getElementById('promo').checked    = false;

	clearError('first-name', 'err-first-name');
	clearError('last-name',  'err-last-name');
	clearError('email',      'err-email');
	clearError('phone',      'err-phone');
	clearError('password',   'err-password');
	clearError('age',        'err-age');
	clearError('gender',     'err-gender');
}

// wipe the login form back to empty
function resetLoginForm()
{
	document.getElementById('login-email').value    = '';
	document.getElementById('login-password').value = '';
	document.getElementById('login-fail').style.display = 'none';

	clearError('login-email',    'err-login-email');
	clearError('login-password', 'err-login-password');
}

// flag that we just logged in, then bounce to the homepage
function redirectAfterLogin()
{
	localStorage.setItem('justLoggedIn', 'true');
	setTimeout(function()
	{
		window.location.href = 'index.html';
	}, 1500);
}

// ---- signup validation ----
function validateSignup()
{
	let isValid = true;

	const firstName = document.getElementById('first-name').value.trim();
	const lastName  = document.getElementById('last-name').value.trim();
	const email     = document.getElementById('email').value.trim();
	const phone     = document.getElementById('phone').value.trim();
	const password  = document.getElementById('password').value;
	const age       = document.getElementById('age').value;
	const gender    = document.getElementById('gender').value;

	// clear all errors first
	clearError('first-name', 'err-first-name');
	clearError('last-name',  'err-last-name');
	clearError('email',      'err-email');
	clearError('phone',      'err-phone');
	clearError('password',   'err-password');
	clearError('age',        'err-age');
	clearError('gender',     'err-gender');

	// first name
	if (firstName === '')
	{
		showError('first-name', 'err-first-name', 'First name is required.');
		isValid = false;
	}
	else if (!/^[a-zA-Z\s]+$/.test(firstName))
	{
		showError('first-name', 'err-first-name', 'First name must contain letters only.');
		isValid = false;
	}

	// last name
	if (lastName === '')
	{
		showError('last-name', 'err-last-name', 'Last name is required.');
		isValid = false;
	}
	else if (!/^[a-zA-Z\s]+$/.test(lastName))
	{
		showError('last-name', 'err-last-name', 'Last name must contain letters only.');
		isValid = false;
	}

	// email
	if (email === '')
	{
		showError('email', 'err-email', 'Email is required.');
		isValid = false;
	}
	else if (!email.includes('@'))
	{
		showError('email', 'err-email', 'Please enter a valid email.');
		isValid = false;
	}

	// phone
	if (phone === '')
	{
		showError('phone', 'err-phone', 'Phone number is required.');
		isValid = false;
	}
	else if (!/^60\d{9,10}$/.test(phone))
	{
		showError('phone', 'err-phone', 'Please enter a valid Malaysian number e.g. 601123456789');
		isValid = false;
	}

	// password
	if (password === '')
	{
		showError('password', 'err-password', 'Password is required.');
		isValid = false;
	}
	else if (password.length < 8)
	{
		showError('password', 'err-password', 'Password must be at least 8 characters.');
		isValid = false;
	}
	else if (!/[A-Z]/.test(password))
	{
		showError('password', 'err-password', 'Password must include at least one capital letter.');
		isValid = false;
	}
	else if (!/[a-z]/.test(password))
	{
		showError('password', 'err-password', 'Password must include at least one small letter.');
		isValid = false;
	}
	else if (!/[0-9]/.test(password))
	{
		showError('password', 'err-password', 'Password must include at least one number.');
		isValid = false;
	}
	else if (!/[^a-zA-Z0-9]/.test(password))
	{
		showError('password', 'err-password', 'Password must include at least one symbol e.g. !@#$');
		isValid = false;
	}

	// age
	if (age === '' || Number(age) < 18)
	{
		showError('age', 'err-age', 'You must be 18 or above to register.');
		isValid = false;
	}

	// gender
	if (gender === '')
	{
		showError('gender', 'err-gender', 'Please select your gender.');
		isValid = false;
	}

	return isValid;
}

// ---- wire up all the buttons ----

// "Create Account" on step 1
document.getElementById('go-signup').addEventListener('click', function()
{
	resetSignupForm();
	showStep(stepEl.s2signup);
	updateProgress(2);
});

// "Login" on step 1
document.getElementById('go-login').addEventListener('click', function()
{
	resetLoginForm();
	showStep(stepEl.s2login);
	updateProgress(2);
});

// "Back" on signup form
document.getElementById('back-signup').addEventListener('click', function()
{
	resetSignupForm();
	showStep(stepEl.s1);
	updateProgress(1);
});

// "Back" on login form
document.getElementById('back-login').addEventListener('click', function()
{
	resetLoginForm();
	showStep(stepEl.s1);
	updateProgress(1);
});

// "Next" on signup form: validate then go to step 3
document.getElementById('next-signup').addEventListener('click', function()
{
	if (!validateSignup()) return;

	registeredUser = {
		firstName: document.getElementById('first-name').value.trim(),
		lastName:  document.getElementById('last-name').value.trim(),
		email:     document.getElementById('email').value.trim(),
		phone:     document.getElementById('phone').value.trim(),
		password:  document.getElementById('password').value
	};

	// save to localStorage so login works after refresh
	localStorage.setItem('pawfeeUser', JSON.stringify(registeredUser));

	document.getElementById('welcome-name').textContent =
	'Hi ' + registeredUser.firstName + ' ' + registeredUser.lastName + '! 🐾';
	document.getElementById('welcome-phone').textContent =
	'Your membership number: ' + registeredUser.phone;

	showStep(stepEl.s3signup);
	updateProgress(3);
});

// "Login Now" on signup success card
document.getElementById('go-to-login').addEventListener('click', function()
{
	resetLoginForm();
	document.getElementById('login-email').value = registeredUser.email;
	showStep(stepEl.s2login);
	updateProgress(2);
});

// "Login" button on login form
document.getElementById('submit-login').addEventListener('click', function()
{
	const loginEmail    = document.getElementById('login-email').value.trim();
	const loginPassword = document.getElementById('login-password').value;
	const failBox       = document.getElementById('login-fail');

	clearError('login-email',    'err-login-email');
	clearError('login-password', 'err-login-password');
	failBox.style.display = 'none';

	let isValid = true;

	if (loginEmail === '')
	{
		showError('login-email', 'err-login-email', 'Email is required.');
		isValid = false;
	}
	if (loginPassword === '')
	{
		showError('login-password', 'err-login-password', 'Password is required.');
		isValid = false;
	}
	if (!isValid) return;

	if (
		registeredUser &&
	loginEmail === registeredUser.email &&
	loginPassword === registeredUser.password
	)
	{
		document.getElementById('login-welcome-name').textContent =
	  'Welcome back, ' + registeredUser.firstName + '! 🐾';
		showStep(stepEl.s3login);
		updateProgress(3);
		redirectAfterLogin();
	}
	else
	{
		failBox.style.display = 'block';
	}
});