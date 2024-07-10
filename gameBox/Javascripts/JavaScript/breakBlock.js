document.addEventListener("DOMContentLoaded", () => {
  // 주요 DOM 요소들을 선택
  const gameContainer = document.querySelector("#game-container");
  const resultDiv = document.querySelector("#result");
  const startButton = document.querySelector("#start-button");
  const restartButton = document.querySelector("#restart-button");
  const removeButton = document.querySelector("#remove-button");
  const homeButton = document.querySelector("#home-button");
  const resultModal = document.querySelector("#result-modal");
  const modalResult = document.querySelector("#modal-result");
  const closeButton = document.querySelector("#close-button");
  const gameInstructions = document.querySelector("#game-instructions"); // '게임 방법' 요소 선택
  const totalBlocks = 50; // 총 블록 수
  let startTime, endTime; // 게임 시작 및 종료 시간

  // 이벤트 리스너 추가
  startButton.addEventListener("click", startGame); // 게임 시작 버튼 클릭 시 startGame 함수 호출
  restartButton.addEventListener("click", restartGame); // 다시 시작 버튼 클릭 시 restartGame 함수 호출
  removeButton.addEventListener("click", removeBlock); // 누르기 버튼 클릭 시 removeBlock 함수 호출
  homeButton.addEventListener("click", () => {
    window.location.href = "../../index.html#mainPage"; // 홈 버튼 클릭 시 메인 페이지로 이동
  });

  // 모달 닫기 버튼 클릭 시 모달 닫기
  closeButton.addEventListener("click", () => {
    resultModal.style.display = "none";
  });

  // 모달 외부 클릭 시 모달 닫기
  window.addEventListener("click", event => {
    if (event.target == resultModal) {
      resultModal.style.display = "none";
    }
  });

  // 블록 생성 함수
  function createBlocks() {
    for (let i = 0; i < totalBlocks; i++) {
      const block = document.createElement("div");
      block.classList.add("block");
      gameContainer.appendChild(block);
    }
  }

  // 블록 제거 함수
  function removeBlock() {
    if (!startTime) {
      startTime = new Date(); // 시작 시간 기록
    }
    const blocks = gameContainer.querySelectorAll(".block:not(.hidden)");
    if (blocks.length > 0) {
      blocks[0].classList.add("hidden"); // 첫 번째 블록 숨기기
      if (blocks.length === 1) {
        // 마지막 블록일 경우
        endTime = new Date(); // 종료 시간 기록
        const timeTaken = (endTime - startTime) / 1000; // 소요 시간 계산
        modalResult.innerHTML = `게임 종료!<br>소요 시간: ${timeTaken} 초`; // 모달에 결과 표시
        resultModal.style.display = "flex"; // 모달 보이기
        gameContainer.style.display = "none"; // 게임 컨테이너 숨기기
        removeButton.style.display = "none"; // 누르기 버튼 숨기기
        restartButton.style.display = "inline-block"; // 다시 시작 버튼 보이기
        gameInstructions.style.display = "none"; // '게임 방법' 숨기기
      }
    }
  }

  // 게임 시작 함수
  function startGame() {
    startButton.style.display = "none"; // 시작 버튼 숨기기
    gameContainer.style.display = "grid"; // 게임 컨테이너 보이기
    removeButton.style.display = "inline-block"; // 누르기 버튼 보이기
    gameInstructions.style.display = "block"; // '게임 방법' 보이기
    resultDiv.textContent = ""; // 결과 내용 초기화
    createBlocks(); // 블록 생성
  }

  // 게임 다시 시작 함수
  function restartGame() {
    startTime = null; // 시작 시간 초기화
    endTime = null; // 종료 시간 초기화
    gameContainer.innerHTML = ""; // 게임 컨테이너 내용 초기화
    resultDiv.textContent = ""; // 결과 내용 초기화
    restartButton.style.display = "none"; // 다시 시작 버튼 숨기기
    removeButton.style.display = "inline-block"; // 누르기 버튼 보이기
    gameContainer.style.display = "grid"; // 게임 컨테이너 보이기
    gameInstructions.style.display = "block"; // '게임 방법' 보이기
    createBlocks(); // 블록 생성
  }
});
