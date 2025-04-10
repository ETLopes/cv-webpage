import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const House: React.FC = () => {
  const houseRef = useRef<PIXI.Container | null>(null);

  useEffect(() => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1099bb,
    });

    const house = new PIXI.Container();

    // Create the main building
    const building = new PIXI.Graphics();
    building.beginFill(0x8b4513);
    building.drawRect(200, 200, 200, 200);
    building.endFill();
    house.addChild(building);

    // Create the roof
    const roof = new PIXI.Graphics();
    roof.beginFill(0x8b0000);
    roof.moveTo(200, 200);
    roof.lineTo(300, 100);
    roof.lineTo(400, 200);
    roof.closePath();
    roof.endFill();
    house.addChild(roof);

    app.stage.addChild(house);
    houseRef.current = house;

    return () => {
      app.destroy(true, true);
    };
  }, []);

  return null;
};

export default House; 