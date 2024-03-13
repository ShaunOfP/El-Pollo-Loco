class Bottle extends MovableObject {
    IMAGES_BOTTLE = [
        '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];
    offsetY = 0;
    offsetX = 0;

    constructor(x) {
        super().loadImage('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = x;
        this.y = 350;
        this.width = 80;
        this.height = 80;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 500);
    }
}