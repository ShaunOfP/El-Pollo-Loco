class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;


    /**
     * Applies a gravity-like effect to an object
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }


    /**
     * Checks if an object above ground is a Bottle or the Character
     * @returns true or (true or false)
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }


    /**
     * Used to play animations by loading image after image from an array
     * @param {array} images [
     *  '../img/path',
     *  '../img/path'
     * ]
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Plays an animation only once, currently only purpose to animate the Death of the character
     * @param {array} images [
     *  '../img/path',
     *  '../img/path'
     * ]
     */
    playAnimationOnce(images){
        let i = this.uniqueImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        
        if (this.uniqueImage == images.length){
            path = images[images.length - 1];
            this.img = this.imageCache[path];
        } else {
            this.uniqueImage++;
        }
    }


    /**
     * Animates walking to the right side
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Aniamtes walking to the left side
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * Animates a jump
     */
    jump() {
        this.speedY = 30;
    }


    /**
     * Checks if the hitboxes of the character/bottle is colliding with an enemy
     * @param {object} obj 
     * @returns true or false
     */
    isColliding(obj) {
        return (this.x + this.width - this.offset.right) > (obj.x + obj.offset.left) &&
            (this.y + this.height - this.offset.bottom) > (obj.y + obj.offset.top) &&
            (this.x + this.offset.left) < (obj.x + obj.width - obj.offset.right) &&
            (this.y + this.offset.top) < (obj.y + obj.height - obj.offset.bottom);
    }


    /**
     * Checks if the character is jumping on the enemies head
     * @param {object} obj 
     * @returns true or false
     */
    isCollidingOnTop(obj) {
        return (this.y + this.height - this.offset.bottom) && ((this.y + this.height - this.offset.bottom) + (this.x + this.width - this.offset.right))
        > ((obj.y + obj.offset.top) && (obj.x + obj.width - obj.offset.right));
    }


    /**
     * Checks wether the character is alive and damage should be applied or if the character is dead
     * @param {integer} dmg 
     */
    hit(dmg) {
        this.energy -= dmg;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Used to delay the time when the character can take damage
     * @returns true or false
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    /**
     * Returns if a unit(enemy/character) is dead
     * @returns true or false
     */
    isDead() {
        return this.energy == 0;
    }
}