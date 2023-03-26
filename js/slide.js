let center, right, left;


const updateMainContents = () => {
    center = document.querySelector("#main .main-content.center");
    right = document.querySelector("#main .main-content.right");
    left = document.querySelector("#main .main-content.left");
}

updateMainContents();

document.querySelectorAll("#main .main-content")
    .forEach(n => {

        n.style.backgroundImage = `url(${n.getAttribute("bg")})`;

    });

const main = document.getElementById("main");

let click = false;
let initClick;
let maxWidth;

const setTransition = transition => {
    right.style.transition = transition;
    center.style.transition = transition;
    left.style.transition = transition;
}

function startMove(e){
    click = true;
    initClick = e.clientX ?? e.touches[0].clientX;
    maxWidth = main.clientWidth
    initClick - 1;
    updateMainContents();

    setTransition("transform 0s");
}

main.addEventListener("mousedown", e => {
    if(e.button == 0) {
        startMove(e);
    }
});

main.addEventListener("touchstart", startMove);

function closeSlide(){
    click = false;
    if(currentPositionElement(right) <= 50){
        rotateLeft();
    }else if(currentPositionElement(left) >= -50){
        rotateRight();
    }else{
        returnCenter();
    }

    document.querySelector("#main .button-image.focus").classList.remove("focus");
    // console.log(main.__proto__); //HTMLElement
    updateMainContents();
    document.querySelector(`#main .button-image:nth-child(${main.getNthChild(center)+1})`).classList.add("focus");
}

main.addEventListener("mouseup", e => {
    if(e.button == 0){
        closeSlide()
    }
});

main.addEventListener("touchend", closeSlide);


function endMove(){
    if(click) closeSlide();
}

main.addEventListener("mouseleave", endMove);
main.addEventListener("touchleave", endMove);

function rotateLeft(){

    setTransition("");

    right.classList.remove("right");
    right.classList.add("center");

    center.classList.remove("center");
    center.classList.add("left");

    left.style.transition = "transform 0s";
    left.style.transform = "";
    left.classList.remove("left");
    left.classList.add("right");

    right.style.transform = "";
    center.style.transform = "";
}

function rotateRight(){
    setTransition("");

    left.classList.remove("left");
    left.classList.add("center");

    center.classList.remove("center");
    center.classList.add("right");

    right.style.transition = "transform 0s";
    right.style.transform = "";
    right.classList.remove("right");
    right.classList.add("left");


    center.style.transform = "";
    left.style.transform = "";

}

function returnCenter(){
    setTransition("");

    right.style.transform = "";
    center.style.transform = "";
    left.style.transform = "";
}

console.log(document.querySelector("#main .main-content").getBoundingClientRect().x);

const mainWidth = main.clientWidth - 1;

const currentPositionElement = element => (element.getBoundingClientRect().x / mainWidth)*100;

function movingSlide(e){

    if(!click) return;

    let moving = (((e.clientX ?? e.touches[0].clientX) - initClick) / mainWidth)*100;

    updateMainContents();

    center.style.transform = `translateX(${moving}%)`;
    right.style.transform = `translateX(calc(100% + ${moving}%))`;
    left.style.transform = `translateX(calc(-100% + ${moving}%))`;


}

main.addEventListener("mousemove", movingSlide);

main.addEventListener("touchmove", movingSlide);

const buttons_image_container = document.querySelector("#main .buttons-image-container");

document.querySelectorAll("#main .buttons-image-container .button-image")
    .forEach(n => n.addEventListener("click", e => {

        updateMainContents();

        console.log(right);

        center.classList.remove("center");
        right.classList.remove("right");
        left.classList.remove("left");

        console.log(right);

        center = document.querySelector(`#main .main-content:nth-child(${buttons_image_container.getNthChild(e.target)+1})`);
        center.classList.add("center");

        right = document.querySelector(`#main .main-content:nth-child(${buttons_image_container.getNthChild(e.target)+2})`) ?? document.querySelector(`#main .main-content:nth-child(1)`);
        right.classList.add("right");

        left = document.querySelector(`#main .main-content:nth-child(${buttons_image_container.getNthChild(e.target)})`) ?? document.querySelector(`#main .main-content:nth-child(3)`);
        left.classList.add("left");

        document.querySelector("#main .button-image.focus").classList.remove("focus");
        e.target.classList.add("focus");
    }));