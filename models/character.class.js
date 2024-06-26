class Character extends MovableObject {
    height = 240;
    width = 120;
    speed = 10;
    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_STANDING = [
        './img/2_character_pepe/1_idle/idle/I-1.png'
    ];
    walking_sound = new Audio('./audio/walking.mp3');
    hurt_sound = new Audio('./audio/hurt.mp3');
    death_sound = new Audio('./audio/dead.mp3');
    offset = {
        top: 85,
        left: 10,
        right: 5,
        bottom: 0
    }
    time_idle = 0;
    soundPlayed = false;
    muted;


    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_STANDING);
        this.applyGravity();
        this.animate();
    }


    /**
     * Animates the character actions
     */
    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.canMoveRight()) {
                this.moveCharacterRight();
            }

            if (this.canMoveLeft()) {
                this.moveCharacterLeft();
            }

            if (this.canJump()) {
                this.jump();
            }
            world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            this.hurt_sound.pause();
            this.characterAnimations();
        }, 50);
    }


    /**
     * Checks if the character can move to the right
     * @returns true or false
     */
    canMoveRight() {
        return world.keyboard.RIGHT && this.x < world.level.level_end_x;
    }


    /**
     * Lets the character to move the right
     */
    moveCharacterRight() {
        this.moveRight();
        this.otherDirection = false;
        if (!this.muted) {
            this.walking_sound.play();
        }
    }


    /**
     * Checks if the character can move to the left
     * @returns true or false
     */
    canMoveLeft() {
        return world.keyboard.LEFT && this.x > 0;
    }


    /**
     * Lets the character move to the left
     */
    moveCharacterLeft() {
        this.moveLeft();
        this.otherDirection = true;
        if (!this.muted) {
            this.walking_sound.play();
        }
    }


    /**
     * Checks if the character can jump
     * @returns true or false
     */
    canJump() {
        return (world.keyboard.UP || world.keyboard.SPACE) && !this.isAboveGround();
    }


    /**
     * Animates the different actions when the players health status changes
     */
    characterAnimations() {
        if (this.isDead()) {
            this.characterDead();
        } else if (this.isHurt()) {
            this.characterHurt();
        } else if (this.isAboveGround()) {
            this.processJumpStateImages();
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            if (world.keyboard.RIGHT || world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                this.time_idle = 0;
            } else {
                this.characterIdleAnimations();
            }
        }
    }


    /**
     * Enables animations and game over when the character health reaches 0
     */
    characterDead() {
        this.playAnimationOnce(this.IMAGES_DEAD);
        if (!this.soundPlayed && !this.muted) {
            this.death_sound.play();
            this.soundPlayed = true;
        }
        world.gameOver();
    }


    /**
     * Animates the character getting hurt
     */
    characterHurt() {
        this.playAnimation(this.IMAGES_HURT);
        if (!this.muted) {
            this.hurt_sound.play();
        }
    }


    /**
     * Manipulates the Animation by overwriting the currentImage of the playAnimation based on the State of the Jump
     */
    processJumpStateImages(){
        switch (Math.sign(this.speedY)) {
            case 1:
                if (this.currentImage >= 5) {
                    this.currentImage = 5;
                }
                break;
            case 0:
                this.currentImage = 5;
                break;
            case -1:
                if (this.currentImage >= 7) {
                    this.currentImage = 7;
                }
                break;
        }
    }


    /**
     * Animates the Idle-Animation of the character
     */
    characterIdleAnimations() {
        this.countUp();
        if (this.time_idle < 20) {
            this.playAnimation(this.IMAGES_STANDING);
        }
        if (this.time_idle > 80) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        }
        if (this.time_idle <= 80 && this.time_idle > 20) {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }


    /**
     * Increases a variable each second
     */
    countUp() {
        setTimeout(() => {
            this.time_idle++;
        }, 1000);
    }
}