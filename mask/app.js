document.addEventListener("DOMContentLoaded", () => {
  const apiKey =
    "He9F9uaNaiBH9sojIhybpTTry%2BIg1NNpyhu7%2F091u809j%2F3nCq2In%2FMzLcVs52X9RQHSk0pQtXQPdZN6sVbtLw%3D%3D"; // 발급받은 API 키를 입력하세요.
  const apiUrl = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${apiKey}&sidoName=서울&returnType=json`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      setTimeout(() => {
        document.querySelector(".loading").style.display = "none";
        document.getElementById("status").style.display = "block";
        document.getElementById("animation-frame").style.display = "block";

        if (data.response && data.response.body && data.response.body.items) {
          const item = data.response.body.items[0];
          const pm10Value = item.pm10Value;
          const pm25Value = item.pm25Value;
          let statusText = "";
          let iframeSrc = "";

          if (pm10Value <= 30) {
            statusText = "좋음";
            iframeSrc = "파일추가";
          } else if (pm10Value <= 80) {
            statusText = "보통";
            iframeSrc = "파일추가";
          } else if (pm10Value <= 150) {
            statusText = "나쁨";
            iframeSrc = "파일추가";
          } else {
            statusText = "매우 나쁨";
            iframeSrc = "파일추가";
          }

          document.getElementById(
            "status"
          ).textContent = `현재 미세먼지 상태: ${statusText}`;
          document.getElementById("animation-frame").src = iframeSrc;
        } else {
          throw new Error("Invalid data structure");
        }
      }, 10);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      document.querySelector(".loading").textContent =
        "데이터를 불러오는 중 오류가 발생했습니다.";
    });
});
