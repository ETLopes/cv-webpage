import * as PIXI from 'pixi.js';
import { Scene } from './Scene';

export class MainMenuScene extends Scene {
  private title: PIXI.Text;
  private startButton: PIXI.Text;

  constructor() {
    super();

    // Create title text
    this.title = new PIXI.Text('Meta Task', {
      fontFamily: 'Arial',
      fontSize: 48,
      fill: 0xffffff,
      align: 'center',
    });

    // Create start button
    this.startButton = new PIXI.Text('Start Game', {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 0xffffff,
      align: 'center',
    });

    // Make button interactive
    this.startButton.interactive = true;
    this.startButton.cursor = 'pointer';
  }

  create(): void {
    // Position title
    this.title.anchor.set(0.5);
    this.title.position.set(window.innerWidth / 2, 100);

    // Position button
    this.startButton.anchor.set(0.5);
    this.startButton.position.set(window.innerWidth / 2, 200);

    // Add to container
    this.container.addChild(this.title);
    this.container.addChild(this.startButton);
  }

  update(deltaTime: number): void {
    // Add any update logic here
  }

  destroy(): void {
    this.title.destroy();
    this.startButton.destroy();
    this.container.destroy({ children: true });
  }

  onStartClick(callback: () => void): void {
    this.startButton.on('pointerdown', callback);
  }
}
