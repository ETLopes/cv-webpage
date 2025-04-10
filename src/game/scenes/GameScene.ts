import * as PIXI from 'pixi.js';
import { Scene } from './Scene';
import { Character } from '../entities/Character';

interface InputState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

export class GameScene extends Scene {
  private character: Character;
  private inputState: InputState;
  private moveSpeed: number = 200; // pixels per second

  constructor(app: PIXI.Application) {
    super(app);

    this.character = new Character(app);
    this.inputState = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
  }

  public async init(): Promise<void> {
    super.init();

    // Load character animations
    await this.character.loadAnimations();

    // Add character to the scene
    this.container.addChild(this.character.getContainer());

    // Center character on screen
    const { width, height } = this.app.screen;
    this.character.setPosition(width / 2, height / 2);

    // Set up keyboard listeners
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    switch (event.key.toLowerCase()) {
      case 'w':
        this.inputState.up = true;
        break;
      case 's':
        this.inputState.down = true;
        break;
      case 'a':
        this.inputState.left = true;
        break;
      case 'd':
        this.inputState.right = true;
        break;
    }
    this.updateCharacterVelocity();
  };

  private handleKeyUp = (event: KeyboardEvent): void => {
    switch (event.key.toLowerCase()) {
      case 'w':
        this.inputState.up = false;
        break;
      case 's':
        this.inputState.down = false;
        break;
      case 'a':
        this.inputState.left = false;
        break;
      case 'd':
        this.inputState.right = false;
        break;
    }
    this.updateCharacterVelocity();
  };

  private updateCharacterVelocity(): void {
    let dx = 0;
    let dy = 0;

    if (this.inputState.up) dy -= 1;
    if (this.inputState.down) dy += 1;
    if (this.inputState.left) dx -= 1;
    if (this.inputState.right) dx += 1;

    // Normalize diagonal movement
    if (dx !== 0 && dy !== 0) {
      const normalizer = 1 / Math.sqrt(2);
      dx *= normalizer;
      dy *= normalizer;
    }

    // Apply movement speed
    dx *= this.moveSpeed;
    dy *= this.moveSpeed;

    this.character.setVelocity(dx, dy);
  }

  public update(deltaTime: number): void {
    this.character.update(deltaTime);
  }

  public destroy(): void {
    // Remove keyboard listeners
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);

    // Destroy character
    this.character.destroy();

    super.destroy();
  }
}
