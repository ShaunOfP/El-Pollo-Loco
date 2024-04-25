class Bottle extends MovableObject {
    IMAGES_BOTTLE = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];
    offset = {
        top: 0,
        left: 25,
        right: 25,
        bottom: 0
    }

    constructor(x) {
        super().loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = x;
        this.y = 350;
        this.width = 80;
        this.height = 80;
        this.animate();
    }


    /**
     * Animates the Bottles on the Ground
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 500);
    }
}