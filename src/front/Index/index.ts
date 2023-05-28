import Phaser from "phaser";

import Example from "../@scene/Example";

document.addEventListener("DOMContentLoaded", () => {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.ENVELOP,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: document.getElementById("game"),
      width: 960,
      height: 540,
    },
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 },
      },
    },
    scene: Example,
  };

  const game = new Phaser.Game(config);
});
