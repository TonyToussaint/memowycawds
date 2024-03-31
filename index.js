const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

document.querySelector(".score").textContent = score;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
  //audio5.loop=true;
  //audio5.volume=0.4;
  //audio5.play();
  document.getElementById('mewsic').loop=true;
  document.getElementById('mewsic').volume=0.3;
  document.getElementById('mewsic').play();
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  //score++;
  //document.querySelector(".score").textContent = score;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  score += 1;
  audio4.play();
  document.querySelector(".score").textContent = score;

  if (score === 9) {
    showWinMessage();
  }

  resetBoard();
}

function showWinMessage() {
  // Display the win message
  document.getElementById('win-message').style.display = 'flex';
  // Optionally, hide the grid to focus on the win message
  document.querySelector(".grid-container").style.display = 'none';
}

function goToQ() {
  // Display the win message
  document.getElementById('q-message').style.display = 'flex';
  // Optionally, hide the grid to focus on the win message
  document.getElementById('win-message').style.display = 'none';
}

function showYay() {
  // Display the win message
  document.getElementById('yay-message').style.display = 'flex';
  // Optionally, hide the grid to focus on the win message
  document.getElementById('q-message').style.display = 'none';
}

function unflipCards() {
  setTimeout(() => {
    audio3.play();
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
  // Hide the win message and show the grid again
  document.getElementById('win-message').style.display = 'none';
  document.getElementById('q-message').style.display = 'none';
  document.getElementById('yay-message').style.display = 'none';
  document.querySelector(".grid-container").style.display = 'grid';
}

// Sounds
var audio = new Audio('./Sounds/no.mp3');
var audio2 = new Audio('./Sounds/kissman.mp3');
var audio3 = new Audio('./Sounds/womp.mp3');
var audio4 = new Audio('./Sounds/correct.mp3');
var audio5 = new Audio('./Sounds/numbsong.mp3');


// Tina sound bobs burgers
function playFunnyMusic() {
  audio2.play();
}

function moveRandomEl(elm) {
  elm.style.position = "absolute";
  elm.style.top = Math.floor(Math.random() * 90 + 5) + "%";
  elm.style.left = Math.floor(Math.random() * 90 + 5) + "%";
}

const moveRandom = document.querySelector("#move-random");

moveRandom.addEventListener("mouseenter", function (e) {
  audio.play();
  moveRandomEl(e.target);
});
