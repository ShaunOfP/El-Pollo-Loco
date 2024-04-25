let game_won = new Audio('./audio/win.mp3');


function restart() {
    //d-none removen und hinzufügen
}


function toggleAudio(element){
    if (element.src.includes("music-muted.svg")){
        element.src = "./img/icons/music-toggle.svg";
        game_won.play();
    } else {
        element.src = "./img/icons/music-muted.svg";
        game_won.pause();
    }
}