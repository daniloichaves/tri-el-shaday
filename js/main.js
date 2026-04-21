// ============================================
// Tri El Shaday — Papelaria | Main Script
// ============================================

(function () {
  'use strict';

  // ---- Configuration ----
  // Substitua pelo número real da loja (apenas dígitos, com DDI)
  const WHATSAPP_PHONE = '5511963268197';

  // ---- Scroll Progress Bar ----
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + '%';
  });

  // ---- Navbar scroll state ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }
  });

  // ---- Active nav link on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });

  // ---- Hamburger / Mobile Menu ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ---- Dark Mode Toggle ----
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  const savedTheme = localStorage.getItem('tri-el-shaday-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('tri-el-shaday-theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // ---- Back to Top ----
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }
  });
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- WhatsApp Floating Widget ----
  const waBubble = document.getElementById('waBubble');
  const waToggle = document.getElementById('waToggle');

  if (waToggle && waBubble) {
    waToggle.addEventListener('click', () => {
      waBubble.classList.toggle('open');
    });
  }

  // ---- Product Filter ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ---- Gallery Lightbox ----
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ---- Testimonials Carousel ----
  const track = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('tPrev');
  const nextBtn = document.getElementById('tNext');

  if (track && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -340, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: 340, behavior: 'smooth' });
    });
  }

  // ---- Contact Form (send via WhatsApp) ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = contactForm.querySelector('#contactName').value.trim();
      const subject = contactForm.querySelector('#contactSubject').value;
      const message = contactForm.querySelector('#contactMessage').value.trim();

      if (!name || !subject || !message) {
        showToast('⚠️ Preencha todos os campos obrigatórios.');
        return;
      }

      const text = encodeURIComponent(
        `Olá! Meu nome é *${name}*.\n\n*Assunto:* ${subject}\n\n*Mensagem:* ${message}`
      );
      window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
      showToast('💬 Abrindo WhatsApp...');
      contactForm.reset();
    });
  }

  // ---- Countdown Timer (exemplo: promoção de 24h) ----
  function startCountdown() {
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    function update() {
      const now = new Date();
      let diff = end - now;
      if (diff < 0) diff = 0;

      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      const hEl = document.getElementById('cdHours');
      const mEl = document.getElementById('cdMinutes');
      const sEl = document.getElementById('cdSeconds');

      if (hEl) hEl.textContent = String(h).padStart(2, '0');
      if (mEl) mEl.textContent = String(m).padStart(2, '0');
      if (sEl) sEl.textContent = String(s).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }

  startCountdown();

  // ---- Newsletter Form ----
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      if (email) {
        showToast('📧 Inscrição realizada! Obrigado!');
        newsletterForm.reset();
      }
    });
  }

  // ---- Search Bar ----
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', e => {
      e.preventDefault();
      const query = searchForm.querySelector('input').value.trim();
      if (query) {
        // Filter products by name
        filterBtns.forEach(b => b.classList.remove('active'));
        const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
        if (allBtn) allBtn.classList.add('active');

        let found = 0;
        productCards.forEach(card => {
          const name = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
          const desc = card.querySelector('.product-desc')?.textContent.toLowerCase() || '';
          if (name.includes(query.toLowerCase()) || desc.includes(query.toLowerCase())) {
            card.classList.remove('hidden');
            found++;
          } else {
            card.classList.add('hidden');
          }
        });

        showToast(found > 0 ? `🔍 ${found} produto(s) encontrado(s)` : '😕 Nenhum produto encontrado');

        // Scroll to products
        const prod = document.getElementById('produtos');
        if (prod) prod.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // ---- Scroll Animations (Intersection Observer) ----
  const fadeEls = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeEls.forEach(el => observer.observe(el));

  // ---- Toast Notification ----
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  // Make showToast available globally (for onclick attributes)
  window.showToast = showToast;

  // ---- Buy Now (redirect to WhatsApp) ----
  window.buyNow = function (productName) {
    const text = encodeURIComponent(
      `Olá! Tenho interesse no produto: *${productName}*. Poderia me dar mais informações?`
    );
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
  };

  // ---- Stats Counter Animation ----
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        let start = 0;
        const duration = 1500;
        const step = target / (duration / 16);

        const interval = setInterval(() => {
          start += step;
          if (start >= target) {
            start = target;
            clearInterval(interval);
          }
          el.textContent = Math.floor(start).toLocaleString('pt-BR') + suffix;
        }, 16);

        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statObserver.observe(el));

})();
