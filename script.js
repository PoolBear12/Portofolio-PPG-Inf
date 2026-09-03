/* =============================================
   E-PORTOFOLIO PPG CALON GURU 2026
   JavaScript — Interactivity & Animations
   ============================================= */

'use strict';

// =============================================
// 1. NAVBAR — Scroll & Toggle
// =============================================
const navbar  = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
  updateSectionNumbers();
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animasi hamburger → X
  const spans = navToggle.querySelectorAll('span');
  navToggle.classList.toggle('is-open');
  if (navToggle.classList.contains('is-open')) {
    spans['profil', 'pendidikan', 'artefak', 'lampiran', 'refleksi', 'matakuliah', 'artefak2', 'lampiran2', 'refleksi2', 'matakuliah2', 'misi', 'filosofi'].style.transform = 'rotate(45deg) translate(4px, 4px)';
    spans['profil', 'pendidikan', 'artefak', 'lampiran', 'refleksi', 'matakuliah', 'artefak2', 'lampiran2', 'refleksi2', 'matakuliah2', 'misi', 'filosofi'].style.opacity   = '0';
    spans['profil', 'pendidikan', 'artefak', 'lampiran', 'refleksi', 'matakuliah', 'artefak2', 'lampiran2', 'refleksi2', 'matakuliah2', 'misi', 'filosofi'].style.transform = 'rotate(-45deg) translate(4px, -4px)';
  } else {
    spans['profil', 'pendidikan', 'artefak', 'lampiran', 'refleksi', 'matakuliah', 'artefak2', 'lampiran2', 'refleksi2', 'matakuliah2', 'misi', 'filosofi'].style.transform = '';
    spans['profil', 'pendidikan', 'artefak', 'lampiran', 'refleksi', 'matakuliah', 'artefak2', 'lampiran2', 'refleksi2', 'matakuliah2', 'misi', 'filosofi'].style.opacity   = '';
    spans['profil', 'pendidikan', 'artefak', 'lampiran', 'refleksi', 'matakuliah', 'artefak2', 'lampiran2', 'refleksi2', 'matakuliah2', 'misi', 'filosofi'].style.transform = '';
  }
});

// Tutup nav mobile saat link diklik
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('is-open');
    navToggle.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '';
    });
  });
});

// =============================================
// 2. ACTIVE NAV LINK — Highlight saat scroll
// =============================================
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// =============================================
// 3. SECTION NUMBER BAR — Highlight saat scroll
// =============================================
const numSpans = document.querySelectorAll('.section-number-bar span');

function updateSectionNumbers() {
  const scrollY = window.scrollY + 180;
  const sectionList = ['profil', 'pendidikan', 'artefak', 'lampiran', 'refleksi', 'matakuliah', 'artefak2', 'lampiran2', 'refleksi2', 'matakuliah2', 'filosofi', 'misi'];
  sectionList.forEach((id, idx) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top    = el.offsetTop;
    const height = el.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      numSpans.forEach(s => s.classList.remove('active-num'));
      if (numSpans['profil', 'pendidikan', 'artefak', 'lampiran', 'refleksi', 'matakuliah', 'artefak2', 'lampiran2', 'refleksi2', 'matakuliah2', 'misi', 'filosofi']) numSpans['profil', 'pendidikan', 'artefak', 'lampiran', 'refleksi', 'matakuliah', 'artefak2', 'lampiran2', 'refleksi2', 'matakuliah2', 'misi', 'filosofi'].classList.add('active-num');
    }
  });
}

// Klik section number bar → scroll ke section
numSpans.forEach((span, idx) => {
  const ids = ['profil', 'pendidikan', 'artefak', 'lampiran', 'refleksi', 'matakuliah', 'artefak2', 'lampiran2', 'refleksi2', 'matakuliah2', 'filosofi', 'misi'];
  span.style.cursor = 'pointer';
  span.addEventListener('click', () => {
    const target = document.getElementById(ids['profil', 'pendidikan', 'artefak', 'lampiran', 'refleksi', 'matakuliah', 'artefak2', 'lampiran2', 'refleksi2', 'matakuliah2', 'misi', 'filosofi']);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// =============================================
// 4. SCROLL REVEAL — Elemen masuk saat scroll
// =============================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay berdasarkan urutan dalam parent
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
      const index = siblings.indexOf(entry.target);
      const delay = Math.min(index * 80, 400);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// =============================================
// 5. TAB ARTEFAK — Switching tabs
// =============================================
const tabBtns    = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');

    // Update tombol
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Update konten
    tabContents.forEach(tc => {
      tc.classList.remove('active');
      if (tc.id === `tab-${target}`) {
        tc.classList.add('active');
        // Re-trigger animasi bar di dalam tab
        setTimeout(() => animateBarsInTab(tc), 100);
        // Re-trigger reveal di dalam tab
        tc.querySelectorAll('.reveal:not(.visible)').forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 80);
        });
      }
    });
  });
});

// =============================================
// 6. ANIMASI PROGRESS BARS
// =============================================
function animateBarsInTab(container) {
  const fills = container.querySelectorAll('.level-fill, .keber-fill, .nilai-fill');
  fills.forEach(fill => {
    const targetWidth = fill.style.width;
    fill.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.width = targetWidth;
      });
    });
  });
}

// Animasi bar saat section masuk viewport
const barSections = document.querySelectorAll('.artefak-section, .lampiran-section');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateBarsInTab(entry.target);
    }
  });
}, { threshold: 0.15 });

barSections.forEach(s => barObserver.observe(s));

