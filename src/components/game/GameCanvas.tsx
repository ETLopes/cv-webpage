import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as PIXI from 'pixi.js';
import { useGameLoop } from '../../hooks/useGameLoop';
import { SceneManager } from '../../game/scenes/SceneManager';
import { GameScene } from '../../game/scenes/GameScene';

interface GameCanvasProps {
  width?: number;
  height?: number;
  backgroundColor?: number;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  width = 800,
  height = 600,
  backgroundColor = 0x1099bb,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [app, setApp] = useState<PIXI.Application | null>(null);
  const [sceneManager, setSceneManager] = useState<SceneManager | null>(null);

  // Initialize PIXI application and scene manager
  useEffect(() => {
    if (!canvasRef.current) return;

    // Create PixiJS application
    const pixiApp = new PIXI.Application({
      width,
      height,
      backgroundColor,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
    });

    // Add the canvas to the DOM
    canvasRef.current.appendChild(pixiApp.view as HTMLCanvasElement);

    // Create scene manager and register game scene
    const manager = new SceneManager(pixiApp);
    manager.registerScene('game', new GameScene(pixiApp));
    manager.switchTo('game');

    // Store instances
    setApp(pixiApp);
    setSceneManager(manager);

    // Cleanup function
    return () => {
      pixiApp.destroy(true);
      setApp(null);
      setSceneManager(null);
    };
  }, [width, height, backgroundColor]);

  // Update function for the game loop
  const onUpdate = useCallback(
    (deltaTime: number) => {
      sceneManager?.update(deltaTime);
    },
    [sceneManager]
  );

  // Initialize game loop
  useGameLoop({ app, onUpdate, fps: 60 });

  // Handle window resize
  useEffect(() => {
    if (!app) return;

    const handleResize = () => {
      if (!canvasRef.current) return;

      // Update renderer size
      app.renderer.resize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [app, width, height]);

  return <div ref={canvasRef} className="game-canvas" />;
};

export default GameCanvas;
