/**
 * Mohammad Ruhul Amin (Rafi) - Portfolio Script
 * Department of EEE, JSTU
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
      });
    });
  }

  // Active Navigation on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal Handlers
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn');
  const modals = document.querySelectorAll('.modal-backdrop');

  function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.add('is-open');
      document.body.style.overflow = 'hidden'; // prevent background scrolling
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal-target');
      openModal(modalId);
    });
  });

  modalCloseBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      closeModal(modal);
    });
  });

  // Close modal when clicking on the backdrop
  modals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Photography Gallery Filtering & Lightbox
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let activeGalleryItems = Array.from(galleryCards);
  let currentPhotoIndex = 0;

  // Filter gallery
  galleryFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-gallery-filter');

      galleryCards.forEach((card) => {
        const cat = card.getAttribute('data-gallery-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });

      activeGalleryItems = Array.from(galleryCards).filter((card) => card.style.display !== 'none');
    });
  });

  function updateLightbox(index) {
    if (activeGalleryItems.length === 0) return;
    if (index < 0) index = activeGalleryItems.length - 1;
    if (index >= activeGalleryItems.length) index = 0;
    currentPhotoIndex = index;

    const item = activeGalleryItems[currentPhotoIndex];
    const src = item.getAttribute('data-full-src');
    const title = item.getAttribute('data-title');

    if (lightboxImg) lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = title;
    if (lightboxCounter) lightboxCounter.textContent = `Photo ${currentPhotoIndex + 1} of ${activeGalleryItems.length}`;
  }

  galleryCards.forEach((card) => {
    card.addEventListener('click', () => {
      const idx = activeGalleryItems.indexOf(card);
      if (idx !== -1) {
        currentPhotoIndex = idx;
        updateLightbox(currentPhotoIndex);
        if (lightboxModal) {
          lightboxModal.classList.add('is-open');
          document.body.style.overflow = 'hidden';
        }
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      updateLightbox(currentPhotoIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      updateLightbox(currentPhotoIndex + 1);
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  // Arrow key navigation for lightbox
  document.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.classList.contains('is-open')) {
      if (e.key === 'ArrowLeft') {
        updateLightbox(currentPhotoIndex - 1);
      } else if (e.key === 'ArrowRight') {
        updateLightbox(currentPhotoIndex + 1);
      } else if (e.key === 'Escape') {
        lightboxModal.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    }
  });

  // ==========================================================================
  // Header Scroll Effect
  // ==========================================================================
  const header = document.querySelector('.site-header');
  function handleHeaderScroll() {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // ==========================================================================
  // Scroll Reveal Animations
  // ==========================================================================
  const revealElements = document.querySelectorAll(`
    .section-header,
    .project-card,
    .skill-category-card,
    .timeline-card,
    .feature-box,
    .contact-channel-card,
    .resume-profile-card,
    .resume-highlights-box,
    .cv-preview-frame,
    .interest-card,
    .pillar-item,
    .contact-card-box
  `);

  revealElements.forEach((el, index) => {
    el.classList.add('reveal');
    const delayClass = `reveal-delay-${(index % 4) + 1}`;
    el.classList.add(delayClass);
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-revealed'));
  }

  // ==========================================================================
  // Interactive 3D Card Tilt Effect
  // ==========================================================================
  const tiltCards = document.querySelectorAll('.project-card, .cv-preview-frame');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ==========================================================================
  // Animated Counters for Stats
  // ==========================================================================
  const statNumbers = document.querySelectorAll('.hero-stats-row .stat-box .number');
  let statsCounted = false;

  function runStatsCounter() {
    if (statsCounted) return;
    const statsContainer = document.querySelector('.hero-stats-row');
    if (!statsContainer) return;

    const rect = statsContainer.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      statsCounted = true;
      statNumbers.forEach((stat) => {
        const text = stat.textContent.trim();
        if (text === '5.00') {
          const target = 5.00;
          const duration = 1200;
          const start = performance.now();
          function updateGPA(time) {
            const elapsed = time - start;
            const progress = Math.min(elapsed / duration, 1);
            stat.textContent = (progress * target).toFixed(2);
            if (progress < 1) requestAnimationFrame(updateGPA);
            else stat.textContent = '5.00';
          }
          requestAnimationFrame(updateGPA);
        } else if (text === '3+') {
          const target = 3;
          const duration = 1000;
          const start = performance.now();
          function updateProj(time) {
            const elapsed = time - start;
            const progress = Math.min(elapsed / duration, 1);
            stat.textContent = `${Math.floor(progress * target)}+`;
            if (progress < 1) requestAnimationFrame(updateProj);
            else stat.textContent = '3+';
          }
          requestAnimationFrame(updateProj);
        }
      });
    }
  }

  window.addEventListener('scroll', runStatsCounter, { passive: true });
  runStatsCounter();

  // ==========================================================================
  // Cosmic Stardust Canvas Particle Engine
  // ==========================================================================
  const canvas = document.getElementById('cosmicCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    const particleColors = [
      'rgba(56, 189, 248, ',   // Cyan
      'rgba(192, 132, 252, ',  // Purple/Lavender
      'rgba(255, 255, 255, ',  // White Star
      'rgba(251, 191, 36, ',   // Gold
      'rgba(52, 211, 153, '    // Emerald
    ];

    const particleCount = Math.min(Math.floor(width / 28), 50);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        colorBase: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: Math.random() * 0.7 + 0.2,
        alphaSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22 - 0.07
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    let isDocumentVisible = true;
    document.addEventListener('visibilitychange', () => {
      isDocumentVisible = !document.hidden;
      if (isDocumentVisible) requestAnimationFrame(renderCosmicParticles);
    });

    function renderCosmicParticles() {
      if (!isDocumentVisible) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          p.x -= (dx / dist) * 0.35;
          p.y -= (dy / dist) * 0.35;
        }

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.alpha += p.alphaSpeed;
        if (p.alpha > 0.92 || p.alpha < 0.15) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.colorBase + p.alpha + ')';
        ctx.shadowBlur = p.radius * 4;
        ctx.shadowColor = p.colorBase + '0.8)';
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      requestAnimationFrame(renderCosmicParticles);
    }

    requestAnimationFrame(renderCosmicParticles);
  }
});
