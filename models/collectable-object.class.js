class CollectableObject extends MovableObject {
    IMAGES_COIN = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];
    offset = {
        top: 60,
        left: 60,
        right: 120,
        bottom: 120
    }
    
    constructor(x){
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = 200 - Math.random() * 150;
        this.width = 200;
        this.height = 200;
        this.animate();
    }

    /**
     * Animates the Coins
     */
    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 200);
    }
}