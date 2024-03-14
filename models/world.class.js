class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();
    salsaBottle = new ThrowableObject();
    throwableObjects = [];
    collectableObjects = [];
    bottleObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * Gibt die World dem Character zur verfügung, damit Charcter auf World.class und seine Funktionen zugreifen kann
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * calls functions every .2 seconds 
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }


    checkThrowObjects() {
        if (this.keyboard.THROW && this.bottleObjects.length != 0) {
            let bottle = new ThrowableObject(this.character.x + 70, this.character.y + 70);
            this.throwableObjects.push(bottle);
            this.bottleObjects.splice(0, 1);
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (enemy instanceof Chicken) {
                    this.character.hit(10);
                    this.statusBar.setPercentage(this.character.energy);
                }
                if (enemy instanceof ChickenSmall) {
                    this.character.hit(5);
                    this.statusBar.setPercentage(this.character.energy);
                }
            }

            //über geworfene objekte iterieren
            if (this.throwableObjects.length != 0) {
                this.throwableObjects.forEach(object => {
                    //object entfernen, wenn es das canvas verlässt
                    if (object.y >= 400) {
                        this.throwableObjects.splice(object);
                    }

                    //überprüfen, ob bottle mit enemy kollidiert
                    if (object.isColliding(enemy)) {
                        if (enemy instanceof Endboss) {
                            //hp abziehen vom Boss
                            console.log('Boss hit');
                        } else {
                            console.log(enemy, ' hit with ', object);
                        }
                        this.salsaBottle.splash();
                    }
                });
            }
        });

        //zum aufheben von SalsaFalschen auf dem Boden
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                this.bottleObjects.push(bottle);
                this.bottleBar.setPercentage(this.bottleObjects.length * 20);
                this.level.bottles.splice(0, 1);
                this.draw();
            }
        });

        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)){
                console.log('Coin added');
                this.collectableObjects.push(coin);
                this.level.coins.splice(0, 1);
                this.draw();
            }
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        // Space for fixed objects

        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        //
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx); //Hitbox einzeichnen
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    gameOver(){
        
    }
}