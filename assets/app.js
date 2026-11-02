// ===== SHARED APP LOGIC =====

// Project data for filtering and navigation
const projects = [
  {
    id: 1,
    number: '01',
    title: 'AI Personal Avatar / Agent',
    tagline: 'Memory-enabled conversational voice assistant',
    description: 'Memory-enabled conversational voice assistant combining speech recognition, language models, speech synthesis and persistent semantic memory.',
    categories: ['AI & LLM'],
    stack: ['Node.js', 'Express.js', 'Deepgram', 'LLMs', 'Piper TTS', 'ChromaDB', 'Vector Embeddings'],
    page: '/projects/ai-personal-avatar.html'
  },
  {
    id: 2,
    number: '02',
    title: 'Intelligent Groundwater Virtual Assistant',
    tagline: 'Interactive groundwater data platform',
    description: 'Interactive groundwater data platform with a dashboard and conversational assistant.',
    categories: ['Data Analytics', 'AI & LLM'],
    stack: ['Next.js 14', 'React.js', 'Python', 'Flask', 'Vercel', 'Render'],
    page: '/projects/groundwater-assistant.html'
  },
  {
    id: 3,
    number: '03',
    title: 'Indian Carbon Registry Prototype',
    tagline: 'Carbon-credit management platform',
    description: 'Carbon-credit management prototype for project registration, verification, credit management, trading and retirement.',
    categories: ['Blockchain'],
    stack: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Ethers.js', 'Hardhat', 'Solidity'],
    page: '/projects/carbon-registry.html',
    badge: 'Top 10, Smart India Hackathon 2025'
  },
  {
    id: 4,
    number: '04',
    title: 'Interactive Road Mapping Interface: AI Pathfinding',
    tagline: 'Road detection and pathfinding from satellite imagery',
    description: 'Road detection and pathfinding from satellite imagery, computing optimised routes.',
    categories: ['Computer Vision'],
    stack: ['Python', 'PyTorch', 'U-Net', 'NetworkX', 'A* Algorithm', 'Flask', 'React.js', 'REST APIs'],
    page: '/projects/road-mapping-ai-pathfinding.html'
  },
  {
    id: 5,
    number: '05',
    title: 'CENTINELA / Bayora',
    tagline: 'Secure LLM red-team evaluation platform',
    description: 'Secure LLM red-team evaluation platform for adversarial prompt testing, evaluation orchestration, result verification and audit logging.',
    categories: ['Security', 'AI & LLM'],
    stack: ['Python', 'FastAPI', 'Docker', 'SHA-256', 'Ed25519'],
    page: '/projects/centinela-bayora.html',
    achievement: 'Testing: 83/83 passing tests'
  }
];

