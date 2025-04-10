import * as PIXI from 'pixi.js';
import { Scene } from './Scene';

export class SceneManager {
  private app: PIXI.Application;
  private scenes: Map<string, Scene>;
  private currentScene: Scene | null;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.scenes = new Map();
    this.currentScene = null;
  }

  registerScene(name: string, scene: Scene): void {
    this.scenes.set(name, scene);
  }

  switchTo(name: string): void {
    const scene = this.scenes.get(name);
    if (!scene) {
      throw new Error(`Scene ${name} not found`);
    }

    if (this.currentScene) {
      this.currentScene.destroy();
      this.app.stage.removeChild(this.currentScene.container);
    }

    this.currentScene = scene;
    this.app.stage.addChild(scene.container);
    scene.create();
  }

  update(deltaTime: number): void {
    if (this.currentScene) {
      this.currentScene.update(deltaTime);
    }
  }
}
