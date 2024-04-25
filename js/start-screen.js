let game_Theme = new Audio('./audio/main-theme.mp3');


function start() {
    document.getElementById('startScreen').classList.add("d-none");
    document.getElementById('gameContainer').classList.remove("d-none");
    init();
}


function toggleAudio(element) {
    if (element.src.includes("music-muted.svg")) {
        element.src = "./img/icons/music-toggle.svg";
        game_Theme.play();
    } else {
        element.src = "./img/icons/music-muted.svg";
        game_Theme.pause();
    }
}


function toggleMobileGTC(){
    let menu = document.getElementById('mobileGTCToggle');
    menu.classList.toggle('d-none');
}