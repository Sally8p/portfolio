    document.addEventListener("DOMContentLoaded", () => {
      const gameContainer = document.querySelector("#game-container");
      const resultDiv = document.querySelector("#result");
      const startButton = document.querySelector("#start-button");
      const restartButton = document.querySelector("#restart-button");
      const removeButton = document.querySelector("#remove-button");
      const homeButton = document.querySelector("#home-button");
      const resultModal = document.querySelector("#result-modal");
      const modalResult = document.querySelector("#modal-result");
      const closeButton = document.querySelector("#close-button");
      const totalBlocks = 50;
      let startTime, endTime;

      startButton.addEventListener("click", startGame);
      restartButton.addEventListener("click", restartGame);
      removeButton.addEventListener("click", removeBlock);
      homeButton.addEventListener("click", () => {
        window.location.href = '../../index.html#mainPage'; // 페이지 뒤로가기
      });

      closeButton.addEventListener("click", () => {
        resultModal.style.display = "none";
      });

      window.addEventListener("click", (event) => {
        if (event.target == resultModal) {
          resultModal.style.display = "none";
        }
      });

      function createBlocks() {
        for (let i = 0; i < totalBlocks; i++) {
          const block = document.createElement("div");
          block.classList.add("block");
          gameContainer.appendChild(block);
        }
      }

      function removeBlock() {
        if (!startTime) {
          startTime = new Date();
        }
        const blocks = gameContainer.querySelectorAll(".block:not(.hidden)");
        if (blocks.length > 0) {
          blocks[0].classList.add("hidden");
          if (blocks.length === 1) {
            endTime = new Date();
            const timeTaken = (endTime - startTime) / 1000;
            modalResult.innerHTML = `게임 종료!<br>소요 시간: ${timeTaken} 초`;
            resultModal.style.display = "flex";
            gameContainer.style.display = "none";
            removeButton.style.display = "none";
            restartButton.style.display = "inline-block";
          }
        }
      }

      function startGame() {
        startButton.style.display = "none";
        gameContainer.style.display = "grid";
        removeButton.style.display = "inline-block";
        resultDiv.textContent = "";
        createBlocks();
      }

      function restartGame() {
        startTime = null;
        endTime = null;
        gameContainer.innerHTML = "";
        resultDiv.textContent = "";
        restartButton.style.display = "none";
        removeButton.style.display = "inline-block";
        gameContainer.style.display = "grid";
        createBlocks();
      }
    });