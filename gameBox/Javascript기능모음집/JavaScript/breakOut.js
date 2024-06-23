let canvas = document.getElementById("game"), // 게임 캔버스 요소 가져오기
  ctx = canvas.getContext("2d"), // 2D 렌더링 컨텍스트 가져오기
  ballRadius = 9, // 공의 반지름
  x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3), // 공의 초기 x 좌표
  y = canvas.height - 40, // 공의 초기 y 좌표
  dx = 2, // x 방향 속도
  dy = -2; // y 방향 속도

let paddleHeight = 12, // 패들 높이
  paddleWidth = 72; // 패들 너비

// 패들 초기 위치
let paddleX = (canvas.width - paddleWidth) / 2;

// 벽돌
let rowCount = 5, // 행 수
  columnCount = 9, // 열 수
  brickWidth = 54, // 벽돌 너비
  brickHeight = 18, // 벽돌 높이
  brickPadding = 12, // 벽돌 간격
  topOffset = 40, // 상단 간격
  leftOffset = 33, // 좌측 간격
  score = 0; // 점수

// 벽돌 배열
let bricks = [];
for (let c = 0; c < columnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < rowCount; r++) {
    // 벽돌 위치 설정
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// 마우스 이동 이벤트 및 함수
document.addEventListener("mousemove", mouseMoveHandler, false);

// 마우스로 패들 이동
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

// 패들 그리기
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

// 공 그리기
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#333";
  ctx.fill();
  ctx.closePath();
}

// 벽돌 그리기
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

// 점수 표시
function trackScore() {
  ctx.font = "bold 16px sans-serif";
  ctx.fillStyle = "#333";
  ctx.fillText("Score : " + score, 8, 24);
}

// 공이 벽돌에 맞았는지 확인
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
          // 승리 확인
          if (score === rowCount * columnCount) {
            alert("You Win!");
            document.location.reload();
          }
        }
      }
    }
  }
}

// 메인 함수
function init() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  trackScore();
  drawBricks();
  drawBall();
  drawPaddle();
  hitDetection();

  // 왼쪽과 오른쪽 벽 감지
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  // 상단 벽 감지
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    // 패들 충돌 감지
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      // 만약 공이 패들에 닿지 않았을 경우
      alert("Game Over!");
      document.location.reload();
    }
  }

  // 하단 벽
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  // 공 이동
  x += dx;
  y += dy;
}

setInterval(init, 10);
