// LIGHTBOX INTERAKTIF
const modal = document.getElementById('lightboxModal');
const modalImg = document.getElementById('modalImage');

window.openModal = function(element) {
  const img = element.querySelector('img');
  if (img) {
    modal.style.display = 'flex';
    modalImg.src = img.src;
    document.body.style.overflow = 'hidden';
    // mencegah scroll di belakang modal di android
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  }
}

window.closeModal = function(event) {
  if (event.target === modal || event.target.classList.contains('close-modal')) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
  }
}

// Tutup modal dengan tombol ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
  }
});

// COPY NOMOR ADMIN (dengan fallback untuk android)
const waBtn = document.getElementById('waBtn');
const toast = document.getElementById('copyToast');

waBtn.addEventListener('click', function(e) {
  e.preventDefault();
  const nomor = '087725826284';
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(nomor).then(() => {
      showToast();
    }).catch(() => {
      fallbackCopy(nomor);
    });
  } else {
    fallbackCopy(nomor);
  }
});

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, 99999);
  
  try {
    document.execCommand('copy');
    showToast();
  } catch (err) {
    alert('Gagal menyalin, silakan salin manual: ' + text);
  }
  
  document.body.removeChild(textarea);
}

function showToast() {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// SCROLL REVEAL (dioptimasi untuk performa)
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

// throttle dengan requestAnimationFrame
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      checkReveal();
      ticking = false;
    });
    ticking = true;
  }
});

window.addEventListener('load', checkReveal);
window.addEventListener('resize', checkReveal);
setTimeout(checkReveal, 100);

// Deteksi perangkat android untuk penyesuaian
const isAndroid = /Android/i.test(navigator.userAgent);
if (isAndroid) {
  document.body.classList.add('android-device');
  
  // perbaikan untuk iframe maps di android
  const mapIframe = document.querySelector('.map-frame iframe');
  if (mapIframe) {
    // refresh iframe untuk android
    setTimeout(() => {
      const src = mapIframe.src;
      mapIframe.src = '';
      mapIframe.src = src;
    }, 500);
  }
}
