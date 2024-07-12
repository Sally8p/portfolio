document.addEventListener("DOMContentLoaded", () => {
  // 홈 버튼 클릭 시 메인 페이지로 이동
  const homeButton = document.querySelector("#home-button");
  homeButton.addEventListener("click", () => {
    window.location.href = "../../index.html#mainPage";
  });

  // 게임 시작 버튼 및 다시 시작 버튼, 모달 창, 게임 지침 요소 가져오기
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const gameOverModal = document.getElementById("game-over-modal");
  const gameInstructions = document.getElementById("game-instructions");

  // 게임 시간 표시를 위한 요소 생성
  const gameTime = document.createElement("div");
  gameTime.id = "game-time";
  document.body.appendChild(gameTime);

  // 캔버스와 2D 컨텍스트 가져오기
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  // 화면 크기에 따라 요소 크기 조정
  const isSmallScreen = window.innerWidth <= 375 && window.innerHeight <= 900;
  const canvasWidth = isSmallScreen ? 350 : 650;
  const canvasHeight = isSmallScreen ? 250 : 450;

  // 캔버스 크기 설정
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // 요소의 비율 계산
  const scale = canvasWidth / 650; // 원래 캔버스 크기에 대한 비율
  const ballRadius = 9 * scale;
  const paddleHeight = 12 * scale;
  const paddleWidth = 72 * scale;
  const rowCount = 5;
  const columnCount = 9;
  const brickWidth = 54 * scale;
  const brickHeight = 18 * scale;
  const brickPadding = 12 * scale;
  const topOffset = 60 * scale; // 블럭을 조금 내리기 위해 topOffset 조정
  const leftOffset = 33 * scale;

  let x, y, dx, dy, paddleX, score, intervalId, timeElapsed, timeIntervalId;
  let bricks = [];

  // 게임 변수 초기화 함수
  function initVariables() {
    x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3);
    y = canvas.height - 40 * scale;
    dx = 2 * scale;
    dy = -2 * scale;
    paddleX = (canvas.width - paddleWidth) / 2;
    score = 0;
    timeElapsed = 0;

    // 벽돌 배열 초기화
    bricks = [];
    for (let c = 0; c < columnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < rowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
  }

  // 마우스 이동 이벤트 처리기
  window.addEventListener("mousemove", mouseMoveHandler, false);
  canvas.addEventListener("mouseenter", () => {
    canvas.style.cursor = "none";
  });

  // 터치 이벤트 추가
  canvas.addEventListener("touchstart", touchMoveHandler, false);
  canvas.addEventListener("touchmove", touchMoveHandler, false);

  // 마우스 이동 처리기
  function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.getBoundingClientRect().left;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth / 2;
    }
  }

  // 터치 이동 처리기
  function touchMoveHandler(e) {
    var relativeX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth / 2;
    }
    e.preventDefault();
  }

  // 패들 그리기 함수
  function drawPaddle() {
    ctx.beginPath();
    ctx.roundRect(
      paddleX,
      canvas.height - paddleHeight,
      paddleWidth,
      paddleHeight,
      30
    );
    ctx.fillStyle = "#333";
    ctx.fill();
    ctx.closePath();
  }

  // 공 그리기 함수
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#ff6200";
    ctx.fill();
    ctx.closePath();
  }

  // 벽돌 그리기 함수
  function drawBricks() {
    for (let c = 0; c < columnCount; c++) {
      for (let r = 0; r < rowCount; r++) {
        if (bricks[c][r].status === 1) {
          let brickX = c * (brickWidth + brickPadding) + leftOffset;
          let brickY = r * (brickHeight + brickPadding) + topOffset;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 30);
          ctx.fillStyle = "#333";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  // 점수 추적 함수
  function trackScore() {
    ctx.font = "bold 16px ONE-Mobile-POP";
    ctx.fillStyle = "#333";
    ctx.fillText("Score: " + score, 8, 24);
    ctx.fillText("시간: " + timeElapsed + "초", canvas.width - 80, 24);
  }

  // 충돌 감지 함수
  function hitDetection() {
    for (let c = 0; c < columnCount; c++) {
      for (let r = 0; r < rowCount; r++) {
        let b = bricks[c][r];
        if (b.status === 1) {
          if (
            x > b.x &&
            x < b.x + brickWidth &&
            y > b.y &&
            y < b.y + brickHeight
          ) {
            dy = -dy;
            b.status = 0;
            score++;
            if (score === rowCount * columnCount) {
              gameOver("게임 종료!!!");
            }
          }
        }
      }
    }
  }

  // 게임 오버 처리 함수
  function gameOver(message) {
    clearInterval(intervalId);
    clearInterval(timeIntervalId);
    showModal(message);
  }

  // 모달 창 표시 함수
  function showModal(message) {
    document.querySelector(".modal-content h2").textContent = message;
    gameOverModal.style.display = "flex";
  }

  // 모달 창 닫기 함수
  function closeModal() {
    gameOverModal.style.display = "none";
  }

  // 시간 업데이트 함수
  function updateTime() {
    timeElapsed++;
    if (timeElapsed % 10 === 0) {
      dx += (dx > 0 ? 1 : -1) * 0.2;
      dy += (dy > 0 ? 1 : -1) * 0.2;
    }
  }

  // 게임 초기화 및 렌더링 함수
  function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trackScore();
    drawBricks();
    drawBall();
    drawPaddle();
    hitDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }

    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        gameOver("게임 종료!! 🥺");
      }
    }

    x += dx;
    y += dy;
  }

  // 게임 시작 함수
  function startGame() {
    startButton.style.display = "none";
    canvas.style.display = "block";
    gameInstructions.style.display = "block";
    initVariables();
    intervalId = setInterval(init, 10);
    timeIntervalId = setInterval(updateTime, 1000);
  }

  // 게임 재시작 함수
  function restartGame() {
    closeModal();
    startGame();
  }

  // 이벤트 리스너 추가
  startButton.addEventListener("click", startGame);
  restartButton.addEventListener("click", restartGame);

  // 초기 상태에서 캔버스와 게임 지침 숨기기
  canvas.style.display = "none";
  gameInstructions.style.display = "none";
});
