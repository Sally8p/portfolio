// 탭구조에 쿼리셀렉터올로 잡은 애한테 for구문을 돌려가지고 classList 조절해라.
const btns = document.querySelectorAll(".btn-select");
const lists = document.querySelectorAll(".list-member button");

// btns.forEach(btn => {
//   btn.addEventListener("click", () => {
//     btn.classList.toggle("on");
//   });
// });
// lists.forEach(listItem => {
//   listItem.addEventListener("click", () => {
//     // 클릭된 버튼의 부모 article 내의 btn-select 버튼을 찾아서 클래스 제거
//     const parentArticle = listItem.closest(".cont-select");
//     const parentBtn = parentArticle.querySelector(".btn-select");
//     parentBtn.classList.remove("on");
//   });
// });


for (const btn of btns) {
  btn.addEventListener("click", () => {
    btn.classList.toggle("on");
  });
}

for (const listItem of lists) {
  listItem.addEventListener("click", () => {
    const parentArticle = listItem.closest(".cont-select");
    const parentBtn = parentArticle.querySelector(".btn-select");
    parentBtn.classList.remove("on");
  });
}
