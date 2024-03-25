let counter = 0;
let game_Theme = new Audio('./audio/main-theme.mp3');


function init() {

}

//doesnt work

window.matchMedia("(orientation: portait)").addEventListener("change", e => {
    const portrait = e.matches;

    if (portrait && (window.innerWidth < 550)) {
        alert("Please rotate your phone.");
        console.log("oi");
    }
});



function start() {
    window.location.href = "./index.html";
}


function toggleAudio(element) {
    counter++;
    if (counter % 2) {
        element.src = "./img/icons/music-toggle.svg";
        game_Theme.play();
    } else {
        element.src = "./img/icons/music-muted.svg";
        game_Theme.pause();
    }
}