// ===== NAVIGATION =====
function initNav() {
  const currentPage = getCurrentPageName();
  const navLinks = document.querySelectorAll('.nav-link, .menu-list li a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href') || link.getAttribute('data-section');
    if (href === currentPage || (currentPage === 'home' && href === '/') || (currentPage === 'home' && href === 'home')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

function getCurrentPageName() {
  const path = window.location.pathname;
  if (path === '/' || path === '/index.html') return 'home';
  if (path.includes('/about')) return 'about';
  if (path.includes('/projects') && !path.includes('/projects/')) return 'projects';
  if (path.includes('/skills')) return 'skills';
  if (path.includes('/resume')) return 'resume';
  if (path.includes('/contact')) return 'contact';
  return 'home';
}

// ===== MENU OVERLAY =====
function initMenuOverlay() {
  const menuBtn = document.querySelector('.header-brand-menu, .brand-menu');
  const overlay = document.querySelector('.menu-overlay');
  const closeBtn = document.querySelector('.menu-overlay-close');

  if (!menuBtn || !overlay) return;

  menuBtn.addEventListener('click', () => {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    focusTrap(overlay);
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

function focusTrap(element) {
  const focusables = element.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
  const firstFocusable = focusables[0];
  const lastFocusable = focusables[focusables.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey && document.activeElement === firstFocusable) {
      lastFocusable.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
      firstFocusable.focus();
      e.preventDefault();
    }
  });

  firstFocusable?.focus();
}

// ===== STATEMENT FILL ANIMATION =====
function animateStatementFill() {
  const statementSection = document.querySelector('.statement-section');
  if (!statementSection) return;

  const statementText = statementSection.querySelector('.statement-text');
  if (!statementText) return;

  const spans = statementText.querySelectorAll('span');
  const rect = statementSection.getBoundingClientRect();
  const viewportCenter = window.innerHeight / 2;

  let progress = 0;
  if (rect.bottom > 0 && rect.top < window.innerHeight) {
    progress = (viewportCenter - rect.top) / (rect.bottom - rect.top);
    progress = Math.max(0, Math.min(1, progress - 0.2));
  }

  const filledCount = Math.floor(progress * spans.length);
  spans.forEach((span, i) => {
    const softEdge = 3;
    if (i < filledCount - softEdge) {
      span.style.color = 'white';
    } else if (i < filledCount) {
      const blend = (i - (filledCount - softEdge)) / softEdge;
      const grey = 111;
      const white = 255;
      const r = Math.round(grey + (white - grey) * blend);
      span.style.color = `rgb(${r}, ${r}, ${r})`;
    } else {
      span.style.color = 'rgb(111, 111, 111)';
    }
  });
}

// ===== HERO PARALLAX =====
function parallaxHero() {
  const heroPhoto = document.querySelector('.hero-bg-photo');
  if (!heroPhoto) return;
  const driftAmount = window.scrollY * 0.12;
  heroPhoto.style.transform = `translateX(-50%) translateY(${driftAmount}px)`;
}

// ===== COUNTER ANIMATION =====
function animateCounter(el, targetVal, duration, delay) {
  const startTime = Date.now() + delay * 1000;
  const startVal = 0;

  function frame() {
    const elapsed = (Date.now() - startTime) / 1000;
    if (elapsed < 0) {
      requestAnimationFrame(frame);
      return;
    }
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(startVal + (targetVal - startVal) * progress);
    el.textContent = current + '+';
    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }
  requestAnimationFrame(frame);
}

// ===== PROJECT FILTERING =====
function initProjectFiltering() {
  const filterChips = document.querySelectorAll('.filter-chip');
  const projectRows = document.querySelectorAll('.project-row');
  const resultCount = document.querySelector('.result-count');

  if (!filterChips.length) return;

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.dataset.filter;
      let visibleCount = 0;

      projectRows.forEach(row => {
        const categories = row.dataset.categories.split(',');
        const matches = filter === 'all' || categories.includes(filter);
        
        if (matches) {
          row.classList.remove('hidden');
          visibleCount++;
        } else {
          row.classList.add('hidden');
        }
      });

      if (resultCount) {
        resultCount.textContent = `${visibleCount} project${visibleCount !== 1 ? 's' : ''}`;
      }
    });
  });
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('.form-submit');
  const honeypot = form.querySelector('.form-honeypot input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Honeypot check
    if (honeypot && honeypot.value) {
      console.log('Honeypot triggered');
      return;
    }

    // Validate
    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !message) {
      showError(form, 'Please fill all required fields');
      return;
    }

    if (!isValidEmail(email)) {
      showError(form, 'Please enter a valid email');
      return;
    }

    const opportunity = form.querySelector('select[name="opportunity"]').value;

    // Try endpoint
    const endpoint = form.getAttribute('data-endpoint');
    if (endpoint) {
      submitBtn.disabled = true;
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, opportunity, message })
      })
        .then(r => r.json())
        .then(() => {
          showSuccess(form, 'Thank you! Your message has been sent.');
          form.reset();
        })
        .catch(err => {
          showError(form, 'Failed to send. Please try again.');
          console.error(err);
        })
        .finally(() => {
          submitBtn.disabled = false;
        });
    } else {
      // Fallback: mailto
      const subject = `New opportunity inquiry from ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\nOpportunity: ${opportunity}\n\nMessage:\n${message}`;
      const mailtoLink = `mailto:tanishyadav937@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      showSuccess(form, 'Opening your email app…');
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 500);
      
      // Copy fallback
      setTimeout(() => {
        showToast('Copy your message to clipboard');
        navigator.clipboard.writeText(body).catch(err => console.error(err));
      }, 1000);
    }
  });

  // Copy buttons
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.dataset.copy;
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied: ${text}`);
      });
    });
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(form, msg) {
  const existing = form.querySelector('.form-error-banner');
  if (existing) existing.remove();

  const banner = document.createElement('div');
  banner.className = 'form-success';
  banner.style.borderColor = 'rgba(255, 107, 107, 0.3)';
  banner.style.color = '#ff6b6b';
  banner.textContent = msg;
  form.insertBefore(banner, form.firstChild);

  setTimeout(() => banner.remove(), 5000);
}

function showSuccess(form, msg) {
  const existing = form.querySelector('.form-success');
  if (existing) existing.remove();

  const banner = document.createElement('div');
  banner.className = 'form-success';
  banner.textContent = msg;
  form.insertBefore(banner, form.firstChild);
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideDown 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// ===== LOCAL TIME (IST) =====
function initLocalTime() {
  const clockEl = document.querySelector('.local-time-value');
  if (!clockEl) return;

  function updateTime() {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    clockEl.textContent = formatter.format(new Date());
  }

  updateTime();
  setInterval(updateTime, 1000);
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const reveals = document.querySelectorAll('[data-reveal]');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = entry.target.dataset.reveal + ' 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const backToTopLink = document.querySelector('.back-to-top');
  if (!backToTopLink) return;

  backToTopLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== PREFETCH =====
function prefetchLinks() {
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#')) {
        const prefetch = document.createElement('link');
        prefetch.rel = 'prefetch';
        prefetch.href = href;
        document.head.appendChild(prefetch);
      }
    });
  });
}

// ===== INIT ALL =====
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initMenuOverlay();
  initProjectFiltering();
  initContactForm();
  initLocalTime();
  initScrollReveal();
  initBackToTop();
  prefetchLinks();

  // Scroll listeners
  window.addEventListener('scroll', () => {
    animateStatementFill();
    parallaxHero();
  });
});
