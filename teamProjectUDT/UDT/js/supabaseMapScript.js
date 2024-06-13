//슈파베이스 테스트용
const supabaseUrl = "https://ticzcxszdgryyieydcjb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpY3pjeHN6ZGdyeXlpZXlkY2piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyMTkyOTksImV4cCI6MjAzMDc5NTI5OX0.PX0OhLR9KCbnmjsp1cshVTcZifAzerW3Si5G_-54Ucs";
const client = supabase.createClient(supabaseUrl, supabaseKey);
async function loadData() {
  let { data: pindata, error } = await client.from("coordinates").select("*");
  console.log(pindata[0].name);
  console.log(pindata);

  const mainLat = 36.634997, mainLng = 127.4577953;

  let mapBox = document.querySelector("#map"),
    mapOpt = {
      center: new kakao.maps.LatLng(mainLat, mainLng), // 지도의 중심좌표
      level: 5, // 지도의 확대 레벨
    };
  // 지도 생성 new kakao.maps.Map(지도표시할곳, 지도옵션)
  let baseMap = new kakao.maps.Map(mapBox, mapOpt);

  // 각 store 정보를 객체로 정리하여 배열에 저장
  let storeList = [
    {
      storeName: `${pindata[0].name}`,
      place: new kakao.maps.LatLng(
        `${pindata[0].Latitude}`,
        `${pindata[0].Longitude}`
      ),
    },
    {
      storeName: `${pindata[1].name}`,
      place: new kakao.maps.LatLng(
        `${pindata[1].Latitude}`,
        `${pindata[1].Longitude}`
      ),
    },
    {
      storeName: `${pindata[2].name}`,
      place: new kakao.maps.LatLng(
        `${pindata[2].Latitude}`,
        `${pindata[2].Longitude}`
      ),
    },
    {
      storeName: `${pindata[3].name}`,
      place: new kakao.maps.LatLng(
        `${pindata[3].Latitude}`,
        `${pindata[3].Longitude}`
      ),
    },
    {
      storeName: `${pindata[4].name}`,
      place: new kakao.maps.LatLng(
        `${pindata[4].Latitude}`,
        `${pindata[4].Longitude}`
      ),
    },
    {
      storeName: `${pindata[5].name}`,
      place: new kakao.maps.LatLng(
        `${pindata[5].Latitude}`,
        `${pindata[5].Longitude}`
      ),
    },
  ];

  // 추가해야되는 부분들 (배열을 통해서 지도 데이터 가져오기)
let contents = `
  <div class="wrap">
    <div class="info">
      <div class="title">
        카카오 스페이스닷원
        <div class="close" onclick="closeOverlay()" title="닫기"></div>
      </div>
      <div class="body">
        <div class="img">
          <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70">
        </div>
        <div class="desc">
          <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>
          <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
          <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>
        </div>
      </div>
    </div>
  </div>`;


  const imgPath = "/udt_project/test/img/pin_logo.png";

  for (const store of storeList) {
    // 마커 이미지의 이미지 크기
    const imageSize = new kakao.maps.Size(30);

    // 마커 이미지를 생성
    const markerImage = new kakao.maps.MarkerImage(imgPath, imageSize);

    // 마커를 생성합니다
    let markers = new kakao.maps.Marker({
      content : contents,
      map: baseMap,
      position: store.place,
      image: markerImage, // 마커 이미지 설정
    });
    // // 인포윈도우에 표시할 내용
    // let infoWindow = new kakao.maps.InfoWindow({
    //   content: `<div class="iw">${store.storeName}</div>`,
    // });
  }
  // 클로저: 함수의 리턴값이 익명함수인경우, 함수참조값을 익명함수가 땡겨쓰려할 때 사용한다.
  // 이벤트 리스너로는 클로저를 만들어 등록, 클로저를 만들어 주지 않으면 마지막 마커에만 등록됨.

  // 정보창을 표시하는 클로저를 만드는 함수입니다
  // function mouseOver(baseMap, markers, infoWindow) {
  //   return function () {
  //     infoWindow.open(baseMap, markers);
  //   };
  // }
  // // 정보창을 닫는 클로저를 만드는 함수입니다
  // function mouseOut(infoWindow) {
  //   return function () {
  //     infoWindow.close();
  //   };
  // }
}
// load 이벤트가 발생하면 loadData 함수를 호출합니다.
window.addEventListener("load", loadData);
