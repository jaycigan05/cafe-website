// only show reviews matching whatever star rating is picked
function filterReviews()
{
	const selectedRating = document.getElementById("ratingFilter").value;
	const reviews = document.querySelectorAll(".reviewCard");

	reviews.forEach(function (review)
	{
		// "all" shows everything, otherwise match the rating
		if (selectedRating === "all" || review.dataset.rating === selectedRating)
		{
			review.style.display = "block";
		}
		else
		{
			review.style.display = "none";
		}
	});
}

// elements we reuse a lot
const reviewForm = document.getElementById("reviewForm");
const reviewList = document.querySelector(".reviewRow");

//Word count
const reviewTextInput = document.getElementById("reviewText");
const charCount = document.getElementById("charCount");

reviewTextInput.addEventListener("input", function()
{
	charCount.textContent = reviewTextInput.value.length;
});

// load whatever was saved last time
loadReviews();

// pull saved reviews out of localStorage and render them
function loadReviews()
{
	const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

	reviews.forEach(review =>
	{
		addReview
		(
			review.name,
			review.rating,
			review.ratingNumber,
			review.reviewText,
			review.date
		);
	});
}

// runs whenever the review form gets submitted
reviewForm.addEventListener("submit", submitReview);

function submitReview(event)
{
	// stop the page from reloading
	event.preventDefault();

	const name = document.getElementById("customerName").value;
	const rating = document.getElementById("rating").value;
	const reviewText = document.getElementById("reviewText").value;

	let ratingNumber = "";
	// turn the star emoji into a plain number
	if (rating === "⭐⭐⭐⭐⭐")
	{
		ratingNumber = "5";
	}
	else if (rating === "⭐⭐⭐⭐☆")
	{
		ratingNumber = "4";
	}
	else if (rating === "⭐⭐⭐☆☆")
	{
		ratingNumber = "3";
	}
	else if (rating === "⭐⭐☆☆☆")
	{
		ratingNumber = "2";
	}
	else
	{
		ratingNumber = "1";
	}

	// today's date, for the review timestamp
	const today = new Date().toLocaleDateString("en-US",
		{
			month: "long",
			day: "numeric",
			year: "numeric"
		});

	// show it straight away
	addReview(name, rating, ratingNumber, reviewText, today);

	// persist it
	saveReview(name, rating, ratingNumber, reviewText, today);

	// pop the success message
	document.getElementById("successPopup").classList.add("show");

	// reset the form
	reviewForm.reset();

	// re-run the filter so the new review shows up right
	filterReviews();
}

// stash the review in localStorage
function saveReview(name, rating, ratingNumber, reviewText, date)
{

	const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
	// newest first
	reviews.unshift(
		{
			name,
			rating,
			ratingNumber,
			reviewText,
			date
		});

	localStorage.setItem("reviews", JSON.stringify(reviews));
}

// builds a review card and drops it into the page
function addReview(name, rating, ratingNumber, reviewText, date)
{

	const reviewCard = document.createElement("div");

	reviewCard.className = "reviewCard";
	reviewCard.dataset.rating = ratingNumber;

	reviewCard.innerHTML = `
		<img src="../images/profile.jpg" class="rimage" alt="Profile">

		<h3>${name}</h3>

		<div class="stars">${rating}</div>

		<p>"${reviewText}"</p>

		<div class="reviewDate">📅 ${date}</div>
	`;

	// stick it at the top
	reviewList.prepend(reviewCard);
}

// hides the success popup
function closePopup()
{
	document.getElementById("successPopup").classList.remove("show");
}

// fade-in-on-scroll for anything with .reveal
const reveals = document.querySelectorAll(".reveal");
// flip .active once it's in view
function revealOnScroll()
{

	reveals.forEach((item) =>
	{

		const windowHeight = window.innerHeight;
		const revealTop = item.getBoundingClientRect().top;
		const revealPoint = 120;

		if (revealTop < windowHeight - revealPoint)
		{
			item.classList.add("active");
		}
	});
}
// check on every scroll
window.addEventListener("scroll", revealOnScroll);
// and once on load too
revealOnScroll();