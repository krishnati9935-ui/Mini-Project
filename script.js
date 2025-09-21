





// Show Registration Page
function showRegistration() {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("registrationSection").style.display = "block";
}

// Show Login Page
function showLogin() {
    document.getElementById("registrationSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
}

// Show Dashboard
function showDashboard(user) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("registrationSection").style.display = "none";
    document.getElementById("dashboardSection").style.display = "block";

    document.getElementById("welcomeName").innerText = user.name;
    document.getElementById("voterName").innerText = user.name;
    document.getElementById("voterMobile").innerText = user.mobile;
    document.getElementById("voterCNIC").innerText = user.aadhaar;
    document.getElementById("voterPhoto").src = user.photo;
}

// Show About Section
function showAbout() {
    document.getElementById("aboutSection").scrollIntoView({ behavior: "smooth" });
}

// Scroll to Contact
function scrollToContact() {
    document.getElementById("contactBox").scrollIntoView({ behavior: "smooth" });
}

// Logout
function logout() {
    localStorage.removeItem("loggedInUser");
    location.reload();
}

// Bio Toggle
function toggleBio(btn) {
    let bio = btn.previousElementSibling;
    if (bio.classList.contains("short")) {
        bio.classList.remove("short");
        btn.innerText = "View Less";
    } else {
        bio.classList.add("short");
        btn.innerText = "View More";
    }
}

// Registration
document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    let name = document.getElementById("regName").value;
    let dob = document.getElementById("regDOB").value;
    let email = document.getElementById("regEmail").value;
    let mobile = document.getElementById("regMobile").value;
    let gender = document.getElementById("regGender").value;
    let aadhaar = document.getElementById("regAadhaar").value;
    let pass = document.getElementById("regPass").value;
    let confirmPass = document.getElementById("regConfirmPass").value;
    let photoFile = document.getElementById("regPhoto").files[0];

    if (pass !== confirmPass) {
        alert("Passwords do not match!");
        return;
    }

    let reader = new FileReader();
    reader.onload = function() {
        let user = {
            name, dob, email, mobile, gender, aadhaar, pass, photo: reader.result, voted: false
        };
        localStorage.setItem(aadhaar, JSON.stringify(user));
        alert("Registration Successful!");
        showLogin();
    };
    reader.readAsDataURL(photoFile);
});

// Login
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    let aadhaar = document.getElementById("loginAadhaar").value;
    let pass = document.getElementById("loginPassword").value;

    let userData = localStorage.getItem(aadhaar);
    if (!userData) {
        alert("User not found!");
        return;
    }

    let user = JSON.parse(userData);
    if (user.pass !== pass) {
        alert("Invalid password!");
        return;
    }

    localStorage.setItem("loggedInUser", aadhaar);
    showDashboard(user);
});

// Voting
function vote(party, candidate) {
    let aadhaar = localStorage.getItem("loggedInUser");
    if (!aadhaar) return alert("Please log in first!");

    let user = JSON.parse(localStorage.getItem(aadhaar));
    if (user.voted) {
        return alert("You have already voted!");
    }

    let voteKey = "votes_" + party;
    let votes = parseInt(localStorage.getItem(voteKey) || "0") + 1;
    localStorage.setItem(voteKey, votes);
    document.getElementById("votes" + party).innerText = votes;

    user.voted = true;
    localStorage.setItem(aadhaar, JSON.stringify(user));
    document.getElementById("voterStatus").innerText = "Voted";
    document.getElementById("voterStatus").className = "status-voted";

    alert(`Vote cast successfully for ${candidate} (${party})`);
}

// Restore session
window.onload = function() {
    let aadhaar = localStorage.getItem("loggedInUser");
    if (aadhaar) {
        let user = JSON.parse(localStorage.getItem(aadhaar));
        showDashboard(user);
    }

//done by me


//end by me


    ["BJP","INC","AAP","SP","BSP"].forEach(party => {
        let votes = localStorage.getItem("votes_" + party) || 0;
        document.getElementById("votes" + party).innerText = votes;
    });
};