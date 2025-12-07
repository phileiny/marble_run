/**
 * 程式化音效生成器
 * 使用 Web Audio API 即時生成音效
 */
export class SoundGenerator {
  private audioContext: AudioContext | null = null;

  /**
   * 初始化音訊上下文（需要使用者互動後才能啟動）
   */
  init(): void {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
  }

  /**
   * 確保音訊上下文已啟動
   */
  private ensureContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  /**
   * 生成滾動聲音
   * 使用濾波噪音模擬滾動
   */
  createRollingSound(): { start: () => void; stop: () => void; setSpeed: (speed: number) => void } {
    const ctx = this.ensureContext();

    // 建立噪音源
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    let noiseSource: AudioBufferSourceNode | null = null;
    let filter: BiquadFilterNode | null = null;
    let gainNode: GainNode | null = null;

    const start = () => {
      if (noiseSource) return;

      noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 200;
      filter.Q.value = 1;

      gainNode = ctx.createGain();
      gainNode.gain.value = 0;

      noiseSource.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      noiseSource.start();
    };

    const stop = () => {
      if (noiseSource) {
        noiseSource.stop();
        noiseSource.disconnect();
        noiseSource = null;
      }
      if (filter) {
        filter.disconnect();
        filter = null;
      }
      if (gainNode) {
        gainNode.disconnect();
        gainNode = null;
      }
    };

    const setSpeed = (speed: number) => {
      if (!filter || !gainNode) return;

      // 速度影響頻率和音量
      const normalizedSpeed = Math.min(Math.abs(speed) / 500, 1);
      filter.frequency.value = 100 + normalizedSpeed * 400;
      gainNode.gain.value = normalizedSpeed * 0.15;
    };

    return { start, stop, setSpeed };
  }

  /**
   * 播放點擊音效
   */
  playClick(): void {
    const ctx = this.ensureContext();

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = 800;

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  }

  /**
   * 播放通過迴圈的「咻」聲
   */
  playWhoosh(): void {
    const ctx = this.ensureContext();

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(300, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);
    oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.3);

    filter.type = 'lowpass';
    filter.frequency.value = 1000;

    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.setTargetAtTime(0.01, ctx.currentTime + 0.1, 0.1);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.4);
  }

  /**
   * 播放落入回收盒的「叮」聲
   */
  playDing(): void {
    const ctx = this.ensureContext();

    // 主音
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.value = 1200;

    gain1.gain.setValueAtTime(0.4, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.8);

    // 泛音
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();

    osc2.type = 'sine';
    osc2.frequency.value = 2400;

    gain2.gain.setValueAtTime(0.2, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(ctx.currentTime);
    osc2.stop(ctx.currentTime + 0.5);

    // 第三泛音
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();

    osc3.type = 'sine';
    osc3.frequency.value = 3600;

    gain3.gain.setValueAtTime(0.1, ctx.currentTime);
    gain3.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    osc3.connect(gain3);
    gain3.connect(ctx.destination);

    osc3.start(ctx.currentTime);
    osc3.stop(ctx.currentTime + 0.3);
  }

  /**
   * 播放失敗音效（彈珠掉落）
   */
  playFail(): void {
    const ctx = this.ensureContext();

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.5);

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);
  }
}
