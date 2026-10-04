import { Vector2 } from "three";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

/**
 * CRT look, applied after OutputPass (so it works in display sRGB):
 * scanlines (2 CSS px period), vignette, radial chromatic aberration,
 * film noise + handheld jitter, black lift, plus the power-on/off squeeze,
 * white flash and the teleport blink.
 */
const CrtShader = {
  name: "CrtShader",
  uniforms: {
    tDiffuse: { value: null },
    uRes: { value: new Vector2(1, 1) },
    uDpr: { value: 1 },
    uTime: { value: 0 },
    uScan: { value: 0.12 },
    uVignette: { value: 0.65 },
    uAberration: { value: 0.4 },
    uNoise: { value: 0.035 },
    uJitter: { value: 1 },
    uLift: { value: 0.012 },
    uPower: { value: 1 },
    uFlash: { value: 0 },
    uBlink: { value: 0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform vec2 uRes;
    uniform float uDpr, uTime, uScan, uVignette, uAberration, uNoise, uJitter, uLift, uPower, uFlash, uBlink;
    varying vec2 vUv;

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    void main() {
      vec2 uv = vUv;

      // handheld: a sub-pixel wobble that steps at ~24fps
      float tick = floor(uTime * 24.0);
      uv += (vec2(hash(vec2(tick, 1.3)), hash(vec2(2.7, tick))) - 0.5) * 0.0009 * uJitter;

      // power on/off: squeeze to a horizontal line
      float sy = max(uPower, 0.004);
      uv.y = (uv.y - 0.5) / sy + 0.5;
      if (uv.y < 0.0 || uv.y > 1.0) { gl_FragColor = vec4(uFlash, uFlash, uFlash, 1.0); return; }

      // radial chromatic aberration (uAberration in CSS px at the edges)
      vec2 dir = uv - 0.5;
      vec2 off = dir * 2.0 * (uAberration * uDpr) / uRes;
      vec3 col;
      col.r = texture2D(tDiffuse, uv + off).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - off).b;

      // brighter while squeezed, like a real tube
      col *= 1.0 + (1.0 - sy) * 2.5;

      // black lift: the reference never hits pure black
      col = uLift + col * (1.0 - uLift);

      // scanlines, 2 CSS px period
      float line = 0.5 + 0.5 * sin(gl_FragCoord.y / uDpr * 3.14159265);
      col *= 1.0 - uScan * (1.0 - line) * 2.0;

      // vignette
      float v = smoothstep(0.95, 0.25, length(dir * vec2(1.0, 0.85)));
      col *= mix(1.0 - uVignette, 1.0, v);

      // film noise
      col += (hash(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5) * uNoise;

      col = mix(col, vec3(1.0), uFlash);
      col *= 1.0 - uBlink;
      gl_FragColor = vec4(col, 1.0);
    }`,
};

export class CrtPass extends ShaderPass {
  constructor() {
    super(CrtShader);
  }

  setSize(width: number, height: number) {
    (this.uniforms.uRes.value as Vector2).set(width, height);
  }

  set dpr(v: number) {
    this.uniforms.uDpr.value = v;
  }
  set time(v: number) {
    this.uniforms.uTime.value = v;
  }
  set power(v: number) {
    this.uniforms.uPower.value = v;
  }
  set flash(v: number) {
    this.uniforms.uFlash.value = v;
  }
  set blink(v: number) {
    this.uniforms.uBlink.value = v;
  }

  setReducedMotion(reduced: boolean) {
    this.uniforms.uNoise.value = reduced ? 0 : 0.035;
    this.uniforms.uJitter.value = reduced ? 0 : 1;
  }
}
