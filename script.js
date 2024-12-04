document.addEventListener("DOMContentLoaded", () => {
  const revealBtn = document.getElementById("reveal-btn");
  const message = document.getElementById("message");
  const confettiCanvas = document.getElementById("confetti-canvas");

  // Set up canvas for confetti
  const confetti = confettiCanvas.getContext("2d");
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  const confettiPieces = Array.from({ length: 150 }).map(() => ({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height,
    r: Math.random() * 6 + 2,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    speedX: Math.random() * 3 - 1.5,
    speedY: Math.random() * 3 + 2,
  }));

  function drawConfetti() {
    confetti.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiPieces.forEach((piece) => {
      confetti.beginPath();
      confetti.arc(piece.x, piece.y, piece.r, 0, Math.PI * 2);
      confetti.fillStyle = piece.color;
      confetti.fill();
      piece.x += piece.speedX;
      piece.y += piece.speedY;

      if (piece.y > confettiCanvas.height) {
        piece.y = -piece.r;
      }
      if (piece.x > confettiCanvas.width || piece.x < 0) {
        piece.x = Math.random() * confettiCanvas.width;
      }
    });
    requestAnimationFrame(drawConfetti);
  }

  drawConfetti();

  // Handle reveal button
  revealBtn.addEventListener("click", () => {
    message.classList.remove("hidden");
    message.style.display = "block";
    message.focus();
    revealBtn.style.display = "none"; // Hide the button after revealing the message
  });

  // Update canvas size on resize
  window.addEventListener("resize", () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  });
});
