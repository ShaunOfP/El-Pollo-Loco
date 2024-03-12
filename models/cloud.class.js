class Cloud extends MovableObject {
    height = 250;
    width = 500;
    y = 20;
    
    constructor(imagePath, x){
        super().loadImage(imagePath);

        // this.x = Math.random() * 500;
        this.x = x;
        this.animate();
    }


    animate(){
        this.moveLeft();
    }
}