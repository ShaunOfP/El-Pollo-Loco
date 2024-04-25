let game_over = new Audio('./audio/gameover.mp3');


function restart() {
    //d-none removen und hinzufügen
}


function toggleAudio(element){
    if (element.src.includes("music-muted.svg")){
        element.src = "./img/icons/music-toggle.svg";
        game_over.play();
    } else {
        element.src = "./img/icons/music-muted.svg";
        game_over.pause();
    }
}