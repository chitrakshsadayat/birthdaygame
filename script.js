const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gunjanImage = new Image();
gunjanImage.src = 'gunjan.png';

gunjanImage.onload = () => console.log('Gunjan image loaded successfully.');
gunjanImage.onerror = () => console.error('Failed to load Gunjan image. Check the file path or image format.');

const snacks = [];
const snackImage = new Image();
snackImage.src = 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png'; // Using an online snack image
snackImage.onload = () => console.log('Snack image loaded. Game is ready.');
snackImage.onerror = () => console.error('Failed to load snack image. Using fallback.');

function drawPlayer() {
  if (!gunjanImage.complete || gunjanImage.naturalWidth === 0) {
    console.error('Image not loaded, skipping draw.');
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(gunjanImage, canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100);
  snacks.forEach(snack => {
    if (snackImage.complete && snackImage.naturalWidth > 0) {
      ctx.drawImage(snackImage, snack.x, snack.y, 50, 50);
    } else {
      ctx.fillStyle = 'orange';
      ctx.beginPath();
      ctx.arc(snack.x, snack.y, 25, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

function spawnSnack() {
  snacks.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height });
}

function update() {
  console.log('Game is running.');
  drawPlayer();
  requestAnimationFrame(update);
}

document.getElementById('startButton').onclick = () => {
  console.log('All dialogues done. Starting the game.');
  for (let i = 0; i < 5; i++) spawnSnack();
  update();
};
