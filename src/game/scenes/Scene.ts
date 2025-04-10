import * as PIXI from 'pixi.js';

export abstract class Scene {
  public readonly container: PIXI.Container;

  constructor() {
    this.container = new PIXI.Container();
  }

  abstract create(): void;
  abstract update(deltaTime: number): void;
  abstract destroy(): void;
}
