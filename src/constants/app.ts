// Canvas dimensions
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

// Colors in hexadecimal format
export const COLORS = {
  PRIMARY: 0x3366ff,
  SECONDARY: 0x33cc99,
  BACKGROUND: 0x1e1e1e,
  TEXT: 0xffffff,
  WARNING: 0xffcc00,
  ERROR: 0xff3300,
};

// Game settings
export const GAME_SETTINGS = {
  MOVEMENT_SPEED: 5,
  ANIMATION_SPEED: 0.1,
  GRID_SIZE: 32,
};

// Asset paths
export const ASSETS = {
  SPRITES: {
    CHARACTER: "/assets/character.png",
    OBJECTS: "/assets/objects.png",
    TILESET: "/assets/tileset.png",
  },
  SOUNDS: {
    BACKGROUND: "/assets/background.mp3",
    EFFECTS: "/assets/effects.mp3",
  },
};

// Application environment
export const IS_DEVELOPMENT = import.meta.env.DEV;
export const IS_PRODUCTION = import.meta.env.PROD;
