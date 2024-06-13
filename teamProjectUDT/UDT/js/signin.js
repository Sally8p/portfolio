// signin 페이지 js

// 비밀번호 확인(input id: userPassCheck)과 비밀번호(input id: userPass)를 비교하는 함수
function validatePassword() {
    var password = document.getElementById("userPass").value;
    var confirmPassword = document.getElementById("userPassCheck").value;

    // 비밀번호와 비밀번호 확인이 같은지 확인
    if (password != confirmPassword) {
        // 불일치할 경우 경고 메시지를 표시
        document.getElementById("passError").innerHTML = "비밀번호가 일치하지 않습니다.";
    } else {
        // 일치할 경우 경고 메시지를 지우고, 유효성 검사 통과
        document.getElementById("passError").innerHTML = "";
    }
}

// 비밀번호 확인(input id: userPassCheck)이 변경될 때마다 validatePassword 함수 호출
document.getElementById("userPassCheck").addEventListener("keyup", validatePassword);

document.querySelector('.domainBt').addEventListener('click', function () {
    const domainList = document.querySelector('.domainList');
    domainList.classList.toggle('active');
});

document.querySelectorAll('.domainOption').forEach(function (domainButton) {
    domainButton.addEventListener('click', function () {
        const domainBt = document.querySelector('.domainBt');
        domainBt.textContent = this.textContent;

        // 선택한 후 도메인 리스트 숨기기
        document.querySelector('.domainList').classList.remove('active');
    });
});

const yearSelect = document.getElementById('birthYear');
const currentYear = new Date().getFullYear();
for (let year = currentYear; year >= 1900; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.text = year;
    yearSelect.appendChild(option);
}
const monthSelect = document.getElementById('birthMonth');
for (let month = 1; month <= 12; month++) {
    const option = document.createElement('option');
    option.value = month;
    option.text = month;
    monthSelect.appendChild(option);
}
const daySelect = document.getElementById('birthDay');
for (let day = 1; day <= 31; day++) {
    const option = document.createElement('option');
    option.value = day;
    option.text = day;
    daySelect.appendChild(option);
}