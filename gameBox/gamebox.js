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
  }, 500);
});

// swiper 슬라이드
var swiper = new Swiper(".mySwiper", {
  direction: "horizontal",
  slidesPerView: 1,
  spaceBetween: 30,
  mousewheel: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     const response = await fetch("data.json"); // data.json 파일을 비동기로 가져옵니다.
//     const data = await response.json(); // JSON 형식의 응답 데이터를 파싱합니다.

//     const mainPage = document.getElementById("mainPage"); // mainPage 요소를 선택합니다.

//     data.forEach(item => {
//       const article = document.createElement("article"); // 새로운 article 요소를 생성합니다.
//       article.className = "cursorEft";

//       const anchor = document.createElement("a"); // a 요소를 생성하고 href 속성을 설정합니다.
//       anchor.href = item.link;
//       anchor.className = "article-link";

//       const img = document.createElement("img"); // img 요소를 생성하고 src 및 alt 속성을 설정합니다.
//       img.src = item.img;
//       img.alt = item.title;

//       const h1 = document.createElement("h1"); // h1 요소를 생성하고 텍스트 콘텐츠를 설정합니다.
//       h1.textContent = item.title;

//       anchor.appendChild(img); // a 요소에 img와 h1 요소를 자식으로 추가합니다.
//       anchor.appendChild(h1);
//       article.appendChild(anchor); // article 요소에 a 요소를 자식으로 추가합니다.
//       mainPage.appendChild(article); // mainPage 요소에 article 요소를 자식으로 추가합니다.

//       article.addEventListener("click", () => {
//         anchor.click();
//       });

//       [img, h1].forEach(element => {
//         element.addEventListener("click", e => {
//           e.stopPropagation(); // img와 h1 요소에 클릭 이벤트 리스너를 추가하여 이벤트 전파를 중지합니다.
//         });
//       });
//     });
//   } catch (error) {
//     console.error("Error fetching the JSON data:", error); // 데이터 가져오기 중 오류가 발생하면 콘솔에 오류를 출력합니다.
//   }
// });