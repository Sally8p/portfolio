document.addEventListener("DOMContentLoaded", () => {
  // 가위바위보 선택지
  const choices = ["rock", "paper", "scissors"];

  // DOM 요소 가져오기
  const game = document.getElementById("game");
  const modal = document.getElementById("result-modal");
  const historyModal = document.getElementById("history-modal");
  const closeButton = document.querySelector(".close-button");
  const closeHistoryButton = document.querySelector(".close-history-button");
  const resultDiv = document.getElementById("result");
  const computerChoiceDiv = document.getElementById("computer-choice");
  const playerChoiceDiv = document.createElement("div");
  playerChoiceDiv.id = "player-choice";
  const computerImage = document.getElementById("computer-image");
  const historyDiv = document.getElementById("history");
  const homeButton = document.querySelector("#home-button");
  const historyButton = document.getElementById("history-button");
  const winCountSpan = document.getElementById("win-count");
  const drawCountSpan = document.getElementById("draw-count");
  const loseCountSpan = document.getElementById("lose-count");

  // 게임 기록 및 통계 변수 초기화
  let history = [];
  let computerChoiceInterval;
  let totalGames = 0;
  let winCount = 0;
  let drawCount = 0;
  let loseCount = 0;

  // 페이지 로드 시 모달을 숨김
  modal.style.display = "none";
  historyModal.style.display = "none";

  // 홈 버튼 클릭 시 메인 페이지로 이동
  homeButton.addEventListener("click", () => {
    window.location.href = "../../index.html#mainPage";
  });

  // 결과 기록 보기 버튼 클릭 시 기록 모달 표시
  historyButton.addEventListener("click", () => {
    displayHistory();
    historyModal.style.display = "flex";
  });

  // 결과 모달 닫기 버튼 클릭 시 모달 닫기
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
    startComputerChoice();
  });

  // 기록 모달 닫기 버튼 클릭 시 모달 닫기
  closeHistoryButton.addEventListener("click", () => {
    historyModal.style.display = "none";
  });

  // 모달 외부 클릭 시 모달 닫기
  window.addEventListener("click", event => {
    if (event.target === modal) {
      modal.style.display = "none";
      startComputerChoice();
    }
    if (event.target === historyModal) {
      historyModal.style.display = "none";
    }
  });

  // 랜덤으로 가위, 바위, 보 중 하나를 선택
  function getRandomChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
  }

  // 승자를 결정하는 함수
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

  // 선택한 이미지로 카드 이미지를 업데이트하는 함수
  function updateCardImage(card, choice) {
    const images = {
      rock: "./img/rock.png",
      paper: "./img/paper.png",
      scissors: "./img/scissors.png",
    };
    card.src = images[choice];
  }

  // 결과를 표시하는 함수
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

    // 게임 기록 업데이트
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

    // 통계 업데이트
    totalGames++;
    if (result === "win") {
      winCount++;
    } else if (result === "draw") {
      drawCount++;
    } else if (result === "lose") {
      loseCount++;
    }

    // 결과 모달 표시
    modal.style.display = "flex";
  }

  // 게임 기록을 표시하는 함수
  function displayHistory() {
    historyDiv.innerHTML = history
      .map(
        (entry, index) =>
          `<div>${index + 1}. 플레이어: ${entry.player}, 컴퓨터: ${
            entry.computer
          }, 결과: ${entry.result}</div>`
      )
      .join("");

    // 통계를 업데이트하여 기록 모달에 표시
    winCountSpan.innerText = winCount;
    drawCountSpan.innerText = drawCount;
    loseCountSpan.innerText = loseCount;
  }

  // 컴퓨터의 선택 애니메이션을 시작하는 함수
  function startComputerChoice() {
    computerChoiceInterval = setInterval(() => {
      const choice = getRandomChoice();
      updateCardImage(computerImage, choice);
    }, 100);
  }

  // 컴퓨터의 선택 애니메이션을 중지하는 함수
  function stopComputerChoice() {
    clearInterval(computerChoiceInterval);
  }

  // 가위바위보 버튼 클릭 시 게임 로직 처리
  game.addEventListener("click", event => {
    if (!event.target.classList.contains("choice")) return;

    stopComputerChoice();

    const playerChoice = event.target.id.replace("-button", "");
    const computerChoice = getRandomChoice();
    const result = determineWinner(playerChoice, computerChoice);

    showResult(playerChoice, computerChoice, result);
  });

  // 초기 애니메이션 시작
  startComputerChoice();
});
