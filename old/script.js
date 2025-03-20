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
function toggleMenu() {
    let menu = document.getElementById("nav-menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

// Close menu when clicking a link
// Close menu when clicking a mobile menu item, but not the desktop menu
function closeMenu() {
    let menu = document.getElementById("nav-menu");
    let isMobile = window.innerWidth <= 768; // Detect if it's mobile

    if (isMobile) {
        menu.style.display = "none"; // Only hide if on mobile
    }
}
// Ensure menu closes when clicking a section link (only for mobile)
document.addEventListener("DOMContentLoaded", function () {
    let menuItems = document.querySelectorAll("#nav-menu a");
    menuItems.forEach(item => {
        item.addEventListener("click", closeMenu);
    });
});
window.addEventListener("scroll", function () {
    let button = document.getElementById("hamburgerMenu");
    let scrollY = window.scrollY; // Get how much user has scrolled

    // Adjust the button position dynamically
    button.style.bottom = `${20 - scrollY}px`;
});
window.addEventListener("scroll", function () {
    let button1 = document.getElementById("nav-menu");
    let scrollY1 = window.scrollY; // Get how much user has scrolled

    // Adjust the button position dynamically
    button1.style.bottom = `${85 - scrollY1}px`;
});

function handleEnterKey(event) {
    if (event.key === "Enter") {
        checkPassword();
    }
}

function sendEmail(event) {
    event.preventDefault(); // Prevents page refresh

    const attendanceValue = document.querySelector('input[name="attendance"]:checked')?.value || "Not Provided";
    let attendanceColor = "black"; // Default color

    if (attendanceValue.toLowerCase() === "yes") {
        attendanceColor = "green";
    } else if (attendanceValue.toLowerCase() === "no") {
        attendanceColor = "red";
    }

    const formData = {
        attendance: attendanceValue,
        attendance_color: attendanceColor,  // Sending the color as a variable
        guest_names: document.getElementById("guest-names")?.value || "Not Provided",
        email: document.getElementById("email")?.value || "Not Provided",
        special_notes: document.getElementById("special-notes")?.value || "Not Provided"
    };

    console.log("Form Data Sent to EmailJS:", formData); // Debugging

    fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            service_id: "service_90c6i3h",
            template_id: "template_1a74b59",
            user_id: "IVJxwsFAz60sp9qjo",
            template_params: formData
        })
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error("EmailJS Error: " + response.statusText);
        })
        .then(result => {
            console.log("Email Sent Successfully:", result);
            alert("✅ RSVP Submitted Successfully!");
            document.getElementById("rsvp-form").reset();
        })
        .catch(error => {
            console.error("EmailJS Error:", error);
            alert("❌ Failed to send RSVP. Please try again.");
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
    }

    // Fix dots visibility
    let dotsContainer = document.querySelector('.dots-container');
    if (sectionId === 'gallery') {
        dotsContainer.style.display = 'flex'; // Show dots only in gallery
    } else {
        dotsContainer.style.display = 'none'; // Hide everywhere else
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

    setTimeout(showGallerySlides, 5000); // Change image every 5 seconds
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
