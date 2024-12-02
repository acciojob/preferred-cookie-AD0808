//your JS code here. If required.
// Function to set a cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // Cookie expires after 'days' days
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to apply saved preferences
function applyPreferences() {
    const fontSize = getCookie("fontSize");
    const fontColor = getCookie("fontColor");

    if (fontSize) {
        document.documentElement.style.setProperty('--fontsize', fontSize + 'px');
        document.getElementById('fontsize').value = fontSize; // Set the input value
    }

    if (fontColor) {
        document.documentElement.style.setProperty('--fontcolor', fontColor);
        document.getElementById('fontcolor').value = fontColor; // Set the input value
    }
}

// Event listener for form submission
document.getElementById('preferences-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const fontSize = document.getElementById('fontsize').value;
    const fontColor = document.getElementById('fontcolor').value;

    setCookie("fontSize", fontSize, 30); // Save font size for 30 days
    setCookie("fontColor", fontColor, 30); // Save font color for 30 days

    // Apply preferences immediately
    applyPreferences();
});

// Apply preferences when the page loads
window.onload = applyPreferences;
