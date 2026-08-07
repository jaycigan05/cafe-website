// ==============================
// Filter Reviews
// ==============================
function filterReviews() 
{
    const selectedRating = document.getElementById("ratingFilter").value;
    const reviews = document.querySelectorAll(".reviewCard");

    reviews.forEach(function (review) 
    {
        if (selectedRating === "all" || review.dataset.rating === selectedRating) 
            {
            review.style.display = "block";
        } else 
            {
            review.style.display = "none";
        }
    });
}

// ==============================
// Get Elements
// ==============================

const reviewForm = document.getElementById("reviewForm");
const reviewList = document.querySelector(".reviewRow");

// Load saved reviews
loadReviews();

// ==============================
// Load Reviews
// ==============================
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

// ==============================
// Submit Review
// ==============================

reviewForm.addEventListener("submit", submitReview);

function submitReview(event) 
{

    event.preventDefault();

    const name = document.getElementById("customerName").value;
    const rating = document.getElementById("rating").value;
    const reviewText = document.getElementById("reviewText").value;

    let ratingNumber = "";

    if (rating === "★★★★★") 
        {
        ratingNumber = "5";
    }
    else if (rating === "★★★★☆") 
        {
        ratingNumber = "4";
    }
    else if (rating === "★★★☆☆") 
        {
        ratingNumber = "3";
    }
    else if (rating === "★★☆☆☆") 
        {
        ratingNumber = "2";
    }
    else {
        ratingNumber = "1";
    }

    const today = new Date().toLocaleDateString("en-US", 
        {
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    // Display review immediately
    addReview(name, rating, ratingNumber, reviewText, today);

    // Save to Local Storage
    saveReview(name, rating, ratingNumber, reviewText, today);

    // Show success popup
    document.getElementById("successPopup").classList.add("show");

    reviewForm.reset();

    filterReviews();
}

// ==============================
// Save Review
// ==============================

function saveReview(name, rating, ratingNumber, reviewText, date) 
{

    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

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

// ==============================
// Add Review
// ==============================

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

    reviewList.prepend(reviewCard);
}

// ==============================
// Success Popup
// ==============================

function closePopup() 
{
    document.getElementById("successPopup").classList.remove("show");
}

// ==============================
// Scroll Reveal
// ==============================

const reveals = document.querySelectorAll(".reveal");

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

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();