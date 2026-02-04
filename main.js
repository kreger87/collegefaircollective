// Mobile menu toggle
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
  const menu = document.getElementById('mobileMenu');
  const btn = document.querySelector('.mobile-menu-btn');
  if (menu && !menu.contains(e.target) && !btn.contains(e.target)) {
    menu.classList.remove('active');
  }
});

// Accordion functionality
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', function() {
    const item = this.parentElement;
    const isActive = item.classList.contains('active');

    // Close all other items
    document.querySelectorAll('.accordion-item').forEach(i => {
      i.classList.remove('active');
    });

    // Toggle current item
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    const status = document.getElementById('form-status');
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.disabled = true;
    btn.textContent = 'Sending...';
    status.className = 'form-status';
    status.style.display = 'none';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        status.textContent = 'Thanks! We\'ll be in touch soon.';
        status.className = 'form-status success';
        status.style.display = 'block';
        this.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      status.textContent = 'Something went wrong. Please try again or email us directly.';
      status.className = 'form-status error';
      status.style.display = 'block';
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
}

// Full contact form (on partner page)
const fullContactForm = document.getElementById('full-contact-form');
if (fullContactForm) {
  fullContactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    const status = document.getElementById('full-form-status');
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.disabled = true;
    btn.textContent = 'Sending...';
    status.className = 'form-status';
    status.style.display = 'none';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        status.textContent = 'Thanks for reaching out! We\'ll be in touch within 1-2 business days.';
        status.className = 'form-status success';
        status.style.display = 'block';
        this.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      status.textContent = 'Something went wrong. Please email us directly at info@collegefaircollab.com';
      status.className = 'form-status error';
      status.style.display = 'block';
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
}
