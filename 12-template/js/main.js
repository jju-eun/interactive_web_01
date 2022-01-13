const frame = document.querySelector("section");
const lists = frame.querySelectorAll("article");
const deg = 45; //각각의 article 요소가 회전할 각도
const len = lists.length-1 //순번이 0부터 시작
let i = 0;

const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");
let num=0;
let active = 0;

const audio =frame.querySelectorAll("audio");

for (let el of lists) {
    let pic = el.querySelector(".pic");
    //각 article 요소를 45도씩 회전하고 아래로 배치
    el.style.transform = `rotate(${deg*i}deg) translateY(-100vh)`;
    pic.style.backgroundImage = `url(../12-template/img/member${i+1}.jpg)`;
    i++;
    //각 article 요소 안쪽의 재생, 정지, 처음부터 재생 버튼을 변수에 저장
    let play = el.querySelector(".play");
    let pause = el.querySelector(".pause");
    let load = el.querySelector(".load");

    //play 클릭 시
    play.addEventListener("click", e=>{
        let isActive = e.currentTarget.closest("article").classList.contains("on");
        if(isActive){
            //play 버튼부터 .pic 요소까지 탐색한 뒤 클래스 on 추가하여 활성화
            e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
            e.currentTarget.closest("article").querySelector(".pic").style.animationPlayState = "running";
            //play 버튼부터 audio 요소까지 탐색한 뒤 음악 재생
            e.currentTarget.closest("article").querySelector("audio").play();
        }
    });

    //pause 클릭 시
    pause.addEventListener("click", e=>{
        let isActive = e.currentTarget.closest("article").classList.contains("on");
        if(isActive){
            //pause 버튼부터 .pic 요소까지 탐색한 뒤 클래스에서 on 제거 비활성화
            e.currentTarget.closest("article").querySelector(".pic").style.animationPlayState = "paused";
            //play 버튼부터 audio 요소까지 탐색한 뒤 음악 정지
            e.currentTarget.closest("article").querySelector("audio").pause();
        }
    });
    //load 클릭 시
    load.addEventListener("click", e=>{
        let isActive = e.currentTarget.closest("article").classList.contains("on");
        if(isActive){
            //load 버튼 .pic 요소까지 탐색한 뒤 on 추가하여 활성화
            e.preventDefault;
            e.currentTarget.closest("article").querySelector(".pic").classList.remove("on");
            void e.currentTarget.closest("article").querySelector(".pic").offsetWidth;
            e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
            e.currentTarget.closest("article").querySelector(".pic").style.animationPlayState = "running";
            // e.currentTarget.closest("article").querySelector(".pic").classList.remove("on");
            // e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
            //load 버튼부터 audio 요소까지 탐색한 뒤 음악 다시 로드하고 재생
            e.currentTarget.closest("article").querySelector("audio").load();
            e.currentTarget.closest("article").querySelector("audio").play();
        }
    });
}


function activation(index, lists){
    for(let el of lists){
        el.classList.remove("on");
    }
    lists[index].classList.add("on");
}
//모든 오디오 요소를 반복하면서 정지시키고 .pic 요소의 모션을 중지해서 초기화하는 함수
function initMusic(){
    for(let el of audio){
        el.pause();
        el.load();
        el.parentElement.previousElementSibling.classList.remove("on");
    }
}

prev.addEventListener("click", ()=>{
    //음악 초가화 함수 호출
    initMusic();

    num++;
    frame.style.transform = `rotate(${deg*num}deg)`;

    //현재 패널의 순번이 0이면 다시 마지막 패널의 순번으로 변경하고
    //그렇지 않으면 현재 패널 순번에서 1식 감소시켜 activation 함수 호출
    (active ==0) ? active = len : active--;
    activation(active, lists)
});

next.addEventListener("click", ()=>{
    //음악 초가화 함수 호출
    initMusic();
    num--;
    frame.style.transform = `rotate(${deg*num}deg)`;

    //위와 같은 방식으로
    (active == len) ? active = 0 : active++;
    activation(active, lists);
});