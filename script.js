(function () {
    emailjs.init("IVJxwsFAz60sp9qjo"); // Replace with your EmailJS Public Key
})();

/* function revealWebsite() {
    console.log("Reveal button clicked."); // Debugging log
    document.getElementById("helloPage").style.display = "none"; // Hide intro

    // Show password overlay properly
    const passwordOverlay = document.getElementById("passwordOverlay");
    passwordOverlay.style.visibility = "visible";
    passwordOverlay.style.opacity = "1";
    passwordOverlay.style.display = "flex";  // Ensure it's visible
    document.getElementById("passwordInput").focus(); // Auto-focus password field
}*/

function revealWebsite() {
    document.getElementById("helloPage").style.display = "none";
    document.getElementById("websiteContent").style.display = "block";
    document.getElementById("passwordOverlay").style.visibility = "visible";
    document.getElementById("passwordOverlay").style.opacity = "1";
    document.getElementById("passwordOverlay").style.display = "flex";
    document.getElementById("passwordInput").focus(); // Focus input automatically
}
function checkPassword() {
    const password = document.getElementById("passwordInput").value;
    if (password === "apple") {
        document.getElementById("passwordOverlay").style.display = "none";
        document.getElementById("websiteContent").style.display = "block";
        document.getElementById("welcome").style.display = "block"; 
        
        // Show the navbar after successful login
        document.querySelector("header").style.display = "block"; 
    } else {
        alert("Incorrect password. Try again.");
    }
}




function handleEnterKey(event) {
    if (event.key === "Enter") {
        checkPassword();
    }
}

function sendEmail(event) {
    event.preventDefault();

    emailjs.sendForm("service_90c6i3h", "template_1a74b59", event.target)
        .then(function () {
            alert("RSVP Submitted Successfully!");
            event.target.reset(); // Clear form
        }, function () {
            alert("Failed to send RSVP. Please try again.");
        });
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active'); // Remove active class
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        selectedSection.classList.add('active'); // Add active class

        // Check if gallery section is selected
        let dotsContainer = document.querySelector('.dots-container');
        if (sectionId === 'gallery') {
            dotsContainer.style.display = 'block'; // Show dots
        } else {
            dotsContainer.style.display = 'none'; // Hide dots
        }
    }
}


function scrollToItinerary(sectionId) {
    console.log("Navigating to:", sectionId);
    var section = document.getElementById(sectionId);
    if (section) {
        document.querySelectorAll(".itinerary-content section").forEach(sec => {
            sec.style.display = "none"; // Hide all sections
        });

        section.style.display = "block"; // Show only the clicked section
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
        console.error("Section not found:", sectionId);
    }
}
window.onload = function () {
    document.getElementById("passwordInput").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkPassword();
        }
    });
};

let galleryIndex = 0;
showGallerySlides();

/* Auto-play the slideshow */
function showGallerySlides() {
    let slides = document.querySelectorAll(".gallery-slide");
    let dots = document.querySelectorAll(".dot");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    galleryIndex++;
    if (galleryIndex > slides.length) { galleryIndex = 1; }

    slides[galleryIndex - 1].style.display = "block";

    dots.forEach(dot => dot.classList.remove("active"));
    dots[galleryIndex - 1].classList.add("active");

    setTimeout(showGallerySlides, 4000); // Change image every 4 seconds
}

/* Manual navigation */
function changeGallerySlide(n) {
    galleryIndex += n;
    let slides = document.querySelectorAll(".gallery-slide");
    if (galleryIndex > slides.length) { galleryIndex = 1; }
    if (galleryIndex < 1) { galleryIndex = slides.length; }
    updateGallerySlides();
}

/* Jump to specific slide */
function currentGallerySlide(n) {
    galleryIndex = n;
    updateGallerySlides();
}

/* Update slides based on manual selection */
function updateGallerySlides() {
    let slides = document.querySelectorAll(".gallery-slide");
    let dots = document.querySelectorAll(".dot");

    slides.forEach(slide => slide.style.display = "none");
    slides[galleryIndex - 1].style.display = "block";

    dots.forEach(dot => dot.classList.remove("active"));
    dots[galleryIndex - 1].classList.add("active");
}
