class Endboss extends MovableObject {
    height = 500;
    width = 300;
    y = -35;
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

    constructor() {
        super().loadImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACKING); //muss animiert werden
        this.loadImages(this.IMAGES_HURT); //muss animiert werden
        this.loadImages(this.IMAGES_DEAD); //muss animiert werden
        this.x = 2500;
        this.animate();
    }

    animate() {
        let i = 0;
        setInterval(() => {
            if (i < 8) {
                this.playAnimation(this.IMAGES_ALERT);
            } else {
                if (this.isDead()){
                    console.log('boss dead');
                    this.playAnimation(this.IMAGES_DEAD);
                    //victory screen
                } else if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                } else if (this.isAttacking()) {
                    this.playAnimation(this.IMAGES_ATTACKING);
                } else {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }

            i++;

            if (world.character.x > 2000 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
            }
        }, 200);
    }
}