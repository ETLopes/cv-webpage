import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const Character: React.FC = () => {
  const characterRef = useRef<PIXI.Sprite | null>(null);

  useEffect(() => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1099bb,
    });

    const character = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/bunny.png');
    character.x = app.view.width / 2;
    character.y = app.view.height / 2;
    character.anchor.set(0.5);

    app.stage.addChild(character);
    characterRef.current = character;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!characterRef.current) return;
      const { x, y, width, height } = characterRef.current;
      switch (event.key) {
        case 'ArrowUp':
          if (y - 10 > 0) characterRef.current.y -= 10;
          break;
        case 'ArrowDown':
          if (y + 10 < app.view.height - height) characterRef.current.y += 10;
          break;
        case 'ArrowLeft':
          if (x - 10 > 0) characterRef.current.x -= 10;
          break;
        case 'ArrowRight':
          if (x + 10 < app.view.width - width) characterRef.current.x += 10;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Add animation ticker
    app.ticker.add(() => {
      if (characterRef.current) {
        characterRef.current.rotation += 0.01;
      }
    });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      app.destroy(true, true);
    };
  }, []);

  return null;
};

export default Character; 