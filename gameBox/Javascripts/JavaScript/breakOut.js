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
  const gameInstructions = document.getElementById("game-instructions"); // '게임 방법' 요소 선택

  let canvas = document.getElementById("game"), // 게임 캔버스 요소 가져오기
    ctx = canvas.getContext("2d"), // 2D 렌더링 컨텍스트 가져오기
    ballRadius = 9, // 공의 반지름
    x, // 공의 초기 x 좌표
    y, // 공의 초기 y 좌표
    dx = 2, // x 방향 속도
    dy = -2, // y 방향 속도
    paddleHeight = 12, // 패들 높이
    paddleWidth = 72, // 패들 너비
    paddleX, // 패들 초기 위치
    rowCount = 5, // 행 수
    columnCount = 9, // 열 수
    brickWidth = 54, // 벽돌 너비
    brickHeight = 18, // 벽돌 높이
    brickPadding = 12, // 벽돌 간격
    topOffset = 40, // 상단 간격
    leftOffset = 33, // 좌측 간격
    score = 0, // 점수
    intervalId; // setInterval을 저장할 변수

  // 벽돌 배열 초기화
  let bricks = [];
  for (let c = 0; c < columnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < rowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 }; // 각 벽돌의 초기 상태 설정
    }
  }

  // 마우스 이동 이벤트 및 함수
  window.addEventListener("mousemove", mouseMoveHandler, false);

  function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.getBoundingClientRect().left; // 캔버스 내 마우스의 상대적 x 좌표
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
    ); // 패들 모양 설정
    ctx.fillStyle = "#333"; // 패들 색상 설정
    ctx.fill(); // 패들 색 채우기
    ctx.closePath();
  }

  // 공 그리기 함수
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2); // 공 모양 설정
    ctx.fillStyle = "#ff6200"; // 공 색상 설정
    ctx.fill(); // 공 색 채우기
    ctx.closePath();
  }

  // 벽돌 그리기 함수
  function drawBricks() {
    for (let c = 0; c < columnCount; c++) {
      for (let r = 0; r < rowCount; r++) {
        if (bricks[c][r].status === 1) {
          // 벽돌이 존재하는 경우에만 그리기
          let brickX = c * (brickWidth + brickPadding) + leftOffset; // 벽돌의 x 좌표 설정
          let brickY = r * (brickHeight + brickPadding) + topOffset; // 벽돌의 y 좌표 설정
          bricks[c][r].x = brickX; // 벽돌의 x 좌표 저장
          bricks[c][r].y = brickY; // 벽돌의 y 좌표 저장
          ctx.beginPath();
          ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 30); // 벽돌 모양 설정
          ctx.fillStyle = "#333"; // 벽돌 색상 설정
          ctx.fill(); // 벽돌 색 채우기
          ctx.closePath();
        }
      }
    }
  }

  // 점수 표시 함수
  function trackScore() {
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "#333";
    ctx.fillText("Score : " + score, 8, 24);
  }

  // 공이 벽돌에 맞았는지 확인하는 함수
  function hitDetection() {
    for (let c = 0; c < columnCount; c++) {
      for (let r = 0; r < rowCount; r++) {
        let b = bricks[c][r];
        if (b.status === 1) {
          // 벽돌이 존재하는 경우
          if (
            x > b.x &&
            x < b.x + brickWidth &&
            y > b.y &&
            y < b.y + brickHeight
          ) {
            dy = -dy; // 공의 방향 반전
            b.status = 0; // 벽돌 상태 변경 (제거)
            score++; // 점수 증가
            if (score === rowCount * columnCount) {
              // 모든 벽돌을 깬 경우
              gameOver("You Win!"); // 게임 종료
            }
          }
        }
      }
    }
  }

  // 게임 종료 처리 함수
  function gameOver(message) {
    clearInterval(intervalId); // 게임 루프 중지
    showModal(message); // 모달 창 표시
  }

  // 모달 창 표시 함수
  function showModal(message) {
    document.querySelector(".modal-content h2").textContent = message; // 모달 창 메시지 설정
    gameOverModal.style.display = "flex"; // 모달 창 보이기
  }

  // 모달 창 닫기 함수
  function closeModal() {
    gameOverModal.style.display = "none"; // 모달 창 숨기기
  }

  // 게임 초기화 함수
  function initGame() {
    x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3); // 공의 초기 x 좌표 설정
    y = canvas.height - 40; // 공의 초기 y 좌표 설정
    dx = 2; // 공의 x 방향 속도 초기화
    dy = -2; // 공의 y 방향 속도 초기화
    paddleX = (canvas.width - paddleWidth) / 2; // 패들의 초기 위치 설정
    score = 0; // 점수 초기화

    for (let c = 0; c < columnCount; c++) {
      for (let r = 0; r < rowCount; r++) {
        bricks[c][r].status = 1; // 모든 벽돌 상태 초기화
      }
    }
  }

  // 메인 함수 (게임 루프)
  function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
    trackScore(); // 점수 표시
    drawBricks(); // 벽돌 그리기
    drawBall(); // 공 그리기
    drawPaddle(); // 패들 그리기
    hitDetection(); // 공과 벽돌 충돌 감지

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
