class Cloud extends MovableObject {
    height = 250;
    width = 500;
    y = 20;
    
    constructor(imagePath, x){
        super().loadImage(imagePath);

        this.x = x;
        this.animate();
    }


    /**
     * Animates the Clouds to move to the left of the screen
     */
    animate(){
        this.moveLeft();
    }
}