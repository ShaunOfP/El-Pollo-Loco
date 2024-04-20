let counter = 0;
let game_won = new Audio('./audio/win.mp3');


function restart() {
    window.location.href = "./start-screen.html";
}


function toggleAudio(element){
    counter++;
    if (counter % 2){
        element.src = "./img/icons/music-toggle.svg";
        game_won.play();
    } else {
        element.src = "./img/icons/music-muted.svg";
        game_won.pause();
    }
}