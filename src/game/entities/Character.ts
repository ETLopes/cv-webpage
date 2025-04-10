import * as PIXI from 'pixi.js';

export enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum AnimationState {
  IDLE = 'idle',
  WALKING = 'walking',
}

interface CharacterState {
  position: PIXI.Point;
  direction: Direction;
  animationState: AnimationState;
  velocity: PIXI.Point;
}

export class Character {
  private container: PIXI.Container;
  private sprite: PIXI.Sprite;
  private animations: Map<string, PIXI.Texture[]>;
  private currentAnimation: PIXI.Texture[];
  private animationFrame: number;
  private animationSpeed: number;
  private elapsedTime: number;
  private state: CharacterState;
  private app: PIXI.Application;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.container = new PIXI.Container();
    this.animations = new Map();
    this.currentAnimation = [];
    this.animationFrame = 0;
    this.animationSpeed = 1 / 12; // 12 FPS for animations
    this.elapsedTime = 0;

    // Initialize with a placeholder sprite until we load the proper textures
    this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.sprite.width = 32;
    this.sprite.height = 32;
    this.sprite.anchor.set(0.5);
    this.container.addChild(this.sprite);

    // Initialize state
    this.state = {
      position: new PIXI.Point(0, 0),
      direction: Direction.DOWN,
      animationState: AnimationState.IDLE,
      velocity: new PIXI.Point(0, 0),
    };

    // Position the container based on state
    this.container.position.copyFrom(this.state.position);
  }

  public async loadAnimations(): Promise<void> {
    // TODO: Load actual character sprite sheets
    // For now, we'll create colored rectangles for different states
    const directions = [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT];
    const states = [AnimationState.IDLE, AnimationState.WALKING];

    directions.forEach(direction => {
      states.forEach(state => {
        const frames: PIXI.Texture[] = [];
        const frameCount = state === AnimationState.IDLE ? 1 : 4;

        for (let i = 0; i < frameCount; i++) {
          const graphics = new PIXI.Graphics();
          graphics.beginFill(state === AnimationState.IDLE ? 0x3366ff : 0x33cc99);
          graphics.drawRect(0, 0, 32, 32);
          graphics.endFill();

          // Add direction indicator
          graphics.beginFill(0xffffff);
          switch (direction) {
            case Direction.UP:
              graphics.moveTo(16, 0);
              graphics.lineTo(32, 32);
              graphics.lineTo(0, 32);
              graphics.lineTo(16, 0);
              break;
            case Direction.DOWN:
              graphics.moveTo(0, 0);
              graphics.lineTo(32, 0);
              graphics.lineTo(16, 32);
              graphics.lineTo(0, 0);
              break;
            case Direction.LEFT:
              graphics.moveTo(0, 16);
              graphics.lineTo(32, 0);
              graphics.lineTo(32, 32);
              graphics.lineTo(0, 16);
              break;
            case Direction.RIGHT:
              graphics.moveTo(0, 0);
              graphics.lineTo(32, 16);
              graphics.lineTo(0, 32);
              graphics.lineTo(0, 0);
              break;
          }
          graphics.endFill();

          frames.push(this.app.renderer.generateTexture(graphics));
        }

        this.animations.set(`${state}-${direction}`, frames);
      });
    });

    // Set initial animation
    this.setAnimation(AnimationState.IDLE, Direction.DOWN);
  }

  private setAnimation(state: AnimationState, direction: Direction): void {
    const animationKey = `${state}-${direction}`;
    const animation = this.animations.get(animationKey);

    if (animation) {
      this.currentAnimation = animation;
      this.animationFrame = 0;
      this.sprite.texture = this.currentAnimation[0];
    }
  }

  public update(deltaTime: number): void {
    // Update animation
    this.elapsedTime += deltaTime;

    if (this.elapsedTime >= this.animationSpeed) {
      this.elapsedTime = 0;
      this.animationFrame = (this.animationFrame + 1) % this.currentAnimation.length;
      this.sprite.texture = this.currentAnimation[this.animationFrame];
    }

    // Update position based on velocity
    this.state.position.x += this.state.velocity.x * deltaTime;
    this.state.position.y += this.state.velocity.y * deltaTime;
    this.container.position.copyFrom(this.state.position);
  }

  public setVelocity(x: number, y: number): void {
    this.state.velocity.set(x, y);

    // Update direction based on velocity
    if (Math.abs(x) > Math.abs(y)) {
      this.state.direction = x > 0 ? Direction.RIGHT : Direction.LEFT;
    } else if (y !== 0) {
      this.state.direction = y > 0 ? Direction.DOWN : Direction.UP;
    }

    // Update animation state
    const newAnimationState = x === 0 && y === 0 ? AnimationState.IDLE : AnimationState.WALKING;

    if (
      newAnimationState !== this.state.animationState ||
      this.state.animationState === AnimationState.WALKING
    ) {
      this.state.animationState = newAnimationState;
      this.setAnimation(this.state.animationState, this.state.direction);
    }
  }

  public getContainer(): PIXI.Container {
    return this.container;
  }

  public getPosition(): PIXI.Point {
    return this.state.position.clone();
  }

  public setPosition(x: number, y: number): void {
    this.state.position.set(x, y);
    this.container.position.copyFrom(this.state.position);
  }

  public destroy(): void {
    // Clean up textures
    this.animations.forEach(frames => {
      frames.forEach(texture => texture.destroy());
    });
    this.animations.clear();

    // Clean up sprite and container
    this.sprite.destroy();
    this.container.destroy();
  }
}
