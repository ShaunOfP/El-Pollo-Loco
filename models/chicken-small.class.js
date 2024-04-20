class ChickenSmall extends MovableObject {
    y = 375;
    height = 40;
    width = 60;
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    offset = {
        top: 0,
        left: 40,
        right: 0,
        bottom: 0
    }
    dead = false;
    smallchicken_audio = new Audio('./audio/small-chicken.mp3'); // audio 
    soundPlayed = false;
    muted;

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 400 + Math.random() * 1000;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }


    /**
     * Animates the Small Chicken walking or being dead
     */
    animate() {
        setInterval(() => this.moveLeft(), 1000 / 60);

        setInterval(() => {
            if (this.dead == true) {
                this.speed = 0;
                this.playAnimation(this.IMAGES_DEAD);
                if (this.soundPlayed == false && !this.muted) {
                    this.smallchicken_audio.play();
                    this.soundPlayed = true;
                }
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }
}