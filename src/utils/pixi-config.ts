import * as PIXI from 'pixi.js';

/**
 * Configuration options for creating a PIXI application
 */
export interface PixiAppOptions {
  width?: number;
  height?: number;
  backgroundColor?: number;
  antialias?: boolean;
  resolution?: number;
}

/**
 * Creates a new PIXI Application with the given options
 * @param options Configuration options for the PIXI application
 * @returns A new PIXI Application instance
 */
export const createPixiApp = (options: PixiAppOptions = {}): PIXI.Application => {
  const defaultOptions: PixiAppOptions = {
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
  };

  const appOptions = { ...defaultOptions, ...options };
  
  return new PIXI.Application(appOptions);
};

/**
 * Resizes the PIXI Application to match the given dimensions
 * @param app The PIXI Application to resize
 * @param width New width
 * @param height New height
 */
export const resizePixiApp = (app: PIXI.Application, width: number, height: number): void => {
  app.renderer.resize(width, height);
  
  // If there's a root container, you might want to adjust its position
  if (app.stage) {
    app.stage.position.set(width / 2, height / 2);
  }
}; 