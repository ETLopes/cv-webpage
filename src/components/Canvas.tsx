import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import Character from './Character';
import House from './House';

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create a PIXI application
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1099bb,
    });

    // Append the PIXI view (canvas) to the DOM
    canvasRef.current.appendChild(app.view);

    // Create a simple rectangle
    const rectangle = new PIXI.Graphics();
    rectangle.beginFill(0xde3249);
    rectangle.drawRect(50, 50, 100, 100);
    rectangle.endFill();

    // Add the rectangle to the stage
    app.stage.addChild(rectangle);

    // Clean up on component unmount
    return () => {
      app.destroy(true, true);
    };
  }, []);

  return (
    <div ref={canvasRef} style={{ width: '100%', height: '100vh' }}>
      <Character />
      <House />
    </div>
  );
};

export default Canvas; 