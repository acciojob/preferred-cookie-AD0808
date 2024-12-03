// Function to set a cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie by name
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function to apply saved preferences
function applyPreferences() {
  const fontSize = getCookie("fontSize");
  const fontColor = getCookie("fontColor");

  if (fontSize) {
    document.documentElement.style.setProperty('--fontsize', fontSize + 'px');
    document.getElementById('fontsize').value = fontSize;
  }

  if (fontColor) {
    document.documentElement.style.setProperty('--fontcolor', fontColor);
    document.getElementById('fontcolor').value = fontColor;
  }
}

// Event listener for form submission
document.getElementById('customizationForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  const fontSize = document.getElementById('fontsize').value;
  const fontColor = document.getElementById('fontcolor').value;

  setCookie("fontSize", fontSize, 7); // Save font size for 7 days
  setCookie("fontColor", fontColor, 7); // Save font color for 7 days

  applyPreferences(); // Apply preferences immediately after saving
});

// Apply preferences on page load
window.onload = applyPreferences;
