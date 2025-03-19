const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dialogueIndex = 0;
let player = { x: 50, y: canvas.height - 150, size: 80 };
let snacksCollected = 0;

// Images
const gunjanImage = new Image();
gunjanImage.src = 'https://upload.wikimedia.org/wikipedia/en/e/ed/Doraemon_character.png'; // Doraemon as fun representation

const snackImage = new Image();
snackImage.src = 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png'; // Popcorn icon

// Story dialogues
const dialogues = [
  "Sara: Happy Birthday, Gunjan! Ready for a fun quest?",
  "Gunjan: Of course! What are we doing today?",
  "Sara: Let's collect your favorite snacks for your party.",
  "Sara: Watch out for fun challenges on the way!",
  "Gunjan: Bring it on!"
];

// Snack Positions
const snacks = [
  { x: 300, y: 450 },
  { x: 600, y: 350 },
  { x: 900, y: 500 }
];

// Draw Player
function drawPlayer() {
  ctx.drawImage(gunjanImage, player.x, player.y, player.size, player.size);
}

// Draw Snacks
function drawSnacks() {
  snacks.forEach(snack => {
    ctx.drawImage(snackImage, snack.x, snack.y, 50, 50);
  });
}

// Update Game
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawSnacks();
  requestAnimationFrame(update);
}

// Movement Controls
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") player.x += 30;
  if (e.key === "ArrowLeft") player.x -= 30;
  if (e.key === "ArrowUp") player.y -= 30;
  if (e.key === "ArrowDown") player.y += 30;

  snacks.forEach((snack, index) => {
    if (Math.abs(player.x - snack.x) < 50 && Math.abs(player.y - snack.y) < 50) {
      snacks.splice(index, 1);
      snacksCollected++;
      if (snacksCollected === 3) {
        showFinalMessage();
      }
    }
  });
});

// Dialogue Control
function nextDialogue() {
  if (dialogueIndex < dialogues.length) {
    document.getElementById("dialogue-text").innerText = dialogues[dialogueIndex];
    dialogueIndex++;
  } else {
    document.getElementById("dialogue-box").style.display = "none";
    update();
  }
}

// Final Message
function showFinalMessage() {
  alert("Congratulations, Gunjan! You collected all your snacks. Enjoy your party with Sara!");
}

// Initialize Game
gunjanImage.onload = () => {
  update();
};
