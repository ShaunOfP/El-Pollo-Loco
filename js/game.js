let canvas;
let world;
let keyboard = new Keyboard();
let counter = 0;
let muteInterval;


function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


window.addEventListener('touchstart', e => {
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