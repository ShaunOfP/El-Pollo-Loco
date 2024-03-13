const level1 = new Level([
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new ChickenSmall(),
    new ChickenSmall(),
    new Endboss()
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
    new CollectableObject(300 + Math.random() * 100),
    new CollectableObject(600 + Math.random() * 250),
    new CollectableObject(900 + Math.random() * 300),
    new CollectableObject(1100 + Math.random() * 350),
    new CollectableObject(1400 + Math.random() * 400)
],
[
    new Bottle(400 + Math.random() * 100),
    new Bottle(600 + Math.random() * 300),
    new Bottle(900 + Math.random() * 300),
    new Bottle(1200 + Math.random() * 300),
    new Bottle(1500 + Math.random() * 300)
]);