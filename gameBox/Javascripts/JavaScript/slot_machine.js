document.addEventListener("DOMContentLoaded", () => {
  const items = ["7️⃣", "👑", "💥", "🍋", "🔮", "✨", "💵", "🍊", "💍"]; // 슬롯 머신 아이템
  const doors = document.querySelectorAll(".door"); // 슬롯 머신의 각 문 요소
  const spinnerButton = document.querySelector("#spinner"); // 돌리기 버튼
  const homeButton = document.querySelector("#home-button"); // 홈 버튼
  let firstSpin = true; // 첫 스핀 여부를 체크하는 변수

  // 홈 버튼 클릭 시 메인 페이지로 이동
  homeButton.addEventListener("click", () => {
    window.location.href = "../../index.html#mainPage";
  });

  // 돌리기 버튼 클릭 이벤트 리스너 추가
  spinnerButton.addEventListener("click", () => {
    if (!firstSpin) {
      init(false, 1, 0); // 첫 스핀이 아닌 경우 슬롯머신 초기화
    }
    spin();
    firstSpin = false; // 첫 스핀 후 변수 값을 false로 변경
  });

  // 슬롯머신 스핀 함수
  async function spin() {
    for (const door of doors) {
      const boxes = door.querySelector(".boxes"); // 각 문 내부의 박스 요소
      const duration = 0.7; // 트랜지션 지속 시간 설정
      const moveBy = door.clientHeight * items.length; // 이동할 거리 설정
      boxes.style.transitionDuration = `${duration}s`;
      boxes.style.transform = `translateY(-${moveBy}px)`; // 이동 설정

      await delay(duration * 1000); // 트랜지션 지속 시간만큼 대기

      // 스핀 후 위치를 초기화하고 새로운 아이템으로 채우기
      boxes.style.transitionDuration = "0s";
      boxes.style.transform = "translateY(0)";
      fillBoxes(boxes, createItemPool(1), door);
    }
  }

  // 슬롯머신 초기화 함수
  function init(firstInit = true, groups = 1, duration = 0) {
    doors.forEach(door => {
      const boxes = door.querySelector(".boxes"); // 각 문 내부의 박스 요소
      const boxesClone = boxes.cloneNode(false); // 빈 복제본 생성
      const pool = firstInit ? items : createItemPool(groups); // 아이템 풀 생성

      // 트랜지션 설정
      boxesClone.style.transitionDuration = `${duration}s`;
      boxesClone.style.transform = `translateY(0px)`;

      // 박스 요소 채우기
      fillBoxes(boxesClone, pool, door);

      // 기존 박스 요소를 복제본으로 교체
      door.replaceChild(boxesClone, boxes);
    });
  }

  // 아이템 풀 생성 함수
  function createItemPool(groups) {
    const pool = [];
    for (let n = 0; n < groups; n++) {
      pool.push(...items);
    }
    return shuffle(pool); // 아이템 풀 섞기
  }

  // 박스 요소 채우기 함수
  function fillBoxes(boxesClone, pool, door) {
    boxesClone.innerHTML = ""; // 기존 박스 요소 초기화
    pool.forEach(item => {
      const box = document.createElement("div"); // 새로운 박스 요소 생성
      box.classList.add("box");
      box.style.width = `${door.clientWidth}px`;
      box.style.height = `${door.clientHeight}px`;
      box.textContent = item; // 아이템 설정
      boxesClone.appendChild(box); // 박스 요소에 추가
    });
  }

  // 배열 섞기 함수
  function shuffle(array) {
    let m = array.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [array[m], array[i]] = [array[i], array[m]];
    }
    return array;
  }

  // 지연 시간 함수
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 초기화 함수 호출
  init();
});
