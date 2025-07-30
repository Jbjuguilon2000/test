$(document).ready(function () {
  const card = document.getElementById('card');
  const glow = card.querySelector('.glow');

  // Simple mobile detection
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  if (!isMobile) {
    // === DESKTOP: Enable hover/touch interactive effects ===

    let glowOn = false;
    let glowTimeout;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = (x - centerX) / 10;
      const deltaY = (y - centerY) / 10;

      card.style.transform = `rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;

      glow.style.background = `
        linear-gradient(
          90deg,
          rgba(255,0,0,0.35),
          rgba(0,0,255,0.35),
          rgba(255,255,0,0.35)
        )
      `;
      glow.style.backgroundPosition = `${x}px ${y}px`;
      glow.style.backgroundSize = `400% 400%`;
      glow.style.opacity = '1';

      glowOn = true;
      clearTimeout(glowTimeout);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `rotateY(0deg) rotateX(0deg)`;
      glow.style.opacity = '0';
      glowOn = false;
    });

    card.addEventListener('touchstart', (e) => {
      e.preventDefault();

      glowOn = !glowOn;
      if (glowOn) {
        glow.style.opacity = '1';
        clearTimeout(glowTimeout);
        glowTimeout = setTimeout(() => {
          glow.style.opacity = '0';
          glowOn = false;
        }, 3000);
      } else {
        glow.style.opacity = '0';
        clearTimeout(glowTimeout);
      }
    });

    card.addEventListener('touchmove', (e) => {
      if (!glowOn) return;

      const touch = e.touches[0];
      const rect = card.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      glow.style.backgroundPosition = `${x}px ${y}px`;
    });
  } else {
    // === MOBILE: Disable hover/touch, add continuous slow 3D animation ===
    card.style.transition = 'transform 0.1s ease';
    let angle = 0;
    function animate() {
      angle += 0.2; // speed of rotation/sway, adjust as needed
      const rotateX = 5 * Math.sin(angle * Math.PI / 180);
      const rotateY = 5 * Math.cos(angle * Math.PI / 180);
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      requestAnimationFrame(animate);
    }
    animate();
  }
});
