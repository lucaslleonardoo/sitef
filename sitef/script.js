const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const questionCard = document.getElementById("questionCard");
const loveMessage = document.getElementById("loveMessage");
const hint = document.getElementById("hint");

let attempts = 0;

function moveNoButton() {
  attempts++;

  // Mantém o botão inteiro dentro da área visível, inclusive em telas pequenas.
  const margin = 12;
  const maxX = Math.max(margin, window.innerWidth - noButton.offsetWidth - margin);
  const maxY = Math.max(margin, window.innerHeight - noButton.offsetHeight - margin);
  const x = margin + Math.random() * Math.max(0, maxX - margin);
  const y = margin + Math.random() * Math.max(0, maxY - margin);

  noButton.style.position = "fixed";
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
  noButton.style.zIndex = "10";

  hint.textContent = attempts === 1
    ? "Ops! Parece que esse botão está fugindo... 👀"
    : "Esse botão não vai facilitar, hein? 😂💗";
}

noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("click", moveNoButton);
noButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveNoButton();
}, { passive: false });

yesButton.addEventListener("click", () => {
  document.body.classList.add("in-love");
  questionCard.hidden = true;
  loveMessage.hidden = false;
  document.title = "Amo você💗";

  // Corações decorativos caem pela tela após a resposta "Sim".
  for (let i = 0; i < 32; i++) {
    const heart = document.createElement("span");
    heart.textContent = Math.random() > 0.5 ? "♥" : "♡";
    heart.style.position = "fixed";
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = "-30px";
    heart.style.color = ["#fff", "#ff347f", "#ffd4e5"][Math.floor(Math.random() * 3)];
    heart.style.fontSize = `${14 + Math.random() * 22}px`;
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "20";
    heart.style.transition = `top ${2 + Math.random() * 3}s linear, transform 3s ease`;
    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.top = "110vh";
      heart.style.transform = `rotate(${Math.random() * 360}deg)`;
    });

    setTimeout(() => heart.remove(), 5500);
  }
});
