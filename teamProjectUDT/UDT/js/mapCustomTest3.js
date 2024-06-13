const supabaseUrl = "https://ticzcxszdgryyieydcjb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpY3pjeHN6ZGdyeXlpZXlkY2piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyMTkyOTksImV4cCI6MjAzMDc5NTI5OX0.PX0OhLR9KCbnmjsp1cshVTcZifAzerW3Si5G_-54Ucs";
const client = supabase.createClient(supabaseUrl, supabaseKey);

async function loadData() {
  let { data: pindata, error } = await client.from("coordinates").select("*");

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  const mainLat = 36.634997,
    mainLng = 127.4577953;

  let mapBox = document.querySelector("#map"),
    mapOpt = {
      center: new kakao.maps.LatLng(mainLat, mainLng),
      level: 6,
    };

  let map = new kakao.maps.Map(mapBox, mapOpt);

  function Ping(storeName, Latitude, Longitude, tennisPro, career, imgSrc) {
    this.storeName = storeName;
    this.Latitude = Latitude;
    this.Longitude = Longitude;
    this.tennisPro = tennisPro;
    this.career = career;
    this.imgSrc = imgSrc;
  }

  let storeList = [];

  for (const pin of pindata) {
    let store = new Ping(
      pin.name,
      pin.Latitude,
      pin.Longitude,
      pin.tennisPro,
      pin.career,
      pin.imgSrc
    );
    storeList.push(store);
  }

  var imageSrc = "/udt_project/test/img/pin_logo.png",
    imageSize = new kakao.maps.Size(40),
    imgOpt = { offset: new kakao.maps.Point(65, 40) };

  let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOpt);

  let overlays = [];

  for (const ping of storeList) {
    var markerPosition = new kakao.maps.LatLng(ping.Latitude, ping.Longitude);
    var marker = new kakao.maps.Marker({
      position: markerPosition,
      map: map,
      image: markerImage,
    });

    var contentString = `
    <div class="wrap"> 
      <div class="info">
        <div class="title"> 
          ${ping.storeName}
            <div class="close" title="닫기"></div> 
                </div> 
              <div class="body">
                  <div class="img"> 
                      <img src="${ping.imgSrc}" width="73" height="70">
                  </div>
                  <div class="desc">
                      <div class="ellipsis">${ping.tennisPro}</div>
                      <div class="jibun ellipsis">테니스 경력 ${ping.career}년 코치의 레슨</div>
                      <div><a href="#" target="_blank" class="link"></a></div>
                  </div> 
        </div> 
      </div>
    </div>`;

    let content = document.createElement("div");
    content.innerHTML = contentString;

    let overlay = new kakao.maps.CustomOverlay({
      content: content,
      position: marker.getPosition(),
      // map: null, // 처음에 오버레이는 닫힌 상태
      map: map, // 처음에 오버레이는 열린 상태
    });

    overlays.push(overlay);

    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
    kakao.maps.event.addListener(marker, "click", function () {
      overlay.setMap(map);
    });

    // 오버레이의 닫기 버튼에 클릭 이벤트를 추가합니다
    let closeButton = content.querySelector(".close");
    closeButton.addEventListener("click", function () {
      overlay.setMap(null);
    });
  }
}

window.addEventListener("load", loadData);