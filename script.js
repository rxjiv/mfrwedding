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

        // Call the same function used in the navbar to show "Welcome"
        showSection('welcome'); 
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
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none'; // Hide all sections
    });

    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
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