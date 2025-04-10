import { useRef, useEffect, useCallback } from 'react';
import * as PIXI from 'pixi.js';

interface GameLoopOptions {
  app: PIXI.Application | null;
  onUpdate?: (deltaTime: number) => void;
  fps?: number;
}

export const useGameLoop = ({ app, onUpdate, fps = 60 }: GameLoopOptions) => {
  const frameRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);
  const isRunningRef = useRef(false);
  const accumulatorRef = useRef<number>(0);

  const animate = useCallback(
    (currentTime: number) => {
      if (!isRunningRef.current || !app) return;

      frameRef.current = requestAnimationFrame(animate);

      // Calculate raw delta time
      const rawDeltaTime = previousTimeRef.current
        ? (currentTime - previousTimeRef.current) / 1000
        : 1 / 60;
      previousTimeRef.current = currentTime;

      // Fixed time step (in seconds)
      const timeStep = 1 / fps;

      // Accumulate time
      accumulatorRef.current += rawDeltaTime;

      // Update as many times as needed to catch up
      while (accumulatorRef.current >= timeStep) {
        onUpdate?.(timeStep);
        accumulatorRef.current -= timeStep;
      }

      // Render the stage
      app.renderer.render(app.stage);
    },
    [app, fps, onUpdate]
  );

  const startGameLoop = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    previousTimeRef.current = 0;
    accumulatorRef.current = 0;
    frameRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const stopGameLoop = useCallback(() => {
    if (!isRunningRef.current) return;
    isRunningRef.current = false;
    cancelAnimationFrame(frameRef.current);
    previousTimeRef.current = 0;
    accumulatorRef.current = 0;
  }, []);

  // Start/stop game loop on mount/unmount
  useEffect(() => {
    startGameLoop();
    return () => stopGameLoop();
  }, [startGameLoop, stopGameLoop]);

  return {
    isRunning: isRunningRef.current,
    start: startGameLoop,
    stop: stopGameLoop,
  };
};
