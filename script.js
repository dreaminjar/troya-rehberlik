// Rezervasyon formunu işle
const form = document.getElementById('reservation-form');
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const submitButton = document.getElementById('submit-button');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', e => {
  e.preventDefault();

  // Form verilerini al
  const name = nameInput.value;
  const email = emailInput.value;
  const date = dateInput.value;
  const time = timeInput.value;

  // Form verilerini doğrula
  if (name.trim() === '' || email.trim() === '' || date.trim() === '' || time.trim() === '') {
    alert('Lütfen tüm alanları doldurun.');
    return;
  }

  // Form verilerini sunucuya gönder
  submitButton.disabled = true;
  const data = { name, email, date, time };
  fetch('/submit-reservation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    submitButton.disabled = false;
    if (data.success) {
      form.reset();
      successMessage.classList.remove('hidden');
    } else {
      alert('Bir hata oluştu, lütfen tekrar deneyin.');
    }
  })
  .catch(error => {
    console.error(error);
    alert('Bir hata oluştu, lütfen tekrar deneyin.');
    submitButton.disabled = false;
  });
});
