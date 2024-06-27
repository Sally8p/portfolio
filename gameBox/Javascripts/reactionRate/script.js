document.addEventListener("DOMContentLoaded", () => {
  const frame = document.querySelector("#frame");
  const statusDiv = document.querySelector("#status");
  const countDiv = document.querySelector("#count");
  const resultDiv = document.querySelector("#result");
  const startButton = document.querySelector("#start-button");
  const resetButton = document.querySelector("#reset-button");
  const homeButton = document.querySelector("#home-button");

  let startTime, endTime;
  let reactionTimes = [];
  let attempts = 0;
  let timeout;

  homeButton.addEventListener("click", () => {
    window.history.back();
  });

  function startTest() {
    startButton.style.display = "none";
    resetButton.style.display = "none";
    frame.style.backgroundColor = "#DCD0FF"; // 연보라색
    statusDiv.textContent = "";
    countDiv.textContent = "";
    resultDiv.style.display = "none";
    reactionTimes = [];
    attempts = 0;
    nextAttempt();
  }

  function nextAttempt() {
    if (attempts >= 5) {
      const averageTime =
        reactionTimes.reduce((a, b) => a + b) / reactionTimes.length;
      frame.style.backgroundColor = "#0000FF"; // 파란색
      statusDiv.textContent = "";
      resultDiv.textContent = `평균 반응 시간: ${averageTime.toFixed(3)} 초`;
      resultDiv.style.display = "block";
      resetButton.style.display = "block";
      return;
    }

    frame.style.backgroundColor = "#FF0000"; // 빨간색
    statusDiv.textContent = "준비";
    resultDiv.style.display = "none";
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
      // 초록색
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
  resetButton.addEventListener("click", startTest);
});
