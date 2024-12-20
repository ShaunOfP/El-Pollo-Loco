class BottleBar extends DrawableObject {
    IMAGES_BOTTLEBAR = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];
    percentage = 0;


    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLEBAR);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }


    /**
     * calculates the percentage to display the correct image for the Bottlebar
     * @param {integer} percentage 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLEBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Returns the correct image for the Bottlebar based on the percentage
     * @returns an integer
     */
    resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        }
        else if (this.percentage <= 20) {
            return 1;
        }
        else if (this.percentage <= 40) {
            return 2;
        }
        else if (this.percentage <= 60) {
            return 3;
        }
        else if (this.percentage <= 80) {
            return 4;
        } else {
            return 5;
        }
    }
}