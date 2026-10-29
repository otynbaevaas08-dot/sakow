/**
 * Ambient Audio & Synthesized FX Engine
 * Uses Web Audio API to create authentic dark gothic atmosphere:
 * - Sub-bass abyssal drone (detuned dual oscillators with lowpass filter)
 * - Cardiac pulse (heartbeat rate modulated by Dread)
 * - Mechanical typewriter keystrokes
 * - Heavy obsidian cipher thuds & chimes
 */

class GothicAudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private heartbeatInterval: number | null = null;
  private currentDread: number = 20;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleAmbience(enabled: boolean, dread: number = 20) {
    this.currentDread = dread;
    if (enabled) {
      this.startAmbience();
    } else {
      this.stopAmbience();
    }
  }

  public setDread(dread: number) {
    this.currentDread = Math.min(100, Math.max(0, dread));
    if (this.isRunning && this.droneGain && this.ctx) {
      // Increase drone intensity and filter cutoff as dread rises
      const targetGain = 0.15 + (this.currentDread / 100) * 0.25;
      const targetFreq = 90 + (this.currentDread / 100) * 160;
      this.droneGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 1.5);
      if (this.filter) {
        this.filter.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 2.0);
      }
    }
  }

  public startAmbience() {
    if (this.isRunning) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      this.isRunning = true;

      // Master lowpass filter
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(100 + (this.currentDread / 100) * 120, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

      // Drone gain
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.droneGain.gain.exponentialRampToValueAtTime(0.2, this.ctx.currentTime + 3.0);

      // Dual detuned low oscillators for eerie beating resonance
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sawtooth';
      this.osc1.frequency.setValueAtTime(54.0, this.ctx.currentTime); // C#1 / A0 realm

      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(55.2, this.ctx.currentTime); // ~1.2 Hz binaural beat

      this.osc1.connect(this.filter);
      this.osc2.connect(this.filter);
      this.filter.connect(this.droneGain);
      this.droneGain.connect(this.masterGain);

      this.osc1.start();
      this.osc2.start();

      // Start periodic heartbeat
      this.startHeartbeatLoop();
    } catch {
      this.isRunning = false;
    }
  }

  private startHeartbeatLoop() {
    if (this.heartbeatInterval) {
      window.clearInterval(this.heartbeatInterval);
    }

    const triggerBeat = () => {
      if (!this.isRunning) return;
      this.playHeartbeat();
      // Calculate next pulse based on dread: at 0 dread ~ 1600ms; at 100 dread ~ 800ms
      const interval = Math.max(750, 1700 - (this.currentDread * 9.5));
      this.heartbeatInterval = window.setTimeout(triggerBeat, interval);
    };

    this.heartbeatInterval = window.setTimeout(triggerBeat, 1200);
  }

  public stopAmbience() {
    this.isRunning = false;
    if (this.heartbeatInterval) {
      window.clearTimeout(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }

    if (this.droneGain && this.ctx) {
      try {
        this.droneGain.gain.setTargetAtTime(0.001, this.ctx.currentTime, 0.4);
        setTimeout(() => {
          this.osc1?.stop();
          this.osc2?.stop();
          this.osc1?.disconnect();
          this.osc2?.disconnect();
          this.osc1 = null;
          this.osc2 = null;
          this.droneGain = null;
          this.filter = null;
        }, 500);
      } catch {
        // Safe cleanup
      }
    }
  }

  public getIsPlaying(): boolean {
    return this.isRunning;
  }

  // --- ONE-SHOT FORENSIC SFX ---

  public playTypewriterKey() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      // High click burst
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      // Slight pitch variance per key
      const baseFreq = 700 + Math.random() * 300;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Ignored
    }
  }

  public playStoneThud() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.18);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.24);
    } catch {
      // Ignored
    }
  }

  public playOccultBell() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      
      // Fundamental + harmonic
      const freqs = [330, 660, 990];
      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const volume = (0.2 / (idx + 1));
        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4 - idx * 0.4);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 2.5);
      });
    } catch {
      // Ignored
    }
  }

  public playHeartbeat() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      // Double thump: lub-dub
      const thumps = [0, 0.14];
      thumps.forEach((offset, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(idx === 0 ? 68 : 52, now + offset);
        osc.frequency.exponentialRampToValueAtTime(28, now + offset + 0.12);

        gain.gain.setValueAtTime(0.24, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.14);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + offset);
        osc.stop(now + offset + 0.16);
      });
    } catch {
      // Ignored
    }
  }

  public playCipherSuccess() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      [220, 277.18, 329.63, 440].forEach((freq, i) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.18, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 1.3);
      });
    } catch {
      // Ignored
    }
  }
}

export const audioEngine = new GothicAudioEngine();
