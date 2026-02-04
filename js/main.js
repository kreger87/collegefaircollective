document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const button = form.querySelector('button');
  const status = document.getElementById('form-status');

  // Disable button while submitting
  button.disabled = true;
  button.textContent = 'Sending...';
  status.textContent = '';
  status.className = '';

  const formData = new FormData(form);

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    if (response.ok) {
      status.textContent = 'Message sent! We\'ll be in touch soon.';
      status.className = 'success';
      form.reset();
    } else {
      throw new Error('Failed to send');
    }
  } catch (error) {
    status.textContent = 'Something went wrong. Please try again.';
    status.className = 'error';
  } finally {
    button.disabled = false;
    button.textContent = 'Send Message';
  }
});
