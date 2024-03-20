let canvas;
let world;
let keyboard = new Keyboard();
let counter = 0;
const elementIDs = ['mobileLeft', 'mobileRight', 'mobileJump', 'mobileThrow'];


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    elementIDs.forEach(id => {
        const element = document.getElementById(id);

        switch (element){
            case ('mobileLeft'):
                element.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    keyboard.LEFT = true;
                });
                element.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    keyboard.LEFT = false;
                });
            break;
            case ('mobileRight'):
                element.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    keyboard.RIGHT = true;
                });
                element.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    keyboard.RIGHT = false;
                });
            break;
            case ('mobileJump'):
                element.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    keyboard.SPACE = true;
                });
                element.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    keyboard.SPACE = false;
                });
            break;
            case ('mobileThrow'):
                element.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    keyboard.THROW = true;
                });
                element.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    keyboard.THROW = false;
                });
            break;
        }
    });
}


function toggleFullscreen() {
    counter++;
    let game = document.getElementById('gameContainer');
    let shrinkBtn = document.getElementById('toggleBtn');

    if (counter % 2) {
        if (game.requestFullScreen) {
            game.requestFullscreen();
            shrinkBtn.src = './img/icons/go-normalscreen.svg';
            shrinkBtn.style.filter = 'invert(73%) sepia(19%) saturate(2522%) hue-rotate(357deg) brightness(103%) contrast(102%)';
        }
        else if (game.webkitRequestFullScreen) {
            game.webkitRequestFullscreen();
            shrinkBtn.src = './img/icons/go-normalscreen.svg';
            shrinkBtn.style.filter = 'invert(73%) sepia(19%) saturate(2522%) hue-rotate(357deg) brightness(103%) contrast(102%)';
        }
        else if (game.mozRequestFullScreen) {
            game.mozRequestFullscreen();
            shrinkBtn.src = './img/icons/go-normalscreen.svg';
            shrinkBtn.style.filter = 'invert(73%) sepia(19%) saturate(2522%) hue-rotate(357deg) brightness(103%) contrast(102%)';
        }
    } else {
        document.exitFullscreen();
        shrinkBtn.src = './img/icons/go-fullscreen.svg';
        shrinkBtn.style.filter = 'invert(0%) sepia(6%) saturate(2850%) hue-rotate(60deg) brightness(93%) contrast(104%)';
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