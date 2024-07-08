document.addEventListener("DOMContentLoaded", () => {
  const introTitle = document.querySelector(".intro_title");
  const title = "Welcome to the GameBox 🎮";
  let cnt = 0;
  let timer = 0;

  const typingIntroTitle = () => {
    const character = title[cnt++];
    introTitle.innerHTML += character === "\n" ? "<br/>" : character;
    if (cnt === title.length) {
      clearInterval(timer);
    }
  };

  setTimeout(() => {
    document.querySelector(".loadingPage").style.display = "none";
    document.querySelector(".intro").style.display = "flex";
    timer = setInterval(typingIntroTitle, 90);
  }, 1700);

  if (window.location.hash === "#mainPage") {
    document.querySelector(".loadingPage").style.display = "none";
    document.querySelector(".intro").style.display = "none";
    document.querySelector("#mainPage").scrollIntoView({ behavior: "smooth" });
  }
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
