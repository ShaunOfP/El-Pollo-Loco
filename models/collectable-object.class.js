class CollectableObject extends MovableObject {
    IMAGES_COIN = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png'
    ];
    offsetY = 0;
    
    constructor(){
        super().loadImage('../img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 400 + Math.random() * 1500;
        this.y = 200 - Math.random() * 150;
        this.width = 200;
        this.height = 200;
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 200);
    }
}