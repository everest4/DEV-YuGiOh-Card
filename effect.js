const card = document.querySelector('.card');

let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
let rotationX = 0, rotationY = 0;

// Smooth motion loop
function animate() {
  targetX += (mouseX - targetX) * 0.15; // smooth follow (0.1 = easing)
  targetY += (mouseY - targetY) * 0.1;

  const rotateX = (targetY - 0.5) * 40; // 20° max tilt
  const rotateY = (targetX - 0.5) * -40;

  // Apply smooth rotation
  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  // Update shine position
  const xPercent = targetX * 100;
  const yPercent = targetY * 100;
  card.style.setProperty('--shine-x', `${xPercent}%`);
  card.style.setProperty('--shine-y', `${yPercent}%`);

  requestAnimationFrame(animate);
}

animate();

card.addEventListener('mouseenter', () => {
  card.classList.add('shine-active');
});

card.addEventListener('mouseleave', () => {
  card.classList.remove('shine-active');
  mouseX = 0.5;
  mouseY = 0.5;
});

card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  mouseX = (e.clientX - rect.left) / rect.width;
  mouseY = (e.clientY - rect.top) / rect.height;
});
