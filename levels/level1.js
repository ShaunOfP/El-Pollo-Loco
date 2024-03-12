const level1 = new Level([
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Endboss(),
    new ChickenSmall(),
    new ChickenSmall()
],
[
    new Cloud('../img/5_background/layers/4_clouds/1.png', -20),
    new Cloud('../img/5_background/layers/4_clouds/2.png', 300),
    new Cloud('../img/5_background/layers/4_clouds/1.png', 700),
    new Cloud('../img/5_background/layers/4_clouds/2.png', 1000),
    new Cloud('../img/5_background/layers/4_clouds/1.png', 1300),
    new Cloud('../img/5_background/layers/4_clouds/2.png', 1600)
],
[
    new BackgroundObject('../img/5_background/layers/air.png', -719),
    new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', -719),
    new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', -719),
    new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', -719),
    new BackgroundObject('../img/5_background/layers/air.png', 0),
    new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0),
    new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0),
    new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0),
    new BackgroundObject('../img/5_background/layers/air.png', 719),
    new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719),
    new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719),
    new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719),
    new BackgroundObject('../img/5_background/layers/air.png', 719*2),
    new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 719*2),
    new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 719*2),
    new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 719*2),
    new BackgroundObject('../img/5_background/layers/air.png', 719*3),
    new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719*3),
    new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719*3),
    new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719*3)
],
[
    new CollectableObject(),
    new CollectableObject(),
    new CollectableObject(),
    new CollectableObject(),
    new CollectableObject()
],
[
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle()
]);