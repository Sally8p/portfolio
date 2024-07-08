document.addEventListener("DOMContentLoaded", () => {
  const frame = document.querySelector("#frame");
  const statusDiv = document.querySelector("#status");
  const countDiv = document.querySelector("#count");
  const startButton = document.querySelector("#start-button");
  const homeButton = document.querySelector("#home-button");
  const resultModal = document.querySelector("#result-modal");
  const modalResult = document.querySelector("#modal-result");
  const modalRestartButton = document.querySelector("#modal-restart-button");

  let startTime, endTime;
  let reactionTimes = [];
  let attempts = 0;
  let timeout;

  homeButton.addEventListener("click", () => {
    window.location.href = "../../index.html#mainPage";
  });

  modalRestartButton.addEventListener("click", () => {
    resultModal.style.display = "none";
    startTest();
  });

  function startTest() {
    startButton.style.display = "none";
    frame.style.backgroundColor = "#DCD0FF"; // 연보라색
    statusDiv.textContent = "게임 시작!";
    countDiv.textContent = "";
    reactionTimes = [];
    attempts = 0;
    nextAttempt();
  }

  function nextAttempt() {
    if (attempts >= 5) {
      const averageTime =
        reactionTimes.reduce((a, b) => a + b) / reactionTimes.length;
      modalResult.innerHTML = `게임 종료!<br>평균 반응 시간: ${averageTime.toFixed(
        3
      )} 초`;
      resultModal.style.display = "flex";
      frame.style.backgroundColor = "#0000FF"; // 파란색
      statusDiv.textContent = "";
      return;
    }

    frame.style.backgroundColor = "#FF0000"; // 빨간색
    statusDiv.textContent = "준비";
    countDiv.textContent = `카운트: ${attempts + 1} / 5`;

    const delay = Math.random() * 4000;

    timeout = setTimeout(() => {
      frame.style.backgroundColor = "#00FF00"; // 초록색
      statusDiv.textContent = "클릭!";
      startTime = new Date().getTime();
    }, delay);
  }

  frame.addEventListener("click", () => {
    if (frame.style.backgroundColor === "rgb(0, 255, 0)") {
      endTime = new Date().getTime();
      const reactionTime = (endTime - startTime) / 1000;
      reactionTimes.push(reactionTime);
      attempts++;
      frame.style.backgroundColor = "#DCD0FF"; // 연보라색
      statusDiv.textContent = "";
      clearTimeout(timeout);
      setTimeout(nextAttempt, 1000); // 1초 후에 다음 테스트 시작
    }
  });

  startButton.addEventListener("click", startTest);
});
