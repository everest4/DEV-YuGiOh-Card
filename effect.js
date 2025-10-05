const card = document.querySelector('.card');

let mouseX = 0.5, mouseY = 0.5; 
let currentX = 0.5, currentY = 0.5; 
let rotationX = 0, rotationY = 0;
let isHovered = false;
let lastTime = performance.now();

function animate(time) {
  const delta = Math.min((time - lastTime) / 16.67, 2); 
  lastTime = time;

  const ease = isHovered ? 0.12 : 0.08;

  currentX += (mouseX - currentX) * ease * delta;
  currentY += (mouseY - currentY) * ease * delta;

  const maxTilt = 35;
  rotationX = (currentY - 0.5) * maxTilt;
  rotationY = (currentX - 0.5) * -maxTilt;

  card.style.transform = `
    perspective(800px)
    rotateX(${rotationX}deg)
    rotateY(${rotationY}deg)
    scale3d(1.02, 1.02, 1)
  `;

  const xPercent = currentX * 100;
  const yPercent = currentY * 100;
  card.style.setProperty('--shine-x', `${xPercent}%`);
  card.style.setProperty('--shine-y', `${yPercent}%`);

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

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

  mouseX = 0.5;
  mouseY = 0.5;
});
