document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent form from reloading the page

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Example: simple validation (you can change these values)
  if (username === "admin" && password === "12345") {
    alert("Login successful!");
    window.location.href = "PS1.html"; // ✅ redirect to another page
  } else {
    alert("Invalid username or password!");
  }
});