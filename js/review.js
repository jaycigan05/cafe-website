// ==============================
// Filter Reviews
// ==============================
// Display only reviews that match the selected star rating.
function filterReviews() 
{
    const selectedRating = document.getElementById("ratingFilter").value;
    const reviews = document.querySelectorAll(".reviewCard");

    reviews.forEach(function (review) 
    {
        // Show all reviews or only reviews with the selected rating.
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
// Store frequently used page elements.
const reviewForm = document.getElementById("reviewForm");
const reviewList = document.querySelector(".reviewRow");

// Load any previously saved reviews when the page opens.
loadReviews();

// ==============================
// Load Reviews
// ==============================
// Retrieve saved reviews from Local Storage and display them.
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
// Run submitReview() whenever the review form is submitted.
reviewForm.addEventListener("submit", submitReview);

function submitReview(event) 
{
    // Prevent the page from refreshing after form submission.
    event.preventDefault();

    const name = document.getElementById("customerName").value;
    const rating = document.getElementById("rating").value;
    const reviewText = document.getElementById("reviewText").value;

    let ratingNumber = "";
    // Convert the selected star rating into a numeric value.
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

    // Generate today's date for the review.
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

    // Clear all form fields.
    reviewForm.reset();

    // Reapply the selected filter.
    filterReviews();
}

// ==============================
// Save Review
// ==============================
// Store the review inside Local Storage.
function saveReview(name, rating, ratingNumber, reviewText, date) 
{

    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
     // Insert the newest review at the beginning of the array.
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
// Create a new review card and display it on the page.
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
    
    // Add the newest review to the top of the review list.
    reviewList.prepend(reviewCard);
}

// ==============================
// Success Popup
// ==============================
// Close the success popup after submission.
function closePopup() 
{
    document.getElementById("successPopup").classList.remove("show");
}

// ==============================
// Scroll Reveal
// ==============================
// Select all elements that will animate when scrolling.
const reveals = document.querySelectorAll(".reveal");
// Add the animation once an element enters the viewport.
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
// Run the reveal animation whenever the page is scrolled.
window.addEventListener("scroll", revealOnScroll);
// Run once when the page first loads.
revealOnScroll();