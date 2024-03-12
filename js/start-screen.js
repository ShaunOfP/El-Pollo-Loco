let counter = 0;

function init(){
    //music startscreen
}


function start() {
    window.location.href = "../index.html";
}


function toggleAudio(element){
    counter++;
    if (counter % 2){
        element.src = "/img/icons/music-muted.svg";
        //stop music
    } else {
        element.src = "/img/icons/music-toggle.svg";
        //play music
    }
}