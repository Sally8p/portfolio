document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.querySelector("#start-button");
  const generateButton = document.querySelector("#generate-button");
  const numbersContainer = document.querySelector("#numbers");
  const lottoContainer = document.querySelector("#lotto-container");
  const homeButton = document.querySelector("#home-button");

  // 홈 버튼 클릭 시 메인 페이지로 이동
  homeButton.addEventListener("click", () => {
    window.location.href = "../../index.html#mainPage";
  });

  // 로또 번호 생성 함수
  function addLottoNumber() {
    const numbers = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 45) + 1; // 1부터 45 사이의 난수 생성
      if (!numbers.includes(num)) {
        numbers.push(num); // 중복되지 않는 번호 추가
      }
    }
    return numbers;
  }

  // 숫자를 화면에 순차적으로 표시하는 함수
  function displayNumbers(numbers) {
    const spans = numbersContainer.querySelectorAll("span");
    spans.forEach((span, index) => {
      span.textContent = ""; // 기존 숫자 제거
      span.style.opacity = 0; // 애니메이션 전 초기 상태 설정
      span.style.animation = "none"; // 애니메이션 초기화
      setTimeout(() => {
        span.textContent = numbers[index];
        span.style.animation = `fadeInFromTop 0.3s forwards`; // 애니메이션 적용
        span.style.animationDelay = `${index * 0.2}s`; // 각 숫자의 애니메이션 지연 시간 설정
      }, index * 200); // 각 숫자가 0.2초 간격으로 나타나도록 설정
    });
  }

  // 시작 버튼 클릭 시 이벤트 처리
  startButton.addEventListener("click", () => {
    lottoContainer.style.display = "flex"; // 로또 번호 컨테이너 표시
    startButton.style.display = "none"; // 시작 버튼 숨기기
    const lottoNumbers = addLottoNumber(); // 로또 번호 생성
    displayNumbers(lottoNumbers); // 생성된 번호를 화면에 순차적으로 표시
  });

  // 번호 생성 버튼 클릭 시 이벤트 처리
  generateButton.addEventListener("click", () => {
    const lottoNumbers = addLottoNumber(); // 로또 번호 생성
    displayNumbers(lottoNumbers); // 생성된 번호를 화면에 순차적으로 표시
  });
});
