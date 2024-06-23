document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.querySelector("#start-button");
  const generateButton = document.querySelector("#generate-button");
  const numbersContainer = document.querySelector("#numbers");
  const lottoContainer = document.querySelector("#lotto-container");

  // 로또 번호 생성 함수
  function addLottoNumber() {
    const numbers = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers;
  }

  // 숫자를 화면에 표시하는 함수
  function displayNumbers(numbers) {
    numbersContainer.innerHTML = ""; // 기존 숫자 제거
      for (const number of numbers) {
      const numberElement = document.createElement("div");
      numberElement.className = "number";
      numberElement.textContent = number;
      numbersContainer.appendChild(numberElement);
    }
  }

  // 시작 버튼 클릭 시 이벤트 처리
  startButton.addEventListener("click", () => {
    lottoContainer.style.display = "flex";
    startButton.style.display = "none";
    const lottoNumbers = addLottoNumber();
    displayNumbers(lottoNumbers);
  });

  // 번호 생성 버튼 클릭 시 이벤트 처리
  generateButton.addEventListener("click", () => {
    const lottoNumbers = addLottoNumber();
    displayNumbers(lottoNumbers);
  });
});
