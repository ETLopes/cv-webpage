import * as PIXI from 'pixi.js';

interface AssetDefinition {
  name: string;
  url: string;
  type: 'texture' | 'spritesheet' | 'sound';
}

type AssetResource = PIXI.Texture | PIXI.Spritesheet | HTMLAudioElement;

export class AssetManager {
  private static instance: AssetManager;
  private assets: Map<string, AssetResource>;
  private loadPromise: Promise<void> | null;

  private constructor() {
    this.assets = new Map();
    this.loadPromise = null;
  }

  public static getInstance(): AssetManager {
    if (!AssetManager.instance) {
      AssetManager.instance = new AssetManager();
    }
    return AssetManager.instance;
  }

  public async loadAssets(assetDefinitions: AssetDefinition[]): Promise<void> {
    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.loadPromise = new Promise((resolve, reject) => {
      // Create a PIXI loader
      const loader = PIXI.Assets;

      // Add all assets to the loader and load them
      Promise.all(
        assetDefinitions.map(({ name, url, type }) =>
          loader
            .load(url)
            .then(resource => {
              this.assets.set(name, resource);
            })
            .catch(error => {
              console.error(`Failed to load asset ${name}:`, error);
            })
        )
      )
        .then(() => resolve())
        .catch(reject);
    });

    return this.loadPromise;
  }

  public getTexture(name: string): PIXI.Texture | null {
    const asset = this.assets.get(name);
    return asset instanceof PIXI.Texture ? asset : null;
  }

  public getSpritesheet(name: string): PIXI.Spritesheet | null {
    const asset = this.assets.get(name);
    return asset instanceof PIXI.Spritesheet ? asset : null;
  }

  public unloadAsset(name: string): void {
    const asset = this.assets.get(name);
    if (asset) {
      // Destroy the asset if it's a PIXI resource
      if ('destroy' in asset) {
        (asset as PIXI.Texture | PIXI.Spritesheet).destroy();
      }
      this.assets.delete(name);
    }
  }

  public clearAssets(): void {
    this.assets.forEach(asset => {
      if ('destroy' in asset) {
        (asset as PIXI.Texture | PIXI.Spritesheet).destroy();
      }
    });
    this.assets.clear();
    this.loadPromise = null;
  }
}
