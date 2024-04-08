class World {
    character = new Character();
    endboss = this.setEndboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();
    bossBar = new HealthBarBoss();
    salsaBottle = this.level.bottles;
    throwableObjects = [];
    collectableObjects = [];
    bottleObjects = [];
    throwActive = false;
    coin_pickup = new Audio('./audio/coin-pickup.mp3');
    bottle_pickup = new Audio('./audio/bottle-pickup.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * This searches for an object in the level1.js
     * @returns object of Endboss for level1
     */
    setEndboss() {
        for (const enemy of level1.enemies) {
            if (this.isEnemyBoss(enemy)) {
                return enemy;
            }
        }
    }


    /**
     * Allows the character and the endboss classes to use functions from the world class
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }


    /**
     * calls functions every .2 seconds 
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 50);
    }


    /**
     * checks for bottles and updates bottle bar
     */
    checkThrowObjects() {
        if (this.canThrowBottle()) {
            this.generateBottleAndUpdateArrayAndBottleBar();
        }
    }


    canThrowBottle() {
        return this.keyboard.THROW && this.bottleObjects.length != 0 && !this.throwActive;
    }


    generateBottleAndUpdateArrayAndBottleBar() {
        let bottle = new ThrowableObject(this.character.x + 70, this.character.y + 70);
        this.throwableObjects.push(bottle);
        this.bottleObjects.splice(0, 1);
        this.bottleBar.setPercentage(this.bottleObjects.length * 20);
        this.throwActive = true;
    }


    /**
     * looks for every kind of collision and the resulting action
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.isCharacterCollidingWithEnemy(enemy)) {
                if (this.isEnemyNormalChicken(enemy)) {
                    if (this.isCharacterAboveEnemy(enemy)) {
                        enemy.dead = true;
                    } else {
                        if (enemy.dead == false) {
                            this.characterTakesDamage(10);
                        }
                    }
                }
                if (this.isEnemySmallChicken(enemy)) {
                    if (this.isCharacterAboveEnemy(enemy)) {
                        enemy.dead = true;
                    } else {
                        if (enemy.dead == false) {
                            this.characterTakesDamage(5);
                        }
                    }
                }
                if (this.isEnemyBoss(enemy)) {
                    this.endbossAttack();
                }
            }

            if (this.areBottlesAvailable()) {
                this.throwableObjects.forEach(object => {
                    if (this.isBottleOutOfMap(object)) {
                        this.removeBottle(object);
                    }

                    if (this.isBottleHittingEnemy(object, enemy)) {
                        if (this.isEnemyBoss(enemy)) {
                            this.endbossDamaged(object);
                        } else if (this.isEnemyHitted(enemy)) {
                            this.enemyDead(enemy, object);
                        }
                        this.throwActive = false;
                    }
                });
            }
        });

        this.level.bottles.forEach(bottle => {
            if (this.characterCollidingWithBottle(bottle)) {
                this.bottlePickedUp(bottle);
            }
        });

        this.level.coins.forEach(coin => {
            if (this.characterCollidingWithCoin(coin)) {
                this.coinPickedUp(coin);
            }
        });
    }


    isCharacterCollidingWithEnemy(enemy){
        return this.character.isColliding(enemy);
    }


    isEnemyNormalChicken(enemy){
        return enemy instanceof Chicken;
    }


    isEnemySmallChicken(enemy) {
        return enemy instanceof ChickenSmall;
    }


    isCharacterAboveEnemy(enemy) {
        return this.character.isCollidingOnTop(enemy) && this.character.y < 180;
    }


    characterTakesDamage(damage) {
        this.character.hit(damage);
        this.statusBar.setPercentage(this.character.energy);
    }


    endbossAttack() {
        this.endboss.isAttacking = true;
        this.character.hit(15);
        this.statusBar.setPercentage(this.character.energy);
    }


    characterCollidingWithBottle(bottle) {
        return this.character.isColliding(bottle);
    }


    bottlePickedUp(bottle) {
        this.bottleObjects.push(bottle);
        this.bottle_pickup.play();
        this.bottleBar.setPercentage(this.bottleObjects.length * 20);
        this.level.bottles.splice(0, 1);
        this.draw();
    }


    characterCollidingWithCoin(coin) {
        return this.character.isColliding(coin);
    }


    coinPickedUp(coin) {
        this.collectableObjects.push(coin);
        this.coin_pickup.play();
        this.coinBar.setPercentage(this.collectableObjects.length * 20);
        this.level.coins.splice(0, 1);
        this.draw();
    }


    areBottlesAvailable() {
        return this.throwableObjects.length != 0;
    }


    isBottleOutOfMap(object) {
        return object.y >= 400;
    }


    removeBottle(object) {
        this.throwableObjects.splice(object);
        this.throwActive = false;
    }


    isBottleHittingEnemy(object, enemy) {
        return object.isColliding(enemy);
    }


    isEnemyBoss(enemy) {
        return enemy instanceof Endboss;
    }


    endbossDamaged(object) {
        this.endboss.hit(25);
        this.bossBar.setPercentage(this.endboss.energy);
        object.splash = true;
        setTimeout(() => {
            this.throwableObjects.splice(object);
        }, 25);
    }


    isEnemyHitted(enemy) {
        return enemy instanceof Chicken || enemy instanceof ChickenSmall;
    }


    enemyDead(enemy, object) {
        enemy.dead = true;
        object.splash = true;
        setTimeout(() => {
            this.throwableObjects.splice(object);
        }, 25);
    }


    /**
     * Draws the objects on the canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        // Space for fixed objects between me
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bossBar);
        //and me
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


    /**
     * this gives a single object from the given array to the addToMap function
     * @param {array} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    /**
     * this gives a single movable object to the draw function and checks if it should be mirrored or not
     * @param {object} mo
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx); //Hitbox einzeichnen
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * Mirrors an image/object
     * @param {object} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Flips image/object back to the normal position
     * @param {object} mo 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     * used to stop all sounds and intervals after a game over
     */
    gameOver() {
        setTimeout(() => {
            this.clearAllIntervals();
            this.stopAllSounds();
            this.moveToGameOverScreen();
        }, 1500);
    }


    /**
     * used to clear all intervals
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) {
            window.clearInterval(i);
        }
    }


    /**
     * used to stop all sounds
     */
    stopAllSounds() {
        this.character.walking_sound.pause();
        this.character.hurt_sound.pause();
    }


    moveToGameOverScreen() {
        if (this.character.energy == 0) {
            window.location.href = "./gameover-screen.html";
        }
        if (this.endboss.energy == 0) {
            window.location.href = "./gamewin-screen.html";
        }
    }
}