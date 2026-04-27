document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Effect (Ensures solid background remains consistent)
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Smooth Scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // 3. Reveal Animations on Scroll
  const revealElements = document.querySelectorAll('.feature-card, .download-card, h2, .app-mockup');
  
  const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
        revealOnScroll.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    revealOnScroll.observe(el);
  });

  // 4. Sidebar Navigation (Interactive Dashboard)
  const navItems = document.querySelectorAll('.preview-nav-item');
  const pages = document.querySelectorAll('.preview-page');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const pageName = item.querySelector('span').textContent.toLowerCase();
      const targetId = `page-${pageName}`;
      
      const targetPage = document.getElementById(targetId);
      if (targetPage) {
        navItems.forEach(i => i.classList.remove('is-active'));
        item.classList.add('is-active');
        pages.forEach(p => p.classList.remove('is-active'));
        targetPage.classList.add('is-active');
      }
    });
  });

  // 5. Mode Toggle (Normal / Lock-in)
  const toggleOptions = document.querySelectorAll('.preview-toggle span');
  const statusDot = document.querySelector('.ui-icon-status');
  const statusText = document.querySelector('.preview-status span');
  const previewMain = document.querySelector('.preview-main');

  toggleOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      toggleOptions.forEach(o => o.classList.remove('is-active'));
      opt.classList.add('is-active');

      if (opt.textContent === 'Lock-in') {
        statusText.textContent = 'Enforcing';
        statusDot.style.color = '#ff6b6b';
        previewMain.style.background = 'radial-gradient(circle at top right, rgba(255, 107, 107, 0.05), transparent)';
      } else {
        statusText.textContent = 'Tracking';
        statusDot.style.color = '#ffffff';
        previewMain.style.background = 'none';
      }
    });
  });

  // 6. Player Controls
  const playBtn = document.querySelector('.player-button-play');
  const progressBar = document.querySelector('.player-bar b');
  const currentTime = document.querySelector('.player-progress span:first-child');
  let isPlaying = false;
  let progress = 60;

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      playBtn.textContent = isPlaying ? '⏸' : '▶';
      if (isPlaying) animateProgress();
    });
  }

  function animateProgress() {
    if (!isPlaying) return;
    progress += 0.1;
    if (progress > 100) progress = 0;
    if (progressBar) progressBar.style.width = `${progress}%`;
    
    const totalSeconds = 112; 
    const currentSeconds = Math.floor((progress / 100) * totalSeconds);
    const mins = Math.floor(currentSeconds / 60);
    const secs = currentSeconds % 60;
    if (currentTime) currentTime.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    
    requestAnimationFrame(animateProgress);
  }

  // 7. Dashboard Controls (Tabs)
  const previewControls = document.querySelectorAll('.preview-control');
  previewControls.forEach(ctrl => {
    ctrl.addEventListener('click', () => {
      previewControls.forEach(c => c.classList.remove('is-active'));
      ctrl.classList.add('is-active');
    });
  });

  // 8. Update Time in Status
  function updateStatusTime() {
    const timeEl = document.querySelector('.preview-status small');
    if (!timeEl) return;
    const now = new Date();
    const hours = now.getHours();
    const mins = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    timeEl.textContent = `${displayHours}:${mins.toString().padStart(2, '0')} ${ampm}`;
  }
  updateStatusTime();
  setInterval(updateStatusTime, 60000);
});
