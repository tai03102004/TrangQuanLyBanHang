// product

const button = document.querySelector("button");
let timer;
let timer2;
const audio = new Audio("https://lasonotheque.org/UPLOAD/mp3/1417.mp3");

button.addEventListener("click", function () {
if (!this.classList.contains("added")) {
    clearTimeout(timer);
    clearTimeout(timer2);
}

const tapisRoulantDiv4 = document.querySelector(
    ".tapis-roulant>div:nth-child(4)>div"
);
const tapisRoulantDiv2 = document.querySelector(
    ".tapis-roulant>div:nth-child(2)>div"
);

if (this.classList.contains("tapis-roulant") && !this.classList.contains("added")) {
    if (tapisRoulantDiv4) tapisRoulantDiv4.style.animationPlayState = "paused";
    if (tapisRoulantDiv2) tapisRoulantDiv2.style.animationPlayState = "paused";
    this.style.pointerEvents = "none";
    this.classList.add("canceled");
    setTimeout(() => {
		this.style.pointerEvents = "initial";
		this.classList.remove("tapis-roulant");
		this.classList.remove("canceled");
    }, 1000);
}

if (!this.classList.contains("tapis-roulant")) {
    this.classList.add("tapis-roulant");
    if (tapisRoulantDiv4) tapisRoulantDiv4.style.animationPlayState = "running";
    if (tapisRoulantDiv2) tapisRoulantDiv2.style.animationPlayState = "running";
    timer = setTimeout(() => {
		this.classList.add("added");
		audio.play();
		this.style.pointerEvents = "none";
		timer2 = setTimeout(() => {
			this.classList.remove("added");
			this.classList.remove("tapis-roulant");
			this.style.pointerEvents = "initial";
		}, 1600);
    }, 1400);
}
});
