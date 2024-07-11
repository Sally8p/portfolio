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

  // Click Me! 문구를 클릭했을 때 mainPage로 부드럽게 이동
  document.querySelector(".scrtext").addEventListener("click", () => {
    introSwiper.slideTo(1); // 두 번째 슬라이드로 이동
  });
});

// 첫 번째 Swiper 슬라이드 (인트로 슬라이드)
var introSwiper = new Swiper(".mySwiper", {
  direction: "horizontal",
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  allowTouchMove: false, // 첫 번째 슬라이드에서 터치 이동 비활성화
});

introSwiper.on("slideChange", () => {
  if (introSwiper.activeIndex === 1) {
    introSwiper.params.allowTouchMove = true; // 두 번째 슬라이드에서 터치 이동 활성화
  } else {
    introSwiper.params.allowTouchMove = false; // 첫 번째 슬라이드에서는 터치 이동 비활성화
  }
  introSwiper.update();
});

// 두 번째 Swiper 슬라이드 (메인 페이지 슬라이드)
var mainSwiper = new Swiper(".mySwiperInner", {
  slidesPerView: 1,
  grid: {
    rows: 2,
  },
  spaceBetween: 30,
  mousewheel: true, // 마우스 휠로 슬라이드 이동 가능
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1024: {
      slidesPerView: 3,
      grid: {
        rows: 3,
      },
      pagination: {
        enabled: false,
      },
    },
  },
  allowTouchMove: true, // 드래그로 슬라이드 이동 가능
});
