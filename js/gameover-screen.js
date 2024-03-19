let counter = 0;
let game_Theme = new Audio('./audio/gameover.mp3');


function restart() {
    window.location.href = "./index.html";
}


function toggleAudio(element){
    counter++;
    if (counter % 2){
        element.src = "./img/icons/music-toggle.svg";
        game_Theme.play();
    } else {
        element.src = "./img/icons/music-muted.svg";
        game_Theme.pause();
    }
}