// ============================================================
// Sound Service — Web Audio API (no audio files needed)
// ============================================================

let ctx = null;

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function playTone({ frequency = 440, type = "sine", duration = 0.15, volume = 0.3, delay = 0, ramp = true }) {
  try {
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, c.currentTime + delay);
    gain.gain.setValueAtTime(volume, c.currentTime + delay);
    if (ramp) gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + duration);
    osc.start(c.currentTime + delay);
    osc.stop(c.currentTime + delay + duration + 0.05);
  } catch {}
}

export const sounds = {
  correct() {
    playTone({ frequency: 523, type: "sine", duration: 0.12, volume: 0.35 });
    playTone({ frequency: 659, type: "sine", duration: 0.18, volume: 0.35, delay: 0.1 });
    playTone({ frequency: 784, type: "sine", duration: 0.25, volume: 0.35, delay: 0.2 });
  },
  wrong() {
    playTone({ frequency: 220, type: "sawtooth", duration: 0.25, volume: 0.2 });
    playTone({ frequency: 180, type: "sawtooth", duration: 0.3, volume: 0.15, delay: 0.15 });
  },
  tick() {
    playTone({ frequency: 880, type: "sine", duration: 0.06, volume: 0.15 });
  },
  urgentTick() {
    playTone({ frequency: 1100, type: "sine", duration: 0.08, volume: 0.25 });
  },
  countdown() {
    playTone({ frequency: 600, type: "sine", duration: 0.12, volume: 0.3 });
  },
  countdownGo() {
    playTone({ frequency: 800, type: "sine", duration: 0.1, volume: 0.4 });
    playTone({ frequency: 1000, type: "sine", duration: 0.2, volume: 0.4, delay: 0.1 });
  },
  select() {
    playTone({ frequency: 440, type: "sine", duration: 0.08, volume: 0.15 });
  },
  fireworks() {
    [0, 0.1, 0.2, 0.35, 0.5, 0.7].forEach((delay, i) => {
      playTone({ frequency: 400 + i * 120, type: "sine", duration: 0.3, volume: 0.25, delay });
    });
  },
};
