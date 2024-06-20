document.addEventListener("DOMContentLoaded", () => {
  const introTitle = document.querySelector(".intro_title"); // intro_title 요소 선택
  const title = "Welcome to the GameBox 🎮"; // 출력할 타이틀 문구
  let cnt = 0; // 문자의 인덱스 카운터
  let timer = 0; // 타이머 변수

  // 카운트 변수 생성 후 한글자씩 읽히는 함수
  const typingIntroTitle = () => {
    const character = title[cnt++]; // 현재 인덱스의 문자 추출

    // 추출한 문자가 줄바꿈 문자이면 <br/> 태그 추가, 아니면 문자를 추가
    introTitle.innerHTML += character === "\n" ? "<br/>" : character;

    // 타이틀 문구를 모두 출력하면 타이머 정지
    if (cnt === title.length) {
      clearInterval(timer);
    }
  };

  // 2초 후에 loadingPage를 숨기고 intro 페이지를 보여줌
  setTimeout(() => {
    document.querySelector(".loadingPage").style.display = "none"; // 로딩 페이지 숨기기
    document.querySelector(".intro").style.display = "flex"; // 인트로 페이지 보이기

    // 타이틀 문구 타이핑 효과를 90ms 간격으로 실행
    timer = setInterval(typingIntroTitle, 90);
  }, 1500);
});

// 화살표 버튼 누를시 메인페이지로 이동 버튼
const pagemoveBt = document.getElementsByClassName("scrollBtn")[0];
const mainPage = document.getElementById("mainPage");

pagemoveBt.addEventListener("click", () => {
  mainPage.scrollIntoView({ behavior: "smooth" });
});
