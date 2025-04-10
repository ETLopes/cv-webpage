import * as PIXI from 'pixi.js';
import { Scene } from './Scene';

export class TestScene extends Scene {
  private sprite: PIXI.Sprite;
  private rotationSpeed: number = 5; // Rotations per second
  private elapsedTime: number = 0;

  constructor(app: PIXI.Application) {
    super(app);

    // Create a test sprite
    this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.sprite.width = 50;
    this.sprite.height = 50;
    this.sprite.tint = 0x00ff00; // Green color
    this.sprite.anchor.set(0.5);
  }

  public init(): void {
    super.init();

    // Position sprite in the center
    const { width, height } = this.app.screen;
    this.sprite.position.set(width / 2, height / 2);

    // Add sprite to the scene
    this.container.addChild(this.sprite);
  }

  public update(deltaTime: number): void {
    // Accumulate elapsed time
    this.elapsedTime += deltaTime;

    // Rotate the sprite (5 rotations per second)
    this.sprite.rotation = this.elapsedTime * this.rotationSpeed * Math.PI * 2;

    // Move in a circle
    const radius = 100;
    const orbitSpeed = 2; // Orbits per 10 seconds

    this.sprite.x = this.app.screen.width / 2 + Math.cos(this.elapsedTime * orbitSpeed) * radius;
    this.sprite.y = this.app.screen.height / 2 + Math.sin(this.elapsedTime * orbitSpeed) * radius;
  }

  public destroy(): void {
    this.sprite.destroy();
    super.destroy();
  }
}
