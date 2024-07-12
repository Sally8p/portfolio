document.addEventListener("DOMContentLoaded", () => {
  // 홈 버튼 클릭 시 메인 페이지로 이동
  const homeButton = document.querySelector("#home-button");
  homeButton.addEventListener("click", () => {
    window.location.href = "../../index.html#mainPage";
  });

  // 게임 시작 버튼 및 모달 창 요소 가져오기
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const gameOverModal = document.getElementById("game-over-modal");
  const gameInstructions = document.getElementById("game-instructions");

  // 게임 시간 표시를 위한 요소 생성
  const gameTime = document.createElement("div");
  gameTime.id = "game-time";
  document.body.appendChild(gameTime);

  // 게임에 필요한 변수들 초기화
  let canvas = document.getElementById("game"),
    ctx = canvas.getContext("2d"),
    ballRadius = 9,
    x,
    y,
    dx = 2,
    dy = -2,
    paddleHeight = 12,
    paddleWidth = 72,
    paddleX,
    rowCount = 5,
    columnCount = 9,
    brickWidth = 54,
    brickHeight = 18,
    brickPadding = 12,
    topOffset = 40,
    leftOffset = 33,
    score = 0,
    intervalId,
    timeElapsed = 0,
    timeIntervalId;

  // 벽돌 배열 초기화
  let bricks = [];
  for (let c = 0; c < columnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < rowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

  // 마우스 이동 이벤트 처리
  window.addEventListener("mousemove", mouseMoveHandler, false);
  canvas.addEventListener("mouseenter", () => {
    canvas.style.cursor = "none";
  });

  function mouseMoveHandler(e) {
    // 캔버스 내 마우스의 상대적 x 좌표 계산
    var relativeX = e.clientX - canvas.getBoundingClientRect().left;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth / 2; // 패들 위치 설정
    }
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
    ctx.fillStyle = "#333"; // 패들 색상 설정
    ctx.fill();
    ctx.closePath();
  }

  // 공 그리기 함수
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#ff6200"; // 공 색상 설정
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
          ctx.fillStyle = "#333"; // 벽돌 색상 설정
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  // 점수와 시간을 표시하는 함수
  function trackScore() {
    ctx.font = "bold 16px ONE-Mobile-POP";
    ctx.fillStyle = "#333";
    ctx.fillText("Score: " + score, 8, 24);
    ctx.fillText("시간: " + timeElapsed + "초", canvas.width - 80, 24); // 시간 표시 추가
  }

  // 벽돌과 공의 충돌을 감지하는 함수
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
            dy = -dy; // 공의 방향 반전
            b.status = 0; // 벽돌 제거
            score++; // 점수 증가
            if (score === rowCount * columnCount) {
              gameOver("게임 종료!!!"); // 모든 벽돌을 깬 경우
            }
          }
        }
      }
    }
  }

  // 게임 종료 처리 함수
  function gameOver(message) {
    clearInterval(intervalId); // 게임 루프 중지
    clearInterval(timeIntervalId); // 시간 인터벌 중지
    showModal(message); // 모달 창 표시
  }

  // 모달 창을 표시하는 함수
  function showModal(message) {
    document.querySelector(".modal-content h2").textContent = message;
    gameOverModal.style.display = "flex";
  }

  // 모달 창을 닫는 함수
  function closeModal() {
    gameOverModal.style.display = "none";
  }

  // 게임 초기화 함수
  function initGame() {
    x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3);
    y = canvas.height - 40;
    dx = 2;
    dy = -2;
    paddleX = (canvas.width - paddleWidth) / 2;
    score = 0;
    timeElapsed = 0;

    for (let c = 0; c < columnCount; c++) {
      for (let r = 0; r < rowCount; r++) {
        bricks[c][r].status = 1;
      }
    }
  }

  // 시간 업데이트 및 공 속도 증가 함수
  function updateTime() {
    timeElapsed++;
    if (timeElapsed % 10 === 0) {
      dx += (dx > 0 ? 1 : -1) * 0.2; // x 방향 속도 증가
      dy += (dy > 0 ? 1 : -1) * 0.2; // y 방향 속도 증가
    }
  }

  // 게임 루프 함수
  function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
    trackScore(); // 점수 및 시간 표시
    drawBricks(); // 벽돌 그리기
    drawBall(); // 공 그리기
    drawPaddle(); // 패들 그리기
    hitDetection(); // 충돌 감지

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx; // 공이 좌우 벽에 닿으면 방향 반전
    }

    if (y + dy < ballRadius) {
      dy = -dy; // 공이 천장에 닿으면 방향 반전
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy; // 공이 패들에 닿으면 방향 반전
      } else {
        gameOver("게임 종료!! 🥺"); // 공이 바닥에 닿으면 게임 종료
      }
    }

    x += dx; // 공의 x 좌표 업데이트
    y += dy; // 공의 y 좌표 업데이트
  }

  // 게임 시작 함수
  function startGame() {
    startButton.style.display = "none"; // 시작 버튼 숨기기
    canvas.style.display = "block"; // 캔버스 보이기
    gameInstructions.style.display = "block"; // '게임 방법' 보이기
    initGame(); // 게임 초기화
    intervalId = setInterval(init, 10); // 게임 루프 시작
    timeIntervalId = setInterval(updateTime, 1000); // 1초마다 시간 업데이트
  }

  // 게임 재시작 함수
  function restartGame() {
    closeModal(); // 모달 창 닫기
    startGame(); // 게임 시작
  }

  // 이벤트 리스너 추가
  startButton.addEventListener("click", startGame); // 시작 버튼 클릭 시 게임 시작
  restartButton.addEventListener("click", restartGame); // 다시하기 버튼 클릭 시 게임 재시작

  // 캔버스 초기화
  canvas.style.display = "none"; // 캔버스 숨기기
  gameInstructions.style.display = "none"; // ‘게임 방법’ 숨기기
});
