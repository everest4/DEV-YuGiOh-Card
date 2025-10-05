const card = document.querySelector('.card');

let mouseX = 0.5, mouseY = 0.5;     // normalized position
let currentX = 0.5, currentY = 0.5; // smoothed values
let rotationX = 0, rotationY = 0;
let isHovered = false;
let lastTime = performance.now();

function animate(time) {
  const delta = Math.min((time - lastTime) / 16.67, 2); // normalize frame time
  lastTime = time;

  // Easing factor (larger = snappier)
  const ease = isHovered ? 0.12 : 0.08;

  currentX += (mouseX - currentX) * ease * delta;
  currentY += (mouseY - currentY) * ease * delta;

  // Calculate rotation angles
  const maxTilt = 35;
  rotationX = (currentY - 0.5) * maxTilt;
  rotationY = (currentX - 0.5) * -maxTilt;

  // Apply transform with subtle perspective depth
  card.style.transform = `
    perspective(800px)
    rotateX(${rotationX}deg)
    rotateY(${rotationY}deg)
    scale3d(1.02, 1.02, 1)
  `;

  // Dynamic holographic shine position
  const xPercent = currentX * 100;
  const yPercent = currentY * 100;
  card.style.setProperty('--shine-x', `${xPercent}%`);
  card.style.setProperty('--shine-y', `${yPercent}%`);

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// ===========================
// Event Listeners
// ===========================
card.addEventListener('mouseenter', () => {
  isHovered = true;
  card.classList.add('shine-active');
});

card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  mouseX = (e.clientX - rect.left) / rect.width;
  mouseY = (e.clientY - rect.top) / rect.height;
});

card.addEventListener('mouseleave', () => {
  isHovered = false;
  card.classList.remove('shine-active');

  // Smoothly reset to center
  mouseX = 0.5;
  mouseY = 0.5;
});
