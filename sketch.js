let bgcolor;
let activeBtn;

function setup() {
  createCanvas(windowWidth, windowHeight);
  setShakeThreshold(30);
  bgcolor = color(0, 255, 0);
  activeBtn = createButton("Activate Sensors");
  activeBtn.position(30, 40);
  activeBtn.mousePressed(activateSensors);
}

function draw() {
  background(bgcolor);
}

function deviceShaken() {
  bgcolor = color(random(255), random(255), random(255));
}

// 센서 활성화 함수 (사용자 상호작용 필요)
function activateSensors() {
  // p5.js가 제공하는 유틸리티 함수
  // DeviceOrientationEvent : 모바일 기기의 방향 센서 접근
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          console.log("센서 접근 허용됨");
        } else {
          console.log("센서 접근 거부됨");
        }
      })
      .catch(console.error);
  }
  // 버튼을 숨기거나 제거하여 중복 클릭 방지
  this.remove();
}
