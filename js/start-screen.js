let counter = 0;
let game_Theme = new Audio('../audio/main-theme.mp3');

function init(){
    game_Theme.play();
}


function start() {
    window.location.href = "../index.html";
}


function toggleAudio(element){
    counter++;
    if (counter % 2){
        element.src = "/img/icons/music-muted.svg";
        game_Theme.pause();
    } else {
        element.src = "/img/icons/music-toggle.svg";
        game_Theme.play();
    }
}