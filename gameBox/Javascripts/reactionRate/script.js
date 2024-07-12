document.addEventListener("DOMContentLoaded", () => {
  // DOM 요소 선택
  const centerContent = document.querySelector("#center-content");
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

  // 홈 버튼 클릭 시 메인 페이지로 이동
  homeButton.addEventListener("click", () => {
    window.location.href = "../../index.html#mainPage";
  });

  // 모달의 다시하기 버튼 클릭 시 게임 재시작
  modalRestartButton.addEventListener("click", () => {
    resultModal.style.display = "none";
    startButton.style.display = "block"; // 시작 버튼 다시 보이기
    statusDiv.textContent = ""; // 상태 텍스트 초기화
    countDiv.textContent = ""; // 카운트 텍스트 초기화
    frame.style.backgroundColor = "#333"; // 기본 배경색으로 초기화
  });

  // 게임 시작 함수
  function startTest() {
    startButton.style.display = "none"; // 시작 버튼 숨기기
    frame.style.backgroundColor = "#DCD0FF"; // 연보라색 배경 설정
    statusDiv.textContent = "게임 시작!"; // 상태 텍스트 설정
    countDiv.textContent = ""; // 카운트 텍스트 초기화
    reactionTimes = []; // 반응 시간 배열 초기화
    attempts = 0; // 시도 횟수 초기화
    nextAttempt(); // 다음 시도 실행
  }

  // 다음 시도 함수
  function nextAttempt() {
    if (attempts >= 5) {
      // 5번 시도 후 게임 종료
      const averageTime =
        reactionTimes.reduce((a, b) => a + b) / reactionTimes.length; // 평균 반응 시간 계산
      modalResult.innerHTML = `게임 종료!<br>평균 반응 시간: ${averageTime.toFixed(
        3
      )} 초`; // 결과 모달에 평균 반응 시간 표시
      resultModal.style.display = "flex"; // 모달 표시
      frame.style.backgroundColor = "#0000FF"; // 파란색 배경 설정
      return;
    }

    frame.style.backgroundColor = "#FF0000"; // 빨간색 배경 설정
    statusDiv.textContent = "준비"; // 상태 텍스트 설정
    countDiv.textContent = `카운트: ${attempts + 1} / 5`; // 카운트 텍스트 설정

    const delay = Math.random() * 4000; // 랜덤한 지연 시간 설정

    timeout = setTimeout(() => {
      frame.style.backgroundColor = "#00FF00"; // 초록색 배경 설정
      statusDiv.textContent = "클릭!"; // 상태 텍스트 설정
      startTime = new Date().getTime(); // 시작 시간 기록
    }, delay);
  }

  // 프레임 클릭 이벤트 핸들러
  frame.addEventListener("click", () => {
    if (frame.style.backgroundColor === "rgb(0, 255, 0)") {
      // 배경이 초록색일 때만 반응 시간 기록
      endTime = new Date().getTime(); // 종료 시간 기록
      const reactionTime = (endTime - startTime) / 1000; // 반응 시간 계산
      reactionTimes.push(reactionTime); // 반응 시간 배열에 추가
      attempts++; // 시도 횟수 증가
      frame.style.backgroundColor = "#DCD0FF"; // 연보라색 배경 설정
      statusDiv.textContent = ""; // 상태 텍스트 초기화
      clearTimeout(timeout); // 타임아웃 취소
      setTimeout(nextAttempt, 1000); // 1초 후에 다음 시도 시작
    }
  });

  // 시작 버튼 클릭 이벤트 핸들러
  startButton.addEventListener("click", startTest);
});
