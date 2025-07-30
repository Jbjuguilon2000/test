$(document).ready(function () {
  const card = document.getElementById("card");

  // 3D Mouse Tilt
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse X
    const y = e.clientY - rect.top; // Mouse Y
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / 10;
    const deltaY = (y - centerY) / 10;

    card.style.transform = `rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
    // card.querySelector(
    //   ".glow"
    // ).style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,255,255,0.3), transparent 80%)`;

    card.querySelector(".glow").style.background = `
  radial-gradient(circle at ${x}px ${y}px,
    rgba(255,0,0,0.25) 5%,
    rgba(0,0,255,0.25) 95%,
    transparent 90%
  )
`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
  });

  // ✅ REMOVED:
  // No need to load from API if you're using your own logo/image
});