// Animasi bars tab aktif pertama
setTimeout(() => {
  const activeTab = document.querySelector('.tab-content.active');
  if (activeTab) animateBarsInTab(activeTab);
}, 600);

// =============================================
// 7. SMOOTH SCROLL — Internal links
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80; // tinggi navbar
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// =============================================
// 8. NILAI CIRCLE SVG — Animate progress
// =============================================
function animateNilaiCircle() {
  const progressEl = document.querySelector('.nilai-progress');
  if (!progressEl) return;

  // Ambil nilai dari teks .nilai-angka (misalnya "3.8")
  const nilaiAngka = document.querySelector('.nilai-angka');
  if (!nilaiAngka) return;
  const rawText = nilaiAngka.textContent.trim();
  const nilaiNum = parseFloat(rawText.replace('[', '').replace(']', '')) || 0;

  // Konversi: nilai 0–100 → circumference 326.73
  // Jika skala 0–4 (IPK-like), kalikan 25 untuk mendapat persentase
  let pct;
  if (nilaiNum <= 4) {
    pct = (nilaiNum / 4) * 100;
  } else {
    pct = Math.min(nilaiNum, 100);
  }

  const circumference = 2 * Math.PI * 52; // r = 52
  const dashArray = (pct / 100) * circumference;

  // Tambahkan gradient SVG
  const svgEl = progressEl.closest('svg');
  if (svgEl) {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="#4891e0"/>
        <stop offset="100%" stop-color="#1d5fa8"/>
      </linearGradient>`;
    svgEl.prepend(defs);
  }

  setTimeout(() => {
    progressEl.style.strokeDasharray = `${dashArray} ${circumference}`;
  }, 800);
}

const nilaiObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateNilaiCircle();
      nilaiObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const nilaiCircle = document.querySelector('.nilai-circle');
if (nilaiCircle) nilaiObserver.observe(nilaiCircle);

// =============================================
// 9. HERO PARALLAX — Efek parallax orbs
// =============================================
window.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.hero-orb');
  const xRatio = (e.clientX / window.innerWidth  - 0.5) * 2;
  const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;

  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 8;
    orb.style.transform = `translate(${xRatio * factor}px, ${yRatio * factor}px)`;
  });
});

// =============================================
// 10. COUNTER ANIMASI — Jika ada angka statistik
// =============================================
function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-target') || el.textContent);
  const decimals = (target % 1 !== 0) ? 1 : 0;
  const duration = 1500;
  const step = 16;
  const steps = duration / step;
  let current = 0;
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current.toFixed(decimals);
  }, step);
}

// =============================================
// 11. SCROLL PROGRESS BAR — Di atas halaman
// =============================================
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  height: 3px;
  width: 0%;
  background: linear-gradient(to right, #c8a84b, #2171c7);
  z-index: 9999;
  transition: width 0.1s linear;
  pointer-events: none;
`;
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
});

// =============================================
// 12. LAMPIRAN LINK — Placeholder klik
// =============================================
document.querySelectorAll('.lamp-action').forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (btn.getAttribute('href') === '#') {
      e.preventDefault();
      showToast('📎 Ganti href="#" dengan URL file Anda (Google Drive, OneDrive, dll)');
    }
  });
});

// =============================================
// 13. TOAST NOTIFICATION
// =============================================
function showToast(message) {
  // Hapus toast lama jika ada
  const old = document.querySelector('.ppg-toast');
  if (old) old.remove();

  const toast = document.createElement('div');
  toast.className = 'ppg-toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: rgba(13, 31, 60, 0.95);
    color: #fff;
    padding: 0.75rem 1.5rem;
    border-radius: 100px;
    font-size: 0.85rem;
    font-family: 'DM Sans', sans-serif;
    border: 1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(12px);
    z-index: 9999;
    opacity: 0;
    transition: all 0.3s ease;
    white-space: nowrap;
    max-width: 90vw;
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// =============================================
// 14. FOTO PLACEHOLDER — Klik untuk upload
// =============================================
document.querySelectorAll('.foto-placeholder').forEach(placeholder => {
  placeholder.style.cursor = 'pointer';
  placeholder.title = 'Klik untuk petunjuk menambahkan foto';
  placeholder.addEventListener('click', () => {
    showToast('📸 Ganti div .foto-placeholder dengan tag <img src="foto.jpg"> Anda');
  });
});

// =============================================
// 15. PROFIL PHOTO — Klik untuk petunjuk
// =============================================
const photoPh = document.querySelector('.profil-photo-placeholder');
if (photoPh) {
  photoPh.style.cursor = 'pointer';
  photoPh.title = 'Klik untuk petunjuk mengganti foto';
  photoPh.addEventListener('click', () => {
    showToast('👤 Ganti .profil-photo-placeholder dengan <img class="profil-photo-img" src="foto-anda.jpg">');
  });
}

// =============================================
// 16. INISIALISASI
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  updateActiveNav();
  updateSectionNumbers();

  // Reveal elemen yang sudah terlihat saat halaman pertama load
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });

  // Animasi nilai circle jika sudah terlihat
  if (nilaiCircle) {
    const rect = nilaiCircle.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      animateNilaiCircle();
    }
  }

  console.log('%c✦ E-Portofolio PPG Calon Guru 2026', 'color:#c8a84b; font-size:16px; font-weight:bold;');
  console.log('%cDibuat dengan dedikasi untuk pendidikan Indonesia 🇮🇩', 'color:#4891e0; font-size:12px;');
});
