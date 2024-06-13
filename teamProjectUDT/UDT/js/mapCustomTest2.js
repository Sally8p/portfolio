const supabaseUrl = "https://ticzcxszdgryyieydcjb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpY3pjeHN6ZGdyeXlpZXlkY2piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyMTkyOTksImV4cCI6MjAzMDc5NTI5OX0.PX0OhLR9KCbnmjsp1cshVTcZifAzerW3Si5G_-54Ucs";
const client = supabase.createClient(supabaseUrl, supabaseKey);
async function loadData() {
  let { data: pindata, error } = await client.from("coordinates").select("*");
  console.log(pindata[0].name);
  console.log(pindata);
  // 맵 기본좌표 선언
  const mainLat = 36.634997,
    mainLng = 127.4577953;

  let mapBox = document.querySelector("#map"), // 지도의 중심좌표
    mapOpt = {
      center: new kakao.maps.LatLng(mainLat, mainLng), // 지도의 중심좌표
      level: 6, // 지도의 확대 레벨
    };

  var map = new kakao.maps.Map(mapBox, mapOpt); // 지도를 생성합니다

  //   // 1. 생성자 함수 ( 객체를 패턴화해서 만들어주는 애 )
  function Store(storeName, Latitude, Longitude) {
    this.storeName = storeName;
    this.place = new kakao.maps.LatLng(Latitude, Longitude);
  }
  // this.키이름 = 인자
  function Ping(storeName, Latitude, Longitude) {
    this.storeName = storeName;
    this.Latitude = Latitude;
    this.Longitude = Longitude;
  }

  let storeList = [];

  for (const pin of pindata) {
    // 각 핀 데이터에 대해 반복문 실행
    let store = new Ping(pin.name, pin.Latitude, pin.Longitude); // 새로운 Ping 객체 생성
    storeList.push(store); // storeList 배열에 store 객체 추가
  } // 반복문 종료

  console.log(storeList);

  var imageSrc = "/udt_project/test/img/pin_logo.png", // 커스텀마커 이미지
    imageSize = new kakao.maps.Size(40), // 마커이미지의 크기입니다
    imgOpt = { offset: new kakao.maps.Point(65, 40) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOpt);

  for (const ping of storeList) {
    var markerPosition = new kakao.maps.LatLng(ping.Latitude, ping.Longitude);
    var marker = new kakao.maps.Marker({
      position: markerPosition,
      map: map,
      image: markerImage,
    });
  }
  // 오버레이후 보여지는 화면
  // var content = document.querySelector("#wrap")
  var content = `
  <div class="wrap"> 
    <div class="info">
      <div class="title"> 
        이승빈
          <div class="close" onclick="closeOverlay()" title="닫기"></div> 
              </div> 
            <div class="body">
                <div class="img"> 
                    <img src="/udt_project/test/img/profile_4.png" width="73" height="70">
                </div>
                <div class="desc">
                    <div class="ellipsis">프로 강사</div>
                    <div class="jibun ellipsis">테니스 경력 5년 코치의 레슨</div>
                    <div><a href="#" target="_blank" class="link"></a></div>
                </div> 
      </div> 
    </div>
  </div>`;
    

  var overlay = new kakao.maps.CustomOverlay({
    content: content,
    map: map,
    position: marker.getPosition(),
  });

  // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
  kakao.maps.event.addListener(marker, "click", function () {
    overlay.setMap(map);
  });
  // 오버레이 닫기 버튼에 클릭 이벤트를 연결
  document.querySelector(".close").addEventListener("click", function () {
    overlay.setMap(null);
  }); 
}
window.addEventListener("load", loadData); //
