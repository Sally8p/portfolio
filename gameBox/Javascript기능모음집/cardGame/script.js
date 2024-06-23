document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const restartButton = document.getElementById("restartButton");
  const gameBoard = document.getElementById("gameBoard");
  const timerDisplay = document.getElementById("timer");
  const gameOverIframe = document.getElementById("gameOverIframe");
  const gameIframe = document.getElementById("gameIframe");
  let cards = [];
  let flippedCards = [];
  let matchedCards = [];
  let timer;
  let startTime;

  const images = [
    "/Users/sallypapa/Desktop/Vue/km_portfolio/portfolio/cardGame/img/chick.png",
    "/Users/sallypapa/Desktop/Vue/km_portfolio/portfolio/cardGame/img/cow.png",
    "/Users/sallypapa/Desktop/Vue/km_portfolio/portfolio/cardGame/img/dolphin.png",
    "/Users/sallypapa/Desktop/Vue/km_portfolio/portfolio/cardGame/img/frog.png",
    "/Users/sallypapa/Desktop/Vue/km_portfolio/portfolio/cardGame/img/horse.png",
    "/Users/sallypapa/Desktop/Vue/km_portfolio/portfolio/cardGame/img/pig.png",
    "/Users/sallypapa/Desktop/Vue/km_portfolio/portfolio/cardGame/img/porcupine.png",
    "/Users/sallypapa/Desktop/Vue/km_portfolio/portfolio/cardGame/img/rabbit.png",
    "/Users/sallypapa/Desktop/Vue/km_portfolio/portfolio/cardGame/img/rat-head.png",
    "/Users/sallypapa/Desktop/Vue/km_portfolio/portfolio/cardGame/img/squid.png",
    "/Users/sallypapa/Desktop/Vue/km_portfolio/portfolio/cardGame/img/tiger.png",
    "/Users/sallypapa/Desktop/Vue/km_portfolio/portfolio/cardGame/img/whale.png",
  ];

  const createCardElement = (card, imgSrc) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.card = card;
    cardElement.innerHTML = `
            <div class="card-face card-front"></div>
            <div class="card-face card-back"><img src="${imgSrc}" alt="card image"></div>
        `;
    cardElement.addEventListener("click", flipCard);
    return cardElement;
  };

  const shuffleCards = () => {
    const cardValues = Array.from({ length: 12 }, (_, i) => i + 1);
    const allCards = [...cardValues, ...cardValues];
    return allCards.sort(() => Math.random() - 0.5);
  };

  const startGame = () => {
    cards = shuffleCards();
    gameBoard.innerHTML = "";
    cards.forEach((card, index) => {
      const cardElement = createCardElement(card, images[index % 12]);
      gameBoard.appendChild(cardElement);
    });

    setTimeout(() => {
      document
        .querySelectorAll(".card")
        .forEach(card => card.classList.add("flipped"));
      setTimeout(() => {
        document
          .querySelectorAll(".card")
          .forEach(card => card.classList.remove("flipped"));
      }, 2000);
    }, 0);

    startButton.style.display = "none";
    gameIframe.style.display = "none";
    gameOverIframe.style.display = "none";
    restartButton.style.display = "none";
    timerDisplay.style.display = "block";
    gameBoard.style.display = "grid";
    startTime = new Date();
    timer = setInterval(updateTimer, 1000);
  };

  const updateTimer = () => {
    const currentTime = new Date();
    const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
    timerDisplay.textContent = `${elapsedSeconds}초`;
  };

  const flipCard = event => {
    const card = event.currentTarget;
    if (
      flippedCards.length < 2 &&
      !card.classList.contains("flipped") &&
      !matchedCards.includes(card)
    ) {
      card.classList.add("flipped");
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        checkForMatch();
      }
    }
  };

  const checkForMatch = () => {
    const [card1, card2] = flippedCards;
    if (card1.dataset.card === card2.dataset.card) {
      matchedCards.push(card1, card2);
      flippedCards = [];
      if (matchedCards.length === cards.length) {
        clearInterval(timer);
        setTimeout(() => {
          gameOverIframe.style.display = "block";
          restartButton.style.display = "block";
          gameBoard.style.display = "none";
          timerDisplay.textContent += " 걸렸습니다.";
        }, 500);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = [];
      }, 1000);
    }
  };

  startButton.addEventListener("click", startGame);
  restartButton.addEventListener("click", startGame);
});
