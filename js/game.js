let canvas;
let world;
let keyboard = new Keyboard();
let counter = 0;
let muteInterval;
let game_Theme = new Audio('./audio/main-theme.mp3');
let game_won = new Audio('./audio/win.mp3');
let game_over = new Audio('./audio/gameover.mp3');


function start() {
    document.getElementById('startScreen').classList.add("d-none");
    document.getElementById('gameContainer').classList.remove("d-none");
    init();
}


function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function initWin() {
    document.getElementById('gameContainer').classList.add("d-none");
    document.getElementById('gameWin').classList.remove("d-none");
}


function initLose() {
    document.getElementById('gameContainer').classList.add("d-none");
    document.getElementById('gameLose').classList.remove("d-none");
}


function restart() {
    document.getElementById('gameWin').classList.add("d-none");
    document.getElementById('gameLose').classList.add("d-none");
    document.getElementById('startScreen').classList.remove("d-none");
}


function toggleAudio(element) {
    if (element.src.includes("music-muted.svg")) {
        element.src = "./img/icons/music-toggle.svg";
        switch (element.id) {
            case "mainMenuMusic":
                game_Theme.play();
                break;
            case "winMusic":
                game_won.play();
                break;
            case "loseMusic":
                game_over.play();
                break;
        }
    } else {
        element.src = "./img/icons/music-muted.svg";
        switch (element.id) {
            case "mainMenuMusic":
                game_Theme.pause();
                break;
            case "winMusic":
                game_won.pause();
                break;
            case "loseMusic":
                game_over.pause();
                break;
        }
    }
}


function toggleMobileGTC() {
    let menu = document.getElementById('mobileGTCToggle');
    menu.classList.toggle('d-none');
}


window.addEventListener('touchstart', e => {
    e.defaultPrevented = true;
    if (e.target instanceof HTMLImageElement) {
        switch (e.target.parentElement.id) {
            case ("mobileLeft"):
                keyboard.LEFT = true;
                break;
            case ("mobileRight"):
                keyboard.RIGHT = true;
                break;
            case ("mobileJump"):
                keyboard.SPACE = true;
                break;
            case ("mobileThrow"):
                keyboard.THROW = true;
                break;

        }
    }
    switch (e.target.id) {
        case ("mobileLeft"):
            keyboard.LEFT = true;
            break;
        case ("mobileRight"):
            keyboard.RIGHT = true;
            break;
        case ("mobileJump"):
            keyboard.SPACE = true;
            break;
        case ("mobileThrow"):
            keyboard.THROW = true;
            break;
    }
});


window.addEventListener('touchend', e => {
    if (e.target instanceof HTMLImageElement) {
        switch (e.target.parentElement.id) {
            case ("mobileLeft"):
                keyboard.LEFT = false;
                break;
            case ("mobileRight"):
                keyboard.RIGHT = false;
                break;
            case ("mobileJump"):
                keyboard.SPACE = false;
                break;
            case ("mobileThrow"):
                keyboard.THROW = false;
                break;

        }
    }
    switch (e.target.id) {
        case ("mobileLeft"):
            keyboard.LEFT = false;
            break;
        case ("mobileRight"):
            keyboard.RIGHT = false;
            break;
        case ("mobileJump"):
            keyboard.SPACE = false;
            break;
        case ("mobileThrow"):
            keyboard.THROW = false;
            break;
    }
});


function toggleFullscreen() {
    counter++;
    let game = document.getElementById('canvas');

    if (counter % 2) {
        if (game.requestFullScreen) {
            game.requestFullscreen();
            counter = 0;
        }
        else if (game.webkitRequestFullScreen) {
            game.webkitRequestFullscreen();
            counter = 0;
        }
        else if (game.mozRequestFullScreen) {
            game.mozRequestFullscreen();
            counter = 0;
        }
    }
}


window.addEventListener('keydown', (event) => {
    switch (event['code']) {
        case ('Space'):
            keyboard.SPACE = true;
            break;
        case ('ArrowLeft'):
            keyboard.LEFT = true;
            break;
        case ('ArrowUp'):
            keyboard.UP = true;
            break;
        case ('ArrowRight'):
            keyboard.RIGHT = true;
            break;
        case ('ArrowDown'):
            keyboard.DOWN = true;
            break;
        case ('KeyD'):
            keyboard.THROW = true;
            break;
        default:
            break;
    }
});


window.addEventListener('keyup', (event) => {
    switch (event['code']) {
        case ('Space'):
            keyboard.SPACE = false;
            break;
        case ('ArrowLeft'):
            keyboard.LEFT = false;
            break;
        case ('ArrowUp'):
            keyboard.UP = false;
            break;
        case ('ArrowRight'):
            keyboard.RIGHT = false;
            break;
        case ('ArrowDown'):
            keyboard.DOWN = false;
            break;
        case ('KeyD'):
            keyboard.THROW = false;
            break;
        default:
            break;
    }
});


function toggleGameAudio(element) {
    clearInterval(muteInterval);
    if (element.src.includes("music-muted.svg")) {
        element.src = "./img/icons/music-toggle.svg";
        world.character.muted = false;
        world.level.enemies.map(enemy => {
            enemy.muted = false;
        });
        muteInterval = setInterval(() => {
            if (world.throwableObjects.length != 0) {
                world.throwableObjects.map(bottle => {
                    bottle.muted = false;
                });
            }
        }, 100);
        world.muted = false;
    } else {
        element.src = "./img/icons/music-muted.svg";
        world.character.muted = true;
        world.level.enemies.map(enemy => {
            enemy.muted = true;
        });
        muteInterval = setInterval(() => {
            if (world.throwableObjects.length != 0) {
                world.throwableObjects.map(bottle => {
                    bottle.muted = true;
                });
            }
        }, 100);
        world.muted = true;
    }
}