document.addEventListener("DOMContentLoaded", () => {
  // 홈 버튼 클릭 이벤트 리스너 추가
  const homeButton = document.querySelector("#home-button");
  homeButton.addEventListener("click", () => {
    window.location.href = "../../index.html#mainPage";
  });
});

// 캔버스 요소와 2D 컨텍스트 가져오기
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 점수 표시할 요소 가져오기
const scoreDisplay = document.getElementById("score");

// 시작 화면과 게임 화면 요소 가져오기
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
const closeScoreModalButton = document.getElementById("close-score-modal-button");

// 게임 설정 값 정의
const gridSize = 20; // 그리드 하나의 크기 (20 픽셀)
const tileCount = 30; // 그리드의 타일 개수 (30개)

// 캔버스 크기 설정
canvas.width = canvas.height = gridSize * tileCount;

// 게임 상태 변수 정의
let snake, food, score, isGameOver, speed;
let isModalOpen = false;
const scoreRecords = [];
const initialSpeed = 100; // 초기 속도
const speedIncreaseInterval = 5; // 속도 증가 간격 (먹이 5개마다 속도 증가)
const speedIncreaseAmount = 5; // 속도 증가량

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
    // 모달이 열려 있는 상태에서 엔터키를 누르면 모달 닫기
    if (e.key === "Enter") {
      closeModal();
    }
  } else {
    // 방향키 입력에 따른 뱀의 이동 방향 변경
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
  resetGame(); // 게임 초기화
}

// 게임 초기화 함수
function resetGame() {
  if (score !== undefined) {
    // 이전 점수 기록 저장
    scoreRecords.push(score);
    updateScoreHistory(); // 점수 기록 업데이트
  }
  // 뱀의 시작 위치 설정
  snake = [{ x: 15, y: 15 }];
  currentDirection = directions.ArrowRight; // 시작 방향 설정
  nextDirection = currentDirection;
  score = 0; // 점수 초기화
  speed = initialSpeed; // 속도 초기화
  isGameOver = false; // 게임 오버 상태 초기화
  scoreDisplay.textContent = score; // 점수 표시 초기화
  spawnFood(); // 음식 생성
  controls.style.display = "none"; // 다시 시작 버튼 숨기기
  resultModal.style.display = "none"; // 모달 숨기기
  isModalOpen = false;
  gameLoop(); // 게임 루프 시작
}

// 음식 생성 함수
function spawnFood() {
  // 랜덤 위치에 음식 생성
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };
}

// 게임 루프 함수
function gameLoop() {
  if (isGameOver) {
    // 게임 오버 처리
    setTimeout(() => {
      scoreRecords.push(score); // 게임 종료 시 점수 기록 저장
      showModal(`게임 종료!! 당신은 ${score}개의 음식을 먹었습니다! 🥳`);
      controls.style.display = "flex"; // 게임 종료 후 다시 시작 버튼 표시
    }, 100);
    return;
  }

  // 게임 진행
  setTimeout(() => {
    clearCanvas(); // 캔버스 지우기
    drawFood(); // 음식 그리기
    moveSnake(); // 뱀 이동
    drawSnake(); // 뱀 그리기
    drawGrid(); // 그리드 그리기
    gameLoop(); // 게임 루프 반복
  }, speed);
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
    ctx.fillStyle = i === 0 ? "green" : "white"; // 뱀의 머리는 초록색, 몸통은 흰색
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
  const head = { ...snake[0] }; // 뱀의 머리 위치 복사
  currentDirection = nextDirection; // 다음 방향으로 변경
  head.x += currentDirection.x;
  head.y += currentDirection.y;

  // 벽이나 자기 자신과 충돌 시 게임 오버 처리
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

  snake.unshift(head); // 새로운 머리 추가

  // 음식 먹었을 때 처리
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = score;
    if (score % speedIncreaseInterval === 0) {
      speed -= speedIncreaseAmount; // 먹이를 2개 먹을 때마다 속도를 증가시킴 (속도 감소)
    }
    spawnFood(); // 새로운 음식 생성
  } else {
    snake.pop(); // 꼬리 제거
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
  updateScoreHistory(); // 결과보기 모달을 열기 전에 점수 기록을 업데이트
  scoreModal.style.display = "flex";
  isModalOpen = true;
}

// 점수 기록 모달 닫기 함수
function closeScoreModal() {
  scoreModal.style.display = "none";
isModalOpen = false;
}

// 모달 닫기 버튼 클릭 이벤트 리스너 추가
closeModalButton.addEventListener("click", () => {
closeModal();
});

// 점수 기록 모달 닫기 버튼 클릭 이벤트 리스너 추가
closeScoreModalButton.addEventListener("click", () => {
closeScoreModal();
});

// 모달 외부 클릭 시 모달 닫기 처리
window.addEventListener("click", event => {
if (event.target == resultModal) {
closeModal();
}
if (event.target == scoreModal) {
closeScoreModal();
}
});