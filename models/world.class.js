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
    muted;
    jumpVelocity;


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
            this.isCharacterJumpingUpOrDown();
            this.checkCollisions();
            this.checkThrowObjects();
        }, 25);
    }


    /**
     * checks for bottles and updates bottle bar
     */
    checkThrowObjects() {
        if (this.canThrowBottle()) {
            this.generateBottleAndUpdateArrayAndBottleBar();
        }
    }


    /**
     * Checks for a conditions to allow a bottle to be thrown
     * @returns true or false
     */
    canThrowBottle() {
        return this.keyboard.THROW && this.bottleObjects.length != 0 && !this.throwActive;
    }


    /**
     * Generates the new Bottle and modifies the Array for the Bottle-Bar
     */
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
                this.checkEnemyCollision(enemy);
            }
            this.checkBottleCollision(enemy);
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


    /**
     * Calls functions to check which enemy collided with the player
     * @param {object} enemy 
     */
    checkEnemyCollision(enemy) {
        this.checkNormalChickenCollision(enemy);
        this.checkSmallChickenCollision(enemy);
        this.checkBossCollision(enemy);
    }


    /**
     * Looks for a collision with a normal Chicken
     * @param {object} enemy 
     */
    checkNormalChickenCollision(enemy) {
        if (this.isEnemyNormalChicken(enemy)) {
            if (this.isCharacterAboveEnemy(enemy) && this.jumpVelocity == "down") {
                enemy.dead = true;
            } else {
                if (enemy.dead == false) {
                    this.characterTakesDamage(10);
                }
            }
        }
    }


    /**
     * Looks for a collision with a small Chicken
     * @param {object} enemy 
     */
    checkSmallChickenCollision(enemy) {
        if (this.isEnemySmallChicken(enemy)) {
            if (this.isCharacterAboveEnemy(enemy) && this.jumpVelocity == "down") {
                enemy.dead = true;
            } else {
                if (enemy.dead == false) {
                    this.characterTakesDamage(5);
                }
            }
        }
    }


    /**
     * Looks for a collision with a Boss Chicken
     * @param {object} enemy 
     */
    checkBossCollision(enemy) {
        if (this.isEnemyBoss(enemy)) {
            this.endbossAttack();
        }
    }


    /**
     * Looks for a bottle colliding with an enemy
     * @param {object} enemy 
     */
    checkBottleCollision(enemy) {
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
    }


    /**
     * Compares the y-coordinates of the character to determine if he is moving up/down or standing
     */
    isCharacterJumpingUpOrDown() {
        let previousY = this.character.y;
        let newerY;
        setTimeout(() => {
            newerY = this.character.y;
            if (newerY < previousY) {
                this.jumpVelocity = "up";
            } else if (newerY > previousY) {
                this.jumpVelocity = "down";
            } else if (newerY == previousY) {
                this.jumpVelocity = "balanced";
            }
        }, 50);
    }


    /**
     * Checks if the character is colliding with an enemy from the current Level
     * @param {object} enemy 
     * @returns true or false
     */
    isCharacterCollidingWithEnemy(enemy) {
        return this.character.isColliding(enemy);
    }


    /**
     * Checks if the enemy is an instance of Chicken
     * @param {object} enemy 
     * @returns true or false
     */
    isEnemyNormalChicken(enemy) {
        return enemy instanceof Chicken;
    }


    /**
     * Checks if the enemy is an instance of ChickenSmall
     * @param {object} enemy 
     * @returns true or false
     */
    isEnemySmallChicken(enemy) {
        return enemy instanceof ChickenSmall;
    }


    /**
     * Checks if the collision is a jump on the enemy's head
     * @param {object} enemy 
     * @returns true or false
     */
    isCharacterAboveEnemy(enemy) {
        return this.character.isCollidingOnTop(enemy) && this.character.y < 180;
    }


    /**
     * Applies the Damage to the character and refreshes the Healthbar
     * @param {integer} damage 
     */
    characterTakesDamage(damage) {
        this.character.hit(damage);
        this.statusBar.setPercentage(this.character.energy);
    }


    /**
     * Used to let the Endboss attack the character
     */
    endbossAttack() {
        this.endboss.isAttacking = true;
        this.character.hit(15);
        this.statusBar.setPercentage(this.character.energy);
    }


    /**
     * Checks if the character is colliding with a Bottle(pickup)
     * @param {object} bottle 
     * @returns true or false
     */
    characterCollidingWithBottle(bottle) {
        return this.character.isColliding(bottle);
    }


    /**
     * Visualizes the Pickup of a Bottle for the Player
     * @param {object} bottle 
     */
    bottlePickedUp(bottle) {
        this.bottleObjects.push(bottle);
        if (!this.muted) {
            this.bottle_pickup.play();
        }
        this.bottleBar.setPercentage(this.bottleObjects.length * 20);
        this.level.bottles.splice(0, 1);
        this.draw();
    }


    /**
     * Checks if the character is colliding with a Coin (pickup)
     * @param {object} coin 
     * @returns true or false
     */
    characterCollidingWithCoin(coin) {
        return this.character.isColliding(coin);
    }


    /**
     * Visualizes the Pickup of a Coin for the Player
     * @param {object} coin 
     */
    coinPickedUp(coin) {
        this.collectableObjects.push(coin);
        if (!this.muted) {
            this.coin_pickup.play();
        }
        this.coinBar.setPercentage(this.collectableObjects.length * 20);
        this.level.coins.splice(0, 1);
        this.draw();
    }


    /**
     * Checks if bottles are available to throw
     * @returns true or false
     */
    areBottlesAvailable() {
        return this.throwableObjects.length != 0;
    }


    /**
     * Checks if a bottle has left the Gamescreen
     * @param {object} object 
     * @returns true or false
     */
    isBottleOutOfMap(object) {
        return object.y >= 400;
    }


    /**
     * Removes a bottle from the Bottle-Array and reactivates the ability to throw a Bottle
     * @param {object} object 
     */
    removeBottle(object) {
        this.throwableObjects.splice(object);
        this.throwActive = false;
    }


    /**
     * Checks if a thrown Bottle has hit an enemy
     * @param {object} object 
     * @param {object} enemy 
     * @returns true or false
     */
    isBottleHittingEnemy(object, enemy) {
        return object.isColliding(enemy);
    }


    /**
     * Checks if the hitted enemy is a Boss
     * @param {object} enemy 
     * @returns true or false
     */
    isEnemyBoss(enemy) {
        return enemy instanceof Endboss;
    }


    /**
     * Calculates the damage dealt to the Endboss and updates the Boss-Healthbar
     * @param {object} object 
     */
    endbossDamaged(object) {
        this.endboss.hit(25);
        this.bossBar.setPercentage(this.endboss.energy);
        object.splash = true;
        setTimeout(() => {
            this.throwableObjects.splice(object);
        }, 25);
    }


    /**
     * Checks if the hitted enemy is a normal enemy (not a Boss)
     * @param {object} enemy 
     * @returns true or false
     */
    isEnemyHitted(enemy) {
        return enemy instanceof Chicken || enemy instanceof ChickenSmall;
    }


    /**
     * Visualizes the death of a normal enemy when hit with a bottle
     * @param {object} enemy 
     * @param {object} object 
     */
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


    /**
     * Displays the Gameoverscreen when either of the conditions are met
     */
    moveToGameOverScreen() {
        if (this.character.energy == 0) {
            initLose();
        }
        if (this.endboss.energy == 0) {
            initWin();
        }
    }
}