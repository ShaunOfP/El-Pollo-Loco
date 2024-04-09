class ThrowableObject extends MovableObject {
    IMAGES_TO = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    splash = false;
    splash_audio = new Audio('./audio/bottle-splash.mp3');

    constructor(x, y) {
        super().loadImage('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_TO);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }


    /**
     * Visualizes the throw of a Bottle
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();

        setInterval(() => {
            if (this.splash == false) {
                this.playAnimation(this.IMAGES_TO);
                this.x += 10;
            } else if (this.splash == true) {
                this.bottleSplash();
            }
        }, 15);
    }

    
    /**
     * Plays the sound and animations for the Bottle-Splash
     */
    bottleSplash() {
        this.splash_audio.play();
        this.speedY = 0;
        this.acceleration = 0;
        this.applyGravity();
        this.playAnimation(this.IMAGES_SPLASH);
        setTimeout(() => {
            this.splash = false;
            this.splash_audio.pause();
        }, 50);
    }
}