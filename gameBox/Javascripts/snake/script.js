document.addEventListener("DOMContentLoaded", () => {
  // 홈 버튼 클릭 이벤트 리스너 추가
  const homeButton = document.querySelector("#home-button");
  homeButton.addEventListener("click", () => {
    window.location.href = "../../index.html#mainPage";
  });
});

// 캔버스 요소와 컨텍스트 가져오기
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 점수 표시할 곳을 가져오기
const scoreDisplay = document.getElementById("score");

// 시작 화면과 게임 화면 가져오기
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const controls = document.getElementById("gameControls");

// 점수 기록을 표시할 요소 가져오기
const scoreHistory = document.getElementById("score-modal-result");

// 모달 요소 가져오기
const resultModal = document.getElementById("result-modal");
const modalResult = document.getElementById("modal-result");
const closeModalButton = document.getElementById("close-modal-button");
const scoreModal = document.getElementById("score-modal");
const closeScoreModalButton = document.getElementById(
  "close-score-modal-button"
);

// 게임 속성 정의
const gridSize = 20; // 그리드 하나의 크기 (20 픽셀)
const tileCount = 30; // 그리드의 타일 개수 (30개)

// 캔버스 크기 설정
canvas.width = canvas.height = gridSize * tileCount;

// 게임 상태 변수 정의
let snake, food, score, isGameOver;
let isModalOpen = false;
const scoreRecords = [];

// 뱀의 이동 방향 정의
const directions = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

// 현재 방향과 다음 방향 초기화
let currentDirection = directions.ArrowRight;
let nextDirection = currentDirection;

// 키보드 입력 이벤트 리스너 추가
document.addEventListener("keydown", e => {
  if (isModalOpen) {
    if (e.key === "Enter") {
      closeModal();
    }
  } else {
    if (
      directions[e.key] &&
      (currentDirection.x !== -directions[e.key].x ||
        currentDirection.y !== -directions[e.key].y)
    ) {
      nextDirection = directions[e.key];
    }

    // 엔터 키로 게임 시작 및 다시 시작
    if (e.key === "Enter") {
      if (startScreen.style.display !== "none") {
        startGame();
      } else if (controls.style.display === "flex") {
        resetGame();
      }
    }
  }
});

// 게임 시작 함수
function startGame() {
  startScreen.style.display = "none"; // 시작 화면 숨기기
  gameScreen.style.display = "block"; // 게임 화면 보이기
  resetGame();
}

// 게임 초기화 함수
function resetGame() {
  if (scoreRecords.length > 0 || score !== undefined) {
    scoreRecords.push(score); // 이전 점수 기록 저장
    updateScoreHistory(); // 점수 기록 업데이트
  }
  snake = [{ x: 15, y: 15 }]; // 뱀의 시작 위치
  currentDirection = directions.ArrowRight; // 시작 방향
  nextDirection = currentDirection;
  score = 0; // 점수 초기화
  isGameOver = false; // 게임 오버 상태 초기화
  scoreDisplay.textContent = score; // 점수 표시 초기화
  spawnFood();
  controls.style.display = "none"; // 다시 시작 버튼 숨기기
  resultModal.style.display = "none"; // 모달 숨기기
  isModalOpen = false;
  gameLoop();
}

// 음식 생성 함수
function spawnFood() {
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };
}

// 게임 루프 함수
function gameLoop() {
  if (isGameOver) {
    setTimeout(() => {
      showModal(`게임 종료!! 당신은 ${score}개의 음식을 먹었습니다! 🥳`);
      controls.style.display = "flex"; // 게임 종료 후 다시 시작 버튼 표시
    }, 100);
    return;
  }

  setTimeout(() => {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    drawGrid();
    gameLoop();
  }, 70); // 뱀의 속도를 느리게 설정
}

// 캔버스 지우기 함수
function clearCanvas() {
  ctx.fillStyle = "#232332";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 그리드 그리기 함수
function drawGrid() {
  ctx.strokeStyle = "#444";
  ctx.lineWidth = 1;
  for (let i = 0; i < tileCount; i++) {
    ctx.beginPath();
    ctx.moveTo(i * gridSize, 0);
    ctx.lineTo(i * gridSize, canvas.height);
    ctx.moveTo(0, i * gridSize);
    ctx.lineTo(canvas.width, i * gridSize);
    ctx.stroke();
  }
}

// 음식 그리기 함수
function drawFood() {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(
    food.x * gridSize + gridSize / 2,
    food.y * gridSize + gridSize / 2,
    gridSize / 2,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

// 뱀 그리기 함수
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "white";
    ctx.beginPath();
    ctx.arc(
      snake[i].x * gridSize + gridSize / 2,
      snake[i].y * gridSize + gridSize / 2,
      gridSize / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}

// 뱀 이동 함수
function moveSnake() {
  const head = { ...snake[0] };
  currentDirection = nextDirection;
  head.x += currentDirection.x;
  head.y += currentDirection.y;

  if (
    head.x < 0 ||
    head.x >= tileCount ||
    head.y < 0 ||
    head.y >= tileCount ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    isGameOver = true;
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = score;
    spawnFood();
  } else {
    snake.pop();
  }
}

// 모달 표시 함수
function showModal(message) {
  modalResult.innerHTML = message;
  resultModal.style.display = "flex";
  isModalOpen = true;
}

// 모달 닫기 함수
function closeModal() {
  resultModal.style.display = "none";
  isModalOpen = false;
}

// 점수 기록 업데이트 함수
function updateScoreHistory() {
  scoreHistory.innerHTML = scoreRecords
    .map((score, index) => `<div>${index + 1}. 먹은 갯수: ${score}개 🍫</div>`)
    .join("");
}

// 점수 기록 모달 표시 함수
function showResults() {
  scoreModal.style.display = "flex";
  isModalOpen = true;
}

// 점수 기록 모달 닫기 함수
function closeScoreModal() {
  scoreModal.style.display = "none";
  isModalOpen = false;
}

closeModalButton.addEventListener("click", () => {
  closeModal();
});

closeScoreModalButton.addEventListener("click", () => {
  closeScoreModal();
});

window.addEventListener("click", event => {
  if (event.target == resultModal) {
    closeModal();
  }
  if (event.target == scoreModal) {
    closeScoreModal();
  }
});
