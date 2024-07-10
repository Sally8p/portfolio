const choices = ["rock", "paper", "scissors"];
const game = document.getElementById("game");
const modal = document.getElementById("result-modal");
const historyModal = document.getElementById("history-modal");
const closeButton = document.querySelector(".close-button");
const closeHistoryButton = document.querySelector(".close-history-button");
const resultDiv = document.getElementById("result");
const computerChoiceDiv = document.getElementById("computer-choice");
const playerChoiceDiv = document.createElement("div");
playerChoiceDiv.id = "player-choice"; // ID 추가
const computerImage = document.getElementById("computer-image");
const historyDiv = document.getElementById("history");
const homeButton = document.querySelector("#home-button");
const historyButton = document.getElementById("history-button");
const winCountSpan = document.getElementById("win-count");
const drawCountSpan = document.getElementById("draw-count");
const loseCountSpan = document.getElementById("lose-count");

let history = [];
let computerChoiceInterval;
let totalGames = 0;
let winCount = 0;
let drawCount = 0;
let loseCount = 0;

homeButton.addEventListener("click", () => {
  window.location.href = "../../index.html#mainPage";
});

historyButton.addEventListener("click", () => {
  displayHistory();
  historyModal.style.display = "block";
});

closeButton.addEventListener("click", () => {
  modal.style.display = "none";
  startComputerChoice();
});

closeHistoryButton.addEventListener("click", () => {
  historyModal.style.display = "none";
});

window.addEventListener("click", event => {
  if (event.target === modal) {
    modal.style.display = "none";
    startComputerChoice();
  }
  if (event.target === historyModal) {
    historyModal.style.display = "none";
  }
});

function getRandomChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(player, computer) {
  if (player === computer) {
    return "draw";
  }
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "win";
  }
  return "lose";
}

function updateCardImage(card, choice) {
  const images = {
    rock: "./img/rock.png",
    paper: "./img/paper.png",
    scissors: "./img/scissors.png",
  };
  card.src = images[choice];
}

function showResult(playerChoice, computerChoice, result) {
  const choiceNames = {
    rock: "✊🏻 바위",
    paper: "✋🏻 보",
    scissors: "✌🏻 가위",
  };

  updateCardImage(computerImage, computerChoice);

  playerChoiceDiv.innerHTML = `플레이어의 선택: ${choiceNames[playerChoice]}`;
  computerChoiceDiv.innerHTML = `컴퓨터의 선택: ${choiceNames[computerChoice]}`;
  resultDiv.innerHTML = `${
    result === "win"
      ? "🥳 승리!!"
      : result === "lose"
      ? "🥺 패배.."
      : "😎 무승부"
  }`;

  // 결과 모달에 플레이어 선택 추가
  modal.querySelector(".modal-content").appendChild(playerChoiceDiv);

  history.push({
    player: choiceNames[playerChoice],
    computer: choiceNames[computerChoice],
    result:
      result === "win"
        ? "승리 🥳"
        : result === "lose"
        ? "패배 🥺"
        : "무승부 😎",
  });

  totalGames++;
  if (result === "win") {
    winCount++;
  } else if (result === "draw") {
    drawCount++;
  } else if (result === "lose") {
    loseCount++;
  }

  modal.style.display = "block";
}

function displayHistory() {
  historyDiv.innerHTML = history
    .map(
      (entry, index) =>
        `<div>${index + 1}. 플레이어: ${entry.player}, 컴퓨터: ${
          entry.computer
        }, 결과: ${entry.result}</div>`
    )
    .join("");

  // 업데이트된 게임 통계를 결과 기록 모달에 표시
  winCountSpan.innerText = winCount;
  drawCountSpan.innerText = drawCount;
  loseCountSpan.innerText = loseCount;
}

function startComputerChoice() {
  computerChoiceInterval = setInterval(() => {
    const choice = getRandomChoice();
    updateCardImage(computerImage, choice);
  }, 100);
}

function stopComputerChoice() {
  clearInterval(computerChoiceInterval);
}

game.addEventListener("click", event => {
  if (!event.target.classList.contains("choice")) return;

  stopComputerChoice();

  const playerChoice = event.target.id.replace("-button", "");
  const computerChoice = getRandomChoice();
  const result = determineWinner(playerChoice, computerChoice);

  showResult(playerChoice, computerChoice, result);
});

startComputerChoice();
