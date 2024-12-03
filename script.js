// Function to set a cookie
// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie value by name
function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArr = decodedCookie.split(';');
    
    for(let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].split('=');
        if (name === cookiePair[0].trim()) {
            return cookiePair[1];
        }
    }
    return null;
}

// Function to apply saved preferences
function applyPreferences() {
    const savedFontSize = getCookie('fontSize');
    const savedFontColor = getCookie('fontColor');

    if (savedFontSize) {
        document.documentElement.style.setProperty('--fontsize', savedFontSize + 'px');
        document.getElementById('fontsize').value = savedFontSize;
    }
    
    if (savedFontColor) {
        document.documentElement.style.setProperty('--fontcolor', savedFontColor);
        document.getElementById('fontcolor').value = savedFontColor;
    }
}

// Event listener for form submission
document.getElementById('preferences-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    const fontSize = document.getElementById('fontsize').value;
    const fontColor = document.getElementById('fontcolor').value;

    // Save preferences as cookies
    setCookie('fontSize', fontSize, 30); // Save for 30 days
    setCookie('fontColor', fontColor, 30); // Save for 30 days
    
    // Apply changes immediately
    document.documentElement.style.setProperty('--fontsize', fontSize + 'px');
    document.documentElement.style.setProperty('--fontcolor', fontColor);
});

// Apply saved preferences on page load
applyPreferences();
