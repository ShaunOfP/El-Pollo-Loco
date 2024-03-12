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
        //einfügen dass array mit bottles nicht leer sein darf
        if (this.keyboard.THROW) {
            let bottle = new ThrowableObject(this.character.x + 70, this.character.y + 70);
            this.throwableObjects.push(bottle);
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

            if (this.throwableObjects.length != 0) {
                this.throwableObjects.forEach(object => {
                    if (object.y >= 355){
                        this.throwableObjects.splice(object);
                    }

                    if (object.isColliding(enemy)) {
                        if (enemy instanceof Endboss) {

                        } else {
                            console.log(enemy, ' hit with ', object);
                        }
                        // this.salsaBottle.splash();
                    }
                });
            }
        });

        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                console.log('Bottles total: ', this.bottleObjects.length);
                this.bottleObjects.push(bottle);
                //bottle entfernen
                // this.ctx.bottle.clearRect(bottle.x, bottle.y, bottle.width, bottle.height);
            }
        });

        // this.level.collectableObjects.forEach((colletable) => {
        //     if (this.character.isColliding(colletable)){
        //         // einsammeln von objekten
        //     }
        // });
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
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
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
        // mo.drawFrame(this.ctx); Hitbox einzeichnen
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



}