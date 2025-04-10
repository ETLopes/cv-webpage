export enum CharacterDirection {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

export interface CharacterPosition {
  x: number;
  y: number;
}

export interface CharacterStats {
  speed: number;
  health: number;
  energy: number;
}

export interface CharacterAttributes {
  charisma: number;
  intelligence: number;
  creativity: number;
  leadership: number;
  persistence: number;
}

export interface Character {
  id: string;
  name: string;
  position: CharacterPosition;
  direction: CharacterDirection;
  stats: CharacterStats;
  attributes: CharacterAttributes;
  career?: string;
  skills: string[];
}

export interface CharacterState extends Character {
  isMoving: boolean;
  isInteracting: boolean;
  isBusy: boolean;
  lastAction?: string;
  lastInteractionTime?: number;
}

export type CharacterAction =
  | { type: "MOVE"; payload: { direction: CharacterDirection; steps?: number } }
  | { type: "INTERACT"; payload: { targetId: string } }
  | { type: "REST"; payload: { duration: number } }
  | { type: "WORK"; payload: { careerAction: string; duration: number } }
  | { type: "LEARN"; payload: { skill: string; duration: number } };
