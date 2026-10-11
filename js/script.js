const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('togglePassword');
const eyeIcon = toggleBtn.querySelector('.icon-eye');
const eyeOffIcon = toggleBtn.querySelector('.icon-eye-off');

toggleBtn.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  eyeIcon.style.display = isHidden ? 'none' : 'block';
  eyeOffIcon.style.display = isHidden ? 'block' : 'none';
  toggleBtn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
});
