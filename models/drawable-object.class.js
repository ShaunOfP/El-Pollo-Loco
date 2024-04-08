class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 180;
    height = 200;
    width = 150;
    offset = {
        top: 0,
        left: 0,
        right: 0,  //doppelter negativer wert von left (um viereck zu machen)
        bottom: 0  //doppelter negativer wert von top (um viereck zu machen)
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        if (this.isObjectWithHitbox()) {
            this.debugDrawObjectBox();
        }

        if (this.isObjectWithHitbox()) {
            this.debugDrawHitBox();
        }
    }


    isObjectWithHitbox() {
        return this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss || this instanceof CollectableObject || this instanceof Bottle;
    }


    debugDrawObjectBox() {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }


    debugDrawHitBox() {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width + this.offset.right, this.height + this.offset.bottom);
        ctx.stroke();
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}