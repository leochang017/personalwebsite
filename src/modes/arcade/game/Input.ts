import type { GameAction } from "./types";

export type Dir = "up" | "down" | "left" | "right";

const DIR_KEYS: Record<string, Dir> = {
  KeyW: "up",
  ArrowUp: "up",
  KeyS: "down",
  ArrowDown: "down",
  KeyA: "left",
  ArrowLeft: "left",
  KeyD: "right",
  ArrowRight: "right",
};

export type InputHooks = {
  /** synchronous: lets the UI consume interact/escape/left/right before the game sees them */
  action(a: GameAction): void;
  /** raw key presses, for the tutorial keycaps */
  keyDown(code: string): void;
};

const isTyping = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
const isControl = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.tagName === "BUTTON" || t.tagName === "A");

/**
 * Keyboard + virtual joystick. Movement is polled per frame; discrete
 * actions are pushed through hooks the moment the key goes down.
 */
export class Input {
  /** physical key codes currently down (W and ArrowUp are tracked separately) */
  private pressed = new Set<string>();
  private shift = false;
  private joy = { x: 0, y: 0 };
  private jumpQueued = false;
  enabled = true;

  private hooks: InputHooks;

  constructor(hooks: InputHooks) {
    this.hooks = hooks;
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
    window.addEventListener("blur", this.reset);
  }

  /** Camera-relative move vector: x right, z toward camera. Length ≤ 1. */
  axis(): { x: number; z: number } {
    let x = this.joy.x;
    let z = this.joy.y;
    for (const code of this.pressed) {
      const d = DIR_KEYS[code];
      if (d === "left") x -= 1;
      else if (d === "right") x += 1;
      else if (d === "up") z -= 1;
      else if (d === "down") z += 1;
    }
    const len = Math.hypot(x, z);
    if (len > 1) {
      x /= len;
      z /= len;
    }
    return { x, z };
  }

  get sprint(): boolean {
    return this.shift || Math.hypot(this.joy.x, this.joy.y) > 0.92;
  }

  consumeJump(): boolean {
    const j = this.jumpQueued;
    this.jumpQueued = false;
    return j;
  }

  /** Dominant joystick direction as the equivalent key code, or null near the centre. */
  joystickKey(): string | null {
    const { x, y } = this.joy;
    if (Math.hypot(x, y) < 0.5) return null;
    if (Math.abs(x) > Math.abs(y)) return x > 0 ? "KeyD" : "KeyA";
    return y > 0 ? "KeyS" : "KeyW";
  }

  setJoystick(x: number, y: number) {
    this.joy.x = x;
    this.joy.y = y;
  }

  queueJump() {
    this.jumpQueued = true;
    this.hooks.keyDown("Space");
  }

  reset = () => {
    this.pressed.clear();
    this.shift = false;
    this.joy.x = this.joy.y = 0;
    this.jumpQueued = false;
  };

  dispose() {
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
    window.removeEventListener("blur", this.reset);
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (!this.enabled || isTyping(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
    const code = e.code;
    if (code === "ShiftLeft" || code === "ShiftRight") this.shift = true;

    // Space/Enter on a focused button belong to that button
    const onControl = isControl(e.target);

    if (code === "Escape") return this.hooks.action("escape");
    if ((code === "KeyE" || code === "Enter" || code === "NumpadEnter") && !(onControl && code !== "KeyE")) {
      if (!e.repeat) this.hooks.action("interact");
      return;
    }
    const dir = DIR_KEYS[code];
    if (dir) {
      if (code === "ArrowLeft") this.hooks.action("left");
      if (code === "ArrowRight") this.hooks.action("right");
      this.pressed.add(code);
      if (code.startsWith("Arrow")) e.preventDefault();
      if (!e.repeat) this.hooks.keyDown(code);
      return;
    }
    if (code === "Space" && !onControl) {
      e.preventDefault();
      if (!e.repeat) {
        this.jumpQueued = true;
        this.hooks.keyDown(code);
      }
    }
  };

  private onKeyUp = (e: KeyboardEvent) => {
    const code = e.code;
    if (code === "ShiftLeft" || code === "ShiftRight") this.shift = false;
    this.pressed.delete(code);
  };
}
