$(document).ready(function () {
  const card = document.getElementById('card');
  const glow = card.querySelector('.glow');
  let glowOn = false;
  let glowTimeout;

  // 3D Mouse Tilt + Glow position (desktop)
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse X
    const y = e.clientY - rect.top;  // Mouse Y
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / 10;
    const deltaY = (y - centerY) / 10;

    // Rotate card
    card.style.transform = `rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;

    // Show glow with linear gradient and move its position
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

    glowOn = true; // keep track glow is on
    clearTimeout(glowTimeout); // clear any fade out timeout
  });

  // Reset on mouse leave
  card.addEventListener('mouseleave', () => {
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    glow.style.opacity = '0';
    glowOn = false;
  });

  // Touch support (mobile): tap to toggle glow on/off
  card.addEventListener('touchstart', (e) => {
    e.preventDefault(); // prevent mouse event fallback on some devices

    glowOn = !glowOn;
    if (glowOn) {
      glow.style.opacity = '1';

      // Auto fade out after 3 seconds
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

  // Touch move: move the glow position with finger
  card.addEventListener('touchmove', (e) => {
    if (!glowOn) return; // only move glow if it’s on

    const touch = e.touches[0];
    const rect = card.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    glow.style.backgroundPosition = `${x}px ${y}px`;
  });

  // If you want to remove the Pokémon API, just comment out or remove this block below:
  /*
  const pokemon = "charizard"; // You can change this
  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
    method: "GET",
    success: function (data) {
      $('#pokemon-img').attr('src', data.sprites.other["official-artwork"].front_default);
      $('#pokemon-name').text(data.name.toUpperCase());
    },
    error: function () {
      $('#pokemon-name').text("Not Found");
    }
  });
  */
});
