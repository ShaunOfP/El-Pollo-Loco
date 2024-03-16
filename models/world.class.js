class World {
    character = new Character();
    endboss = new Endboss();
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
            this.bottleBar.setPercentage(this.bottleObjects.length * 20);
            setTimeout(() => { }, 1000);
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (enemy instanceof Chicken) {
                    if (this.character.isCollidingOnTop(enemy) && this.character.y < 180) {
                        enemy.dead = true;
                    } else {
                        if (enemy.dead == false) {
                            this.character.hit(10);
                            this.statusBar.setPercentage(this.character.energy);
                        }
                    }
                }
                if (enemy instanceof ChickenSmall) {
                    if (this.character.isCollidingOnTop(enemy) && this.character.y < 180) {
                        enemy.dead = true;
                    } else {
                        if (enemy.dead == false) {
                            this.character.hit(5);
                            this.statusBar.setPercentage(this.character.energy);
                        }
                    }
                }
            }

            if (this.throwableObjects.length != 0) {
                this.throwableObjects.forEach(object => {
                    //object entfernen, wenn es das canvas verlässt
                    if (object.y >= 400) {
                        this.throwableObjects.splice(object);
                    }

                    if (object.isColliding(enemy)) {
                        if (enemy instanceof Endboss) {
                            //hp abziehen vom Boss
                            console.log('Boss hit');
                            this.endboss.hit(50);
                            this.salsaBottle.splash();
                        } else {
                            console.log(enemy, ' hit with bottle');
                        }
                        // window.clearInterval(26);
                    }
                });
            }
        });

        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                this.bottleObjects.push(bottle);
                this.bottleBar.setPercentage(this.bottleObjects.length * 20);
                this.level.bottles.splice(0, 1);
                this.draw();
            }
        });

        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.collectableObjects.push(coin);
                this.coinBar.setPercentage(this.collectableObjects.length * 20);
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


    gameOver() {
        setTimeout(() => {
            this.clearAllIntervals();
            this.stopAllSounds();
        }, 1500);
    }


    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) {
            window.clearInterval(i);
        }
    }


    stopAllSounds() {
        this.character.walking_sound.pause();
        this.character.hurt_sound.pause();
        this.character.death_sound.pause();
        //alle adneren sounds
    }
}