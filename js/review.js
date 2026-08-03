// ==============================
// Filter Reviews
// ==============================

function filterReviews()
{
    const selectedRating = document.getElementById("ratingFilter").value;
    const reviews = document.querySelectorAll(".reviewCard");

    reviews.forEach(function(review)
    {
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

// ==============================
// Get Elements
// ==============================

const reviewForm = document.getElementById("reviewForm");
const reviewList = document.querySelector(".reviewRow");

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
    else if (rating === "★☆☆☆☆")
    {
        ratingNumber = "1";
    }

    const today = new Date().toLocaleDateString("en-US",
    {
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    addReview(name, rating, ratingNumber, reviewText, today);

    reviewForm.reset();

    filterReviews();
}

// ==============================
// Add Review
// ==============================

function addReview(name, rating, ratingNumber, reviewText, date)
{
    const reviewCard = document.createElement("div");

    reviewCard.className = "reviewCard";
    reviewCard.dataset.rating = ratingNumber;

    reviewCard.innerHTML =
    `
        <img src="../Images/profile.jpg" class="rimage" alt="Profile">

        <h3>${name}</h3>

        <div class="stars">${rating}</div>

        <p>"${reviewText}"</p>

        <div class="reviewDate">📅 ${date}</div>
    `;

    reviewList.prepend(reviewCard);
}

// ==============================
// Success Pop Up
// ==============================

const form = document.getElementById("reviewForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    document.getElementById("successPopup").classList.add("show");

    form.reset();

});

function closePopup(){
    document.getElementById("successPopup").classList.remove("show");
}