// LIGHTBOX INTERAKTIF
const modal = document.getElementById('lightboxModal');
const modalImg = document.getElementById('modalImage');

window.openModal = function(element) {
  const img = element.querySelector('img');
  if (img) {
    modal.style.display = 'flex';
    modalImg.src = img.src;
  }
}

window.closeModal = function(event) {
  if (event.target === modal || event.target.classList.contains('close-modal')) {
    modal.style.display = 'none';
  }
}

// COPY NOMOR ADMIN
const waBtn = document.getElementById('waBtn');
const toast = document.getElementById('copyToast');

waBtn.addEventListener('click', function(e) {
  e.preventDefault();
  navigator.clipboard.writeText('087725826284').then(() => {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }).catch(() => {
    alert('Gagal menyalin, silakan salin manual: 087725826284');
  });
});

// SCROLL REVEAL
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 100) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);
// panggil sekali setelah load
setTimeout(checkReveal, 100);