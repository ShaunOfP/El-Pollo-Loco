class Endboss extends MovableObject {
    height = 500;
    width = 300;
    y = -35;
    speed = 25;
    hadFirstContact = false;
    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACKING = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    boss_sound = new Audio('audio/boss-chicken.mp3');
    isAttacking = false;
    offset = {
        top: 0,
        left: 20,
        right: -40,
        bottom: 0
    }
    muted;

    constructor() {
        super().loadImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.animate();
    }

    /**
     * Plays animations based on the state of the Bossfight
     */
    animate() {
        let i = 0;
        setInterval(() => {
            this.boss_sound.pause();
            if (i < 8) {
                this.playAnimation(this.IMAGES_ALERT);
            } else {
                this.endbossActions();
            }

            i++;

            if (world.character.x > 2000 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
            }
        }, 150);
    }


    /**
     * Animates the different actions of the Endboss
     */
    endbossActions(){
        if (this.isDead()){
            this.playAnimation(this.IMAGES_DEAD);
            this.world.gameOver();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            if (!this.muted){
                this.boss_sound.play();
            }
        } else if (this.isAttacking == true) {
            this.playAnimation(this.IMAGES_ATTACKING);
            setTimeout(() => {
                this.isAttacking = false;
            }, 500);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
            if (world.character.x < this.x && this.hadFirstContact){
                this.moveLeft();
            } else if (world.character.x > this.x){
                this.moveRight();
            }
        }
    }
}