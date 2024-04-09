class Chicken extends MovableObject {
    y = 355;
    height = 60;
    width = 80;
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    chicken_sound = new Audio('audio/chicken.mp3');
    offset = {
        top: 0,
        left: 40,
        right: 0,
        bottom: 0
    }
    dead = false;
    soundPlayed = false;


    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400 + Math.random() * 1000;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }


    /**
     * Animates the Chicken walking or being dead
     */
    animate() {
        setInterval(() => this.moveLeft(), 1000 / 60);

        setInterval(() => {
            if (this.dead == true) {
                this.playAnimation(this.IMAGES_DEAD);
                this.speed = 0;
                if (this.soundPlayed == false) {
                    this.chicken_sound.play();
                    this.soundPlayed = true;
                }
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }
}