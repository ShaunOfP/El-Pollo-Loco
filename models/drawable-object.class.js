class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    uniqueImage = 0;
    x = 120;
    y = 180;
    height = 200;
    width = 150;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }


    /**
     * Loads an image from the provided path
     * @param {string} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Draws an image onto the canvas
     * @param {HTMLElement} ctx the canvas
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * Draws the Hitboxes with and without offset onto the canvas
     * @param {HTMLElement} ctx the canvas
     */
    drawFrame(ctx) {
        if (this.isObjectWithHitbox()) {
            this.debugDrawObjectBox(ctx);
        }

        if (this.isObjectWithHitbox()) {
            this.debugDrawHitBox(ctx);
        }
    }


    /**
     * Checks if an object is either a character, enemy (chicken, small chicken, boss) or a collectable (coin, bottle)
     * @returns true or false
     */
    isObjectWithHitbox() {
        return this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss || this instanceof CollectableObject || this instanceof Bottle;
    }


    /**
     * Draws the Hitbox of an object onto the canvas
     */
    debugDrawObjectBox(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }


    /**
     * Loads images from an Array to create an Animation
     * @param {Array} arr example: IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}