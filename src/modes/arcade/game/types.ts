import type { Vector3 } from "three";
import type { Section } from "../content";

export type InteractKind = "npc" | "sign" | "work" | "dj" | "skins" | "info";

export type Interactable = {
  id: string;
  kind: InteractKind;
  /** floor point used for proximity (y ignored) */
  position: Vector3;
  /** world point the floating prompt is anchored to */
  anchor: Vector3;
  radius: number;
  label: string;
  sub: string;
  /** step-in auto-open; off for everything since Oct 2026, every target waits for E */
  auto: boolean;
  section?: Section;
  work?: number;
  npc?: string;
};

export type Collider = { x: number; z: number; r: number };

export type GameAction = "interact" | "escape" | "left" | "right";

export type SpawnId = "home" | "about" | "experience" | "work" | "awards";

export type PromptInfo = { label: string; sub: string; kind: InteractKind } | null;

/** How the engine talks to the Vue layer. */
export interface GameBridge {
  /** Return true when an open dialog/panel consumed the action. */
  uiAction(action: GameAction): boolean;
  uiBlocking(): boolean;
  interact(target: Interactable): void;
  autoEnter(target: Interactable): void;
  promptChange(info: PromptInfo): void;
  tutorialState(active: boolean): void;
  tutorialComplete(): void;
  stats(frameMs: number, fps: number): void;
}

export const ROOM = { halfW: 12, zMin: -30, zMax: 30, height: 7 } as const;
export const BOUNDS = { x: 11.2, zMin: -29, zMax: 21.5 } as const;
