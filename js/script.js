const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('togglePassword');
const login = document.getElementById('submit')
const eyeIcon = toggleBtn.querySelector('.icon-eye');
const eyeOffIcon = toggleBtn.querySelector('.icon-eye-off');

toggleBtn.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  eyeIcon.style.display = isHidden ? 'none' : 'block';
  eyeOffIcon.style.display = isHidden ? 'block' : 'none';
  toggleBtn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
});
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.classList.remove("show"), 3000);
}
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop the page from reloading
  let valid = true;

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  document.getElementById("emailError").textContent = "";
  document.getElementById("passwordError").textContent = "";

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    document.getElementById("emailError").textContent = "Enter a valid email";
    valid = false;
  }
  if (password.length < 6) {
    document.getElementById("passwordError").textContent = "Password must be at least 6 characters";
    valid = false;
  }

  if (valid){
   showToast("You have signed in successfully", "success");
  }
});


