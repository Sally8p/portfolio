# GameBox 🎮

# 개요

"GameBox"는 다양한 미니 게임을 제공하는 웹 & 반응형 프로젝트입니다. "GameBox" 프로젝트는 사용자에게 재미있고 간단한 게임을 경험할 수 있게 해줍니다. 직관적인 UI와 간단한 조작법으로 누구나 쉽게 즐길 수 있으며, 다양한 애니메이션과 상호작용 요소를 통해 더 흥미로운 사용자 경험을 제공합니다.

## 미리보기

![intro](https://github.com/user-attachments/assets/f89c27d6-e852-431d-bb0d-189f2373caf8)

---

### 주요 기능 및 게임 목록


### 📌 랜덤 기반 게임

<p align="center" width="30%">
  <img src="https://github.com/user-attachments/assets/fe842030-2a0d-46cf-abc0-5cabf9df3c7b" align="center" width="30%" />
  <img src="https://github.com/user-attachments/assets/9125cacf-d81c-4c00-b741-ab0e313aeadb" align="center" width="30%" />
  <img src="https://github.com/user-attachments/assets/f16365f6-215a-488e-853a-dcf2a25ee5aa" align="center" width="30%" />
</p>

1. **룰렛 돌리기 (roulette)**
    - **설명**: 사용자 정의 메뉴를 추가하고 룰렛을 돌려 랜덤으로 메뉴를 선택합니다.
    - **기능 및 스크립트 기능**:
        - `click` 이벤트를 통해 사용자가 메뉴를 추가하고 삭제할 수 있습니다.
        - `click` 이벤트와 Math.random()을 사용하여 랜덤 선택하며, CSS 애니메이션을 통해 룰렛이 회전합니다.
        - `click` 이벤트를 통해 선택된 결과를 모달 창으로 표시합니다.
    
2. **로또 번호 생성기 (lotto)**
    - **설명**: 돌리기 버튼을 눌러 로또 번호를 랜덤으로 생성합니다.
    - **기능 및 스크립트 기능**:
        - `click` 이벤트와 Math.random()을 사용하여 1부터 45까지의 랜덤 번호를 생성합니다.
        - `click` 이벤트를 통해 새로고침 없이 다시 번호를 생성할 수 있습니다.
        
3. **슬롯머신 (slot_machine)**
    - **설명**: 돌리기 버튼을 눌러 슬롯을 돌리고 랜덤한 결과를 확인합니다.
    - **기능 및 스크립트 기능**:
        - `click` 이벤트와 Math.random()을 사용하여 랜덤 결과를 생성하고, CSS 애니메이션을 통해 슬롯이 회전합니다.
        - `click` 이벤트를 통해 슬롯을 여러 번 돌릴 수 있습니다.

### 📌 순발력 기반 게임

<p align="center">
  <img src="https://github.com/user-attachments/assets/588d087b-3188-4f51-b998-c2c1efd13f0e" align="center" width="30%"/>
  <img src="https://github.com/user-attachments/assets/277e376b-b9ed-4b49-9f69-c42904c017a5" align="center" width="30%"/>
  <img src="https://github.com/user-attachments/assets/ef62b19a-5ef8-4990-92e3-9ab280060bcc" align="center" width="30%"/>
</p>

1. **반응속도 테스트 (reactionrate)**
    - **설명**: 화면이 초록색으로 바뀌면 최대한 빨리 클릭하여 자신의 반응속도를 테스트합니다.
    - **기능 및 스크립트 기능**:
        - `click` 이벤트와 Date 객체를 사용하여 반응 시간을 측정합니다.
        - `click` 이벤트를 통해 각 시도의 결과를 모달 창으로 표시합니다.
        
2. **스네이크 게임 (snake)**
    - **설명**: 방향키를 사용하여 뱀을 조종하고 먹이를 먹어 점수를 획득합니다. 먹이를 5개씩 먹을 때마다 속도가 빨라집니다.
    - **기능 및 스크립트 기능**:
        - `keydown` 이벤트 리스너를 통해 뱀을 조종하며, 먹이를 먹으면 점수를 획득합니다.
        - 점수를 실시간으로 기록하고 표시합니다.
        - 게임이 종료되면 `keydown` 이벤트와 조건문을 통해 결과를 모달 창으로 표시합니다.
    - ##추후 구현예정
        - 모바일에서 컨트롤(터치)부분 보완 예정
                
3. **얼음 부수기 (breakblock)**
    - **설명**: 빠르게 '누르기' 버튼을 클릭하여 50개의 얼음 블록을 부숩니다.
    - **기능 및 스크립트 기능**:
        - `click` 이벤트와 DOM 조작을 통해 얼음 블록을 생성하고, 클릭 시 제거합니다.
        - `click` 이벤트와 Date 객체를 사용하여 얼음을 모두 부수는 데 걸린 시간을 기록합니다.
        - 게임이 종료되면 `click` 이벤트를 통해 소요 시간을 모달 창으로 표시합니다.
        

### 📌 퍼즐 및 전략 기반 게임

<p align="center">
  <img src="https://github.com/user-attachments/assets/1f82be73-dd68-4b77-bda2-40ee7b632bf7" align="center" width="30%"/>
  <img src="https://github.com/user-attachments/assets/96798cec-0bd4-43b4-a786-cc3e8f7f7b0b" align="center" width="30%"/>
  <img src="https://github.com/user-attachments/assets/58e53084-767c-417f-8cb7-9b0f7e557267" align="center" width="30%"/>
</p>

1. **벽돌 깨기 (breakout)**
    - **설명**: 마우스를 사용하여 패들을 움직이고 공을 튕겨 벽돌을 깨트립니다.
    - **기능 및 스크립트 기능**:
        - `mousemove` 및 `touchmove` 이벤트 리스너를 통해 패들을 조종하며, 공을 튕깁니다.
        - 공이 벽돌에 닿으면 벽돌을 제거하고 점수를 기록합니다.
        - 게임이 종료되면 결과를 모달 창으로 표시합니다.
        
2. **가위바위보 (rps)**
    - **설명**: 가위, 바위, 보 중 하나를 선택하여 컴퓨터와 승부를 겨룹니다.
    - **기능 및 스크립트 기능**:
        - `click` 이벤트를 통해 사용자 입력을 받아 가위, 바위, 보를 선택합니다.
        - `click` 이벤트와 Math.random()을 사용하여 컴퓨터의 선택을 결정하고, 결과를 기록합니다.
        - 승리, 패배, 무승부 통계 표시: 게임 결과를 기반으로 통계를 표시합니다.
        
3. **카드 뒤집기 (cardmatching)**
    - **설명**: 여러 장의 카드 중 동일한 두 카드를 맞추는 게임입니다.
    - **기능 및 스크립트 기능**:
        - `click` 이벤트 리스너를 통해 카드를 뒤집습니다.
        - 배열을 사용하여 카드 상태를 관리하고, 동일한 두 카드를 찾으면 매칭을 확인합니다.
        - 모든 카드를 맞추면 `click` 이벤트를 통해 결과를 모달 창으로 표시합니다.

---

### 사용 기술 및 라이브러리

- **프레임워크**: 없음 (JavaScript, HTML, CSS 사용)
- **언어**: JavaScript, HTML, CSS
- **스타일링**: CSS
- **라이브러리**:
    - **Animate.css**: 애니메이션 효과를 위한 라이브러리
    - **LottieFiles**: 애니메이션을 위한 라이브러리
