import Phaser from "phaser";

export default class Example extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("bg", "assets/backgrounds/background.png");
  }

  create() {
    this.add.image(400, 300, "bg");

    const text = this.add.text(0, 0, "Example Scene", { color: "#000" });
    const textContainer = this.add.container(0, 0, [text]);
    this.physics.world.enableBody(textContainer);
    if (!(textContainer.body instanceof Phaser.Physics.Arcade.Body)) return;

    textContainer.body.setVelocity(100, 200);
    textContainer.body.setBounce(1, 1);
    textContainer.body.setCollideWorldBounds(true);
  }
}
