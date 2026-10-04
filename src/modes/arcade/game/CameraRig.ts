import { PerspectiveCamera, Vector3 } from "three";

const OFFSET = new Vector3(0, 3.4, 7.6);
const BASE = OFFSET.length();
const MIN_ZOOM = 5.5;
const MAX_ZOOM = 12;

const damp = (k: number, dt: number) => 1 - Math.pow(1 - k, dt * 60);

/** Third-person follow: offset (0,5,9), position lerp 0.08, wheel zoom 7–13, sprint FOV. */
export class CameraRig {
  readonly camera: PerspectiveCamera;
  private zoom = BASE;
  private zoomTarget = BASE;
  private look = new Vector3();
  private dir = OFFSET.clone().normalize();
  private _p = new Vector3();

  private reduced: boolean;
  /** vertical FOV at rest; raised on portrait screens so the hall is still visible side to side */
  private baseFov = 50;

  constructor(aspect: number, reduced: boolean) {
    this.reduced = reduced;
    this.camera = new PerspectiveCamera(50, aspect, 0.1, 120);
    this.applyAspect(aspect);
  }

  /** Portrait (aspect < 1): open the FOV and pull the camera back so a phone sees more than a slice. */
  private applyAspect(aspect: number) {
    const portrait = Math.max(0, 1 - aspect); // 0 landscape … ~0.55 on a phone
    this.baseFov = 50 + portrait * 40; // 50° landscape → ~72° phone
    const z = Math.min(MAX_ZOOM, BASE + portrait * 5);
    this.zoomTarget = z;
    this.camera.fov = this.baseFov;
    this.camera.updateProjectionMatrix();
  }

  onWheel(deltaY: number) {
    this.zoomTarget = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, this.zoomTarget + deltaY * 0.008));
  }

  snap(player: Vector3) {
    this.zoom = this.zoomTarget;
    this.look.set(player.x, 1, player.z);
    this.camera.position.set(player.x, 0, player.z).addScaledVector(this.dir, this.zoom);
    this.camera.lookAt(this.look);
  }

  update(dt: number, t: number, player: Vector3, sprinting: boolean) {
    this.zoom += (this.zoomTarget - this.zoom) * damp(0.12, dt);
    // follow on the ground plane; ignore jump height so the camera doesn't bob
    this._p.set(player.x, 0, player.z).addScaledVector(this.dir, this.zoom);
    if (!this.reduced) {
      const w = t * Math.PI * 2 * 0.3;
      this._p.x += Math.sin(w) * 0.15;
      this._p.y += Math.sin(w * 0.7 + 1.3) * 0.075;
    }
    this.camera.position.lerp(this._p, damp(0.08, dt));
    this.look.x += (player.x - this.look.x) * damp(0.12, dt);
    this.look.y += (1 + player.y * 0.35 - this.look.y) * damp(0.12, dt);
    this.look.z += (player.z - this.look.z) * damp(0.12, dt);
    this.camera.lookAt(this.look);

    const fov = sprinting ? this.baseFov + 6 : this.baseFov;
    const next = this.camera.fov + (fov - this.camera.fov) * damp(0.08, dt);
    if (Math.abs(next - this.camera.fov) > 0.01) {
      this.camera.fov = next;
      this.camera.updateProjectionMatrix();
    }
  }

  resize(aspect: number) {
    this.camera.aspect = aspect;
    this.applyAspect(aspect);
  }
}
