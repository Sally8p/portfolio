// DOMContentLoaded 이벤트가 발생하면 실행
document.addEventListener("DOMContentLoaded", () => {
  const homeButton = document.querySelector("#home-button");

  homeButton.addEventListener("click", () => {
    window.history.back();
  });

  // lever 요소와 reels 배열을 가져옴
  const lever = document.querySelector("#lever");
  const reels = [
    document.querySelector("#reel1"),
    document.querySelector("#reel2"),
    document.querySelector("#reel3"),
  ];

  // 사용될 심볼들을 정의
  const symbols = ["🍒", "🍋", "🍉", "⭐", "🔔", "🍇", "7️⃣"];

  // 랜덤한 심볼을 반환하는 함수
  function getRandomSymbols() {
    return Array.from(
      { length: 3 },
      () => symbols[Math.floor(Math.random() * symbols.length)]
    );
  }

  // 해당 reel에 심볼을 표시하는 함수
  function displaySymbols(reel, symbols) {
    reel.innerHTML = ""; // 기존 심볼 제거
    symbols.forEach(symbol => {
      const symbolElement = document.createElement("div");
      symbolElement.textContent = symbol;
      reel.appendChild(symbolElement);
    });
  }

  // reel을 회전시키는 함수
  function spinReel(reel) {
    const symbolsToShow = getRandomSymbols();
    displaySymbols(reel, symbolsToShow);

    // 애니메이션 효과 추가
    reel.style.transition = "transform 0.15s ease-in-out";
    // reel.style.transform = "translateY(-100%)";

    // 애니메이션 끝난 후 리셋
    setTimeout(() => {
      reel.style.transition = "none";
      reel.style.transform = "translateY(0)";
      displaySymbols(reel, symbolsToShow);
    }, 1000);
  }

  // lever를 클릭했을 때 각 reel을 회전시키는 이벤트 추가
  lever.addEventListener("click", () => {
    reels.forEach(reel => {
      spinReel(reel);
    });
  });
});
