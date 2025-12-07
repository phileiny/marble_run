import { SoundGenerator } from './SoundGenerator';

/**
 * 音效管理器
 * 統一管理遊戲音效
 */
export class AudioManager {
  private soundGenerator: SoundGenerator;
  private rollingSound: ReturnType<SoundGenerator['createRollingSound']> | null = null;
  private isRolling: boolean = false;
  private enabled: boolean = true;

  constructor() {
    this.soundGenerator = new SoundGenerator();
  }

  /**
   * 初始化（需要使用者互動後調用）
   */
  init(): void {
    this.soundGenerator.init();
  }

  /**
   * 開啟/關閉音效
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (!enabled) {
      this.stopRolling();
    }
  }

  /**
   * 是否啟用音效
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * 開始滾動音效
   */
  startRolling(): void {
    if (!this.enabled || this.isRolling) return;

    this.rollingSound = this.soundGenerator.createRollingSound();
    this.rollingSound.start();
    this.isRolling = true;
  }

  /**
   * 停止滾動音效
   */
  stopRolling(): void {
    if (this.rollingSound) {
      this.rollingSound.stop();
      this.rollingSound = null;
    }
    this.isRolling = false;
  }

  /**
   * 更新滾動音效（根據速度調整）
   */
  updateRolling(speed: number): void {
    if (!this.enabled || !this.rollingSound) return;
    this.rollingSound.setSpeed(speed);
  }

  /**
   * 播放點擊音效
   */
  playClick(): void {
    if (!this.enabled) return;
    this.soundGenerator.playClick();
  }

  /**
   * 播放通過迴圈音效
   */
  playWhoosh(): void {
    if (!this.enabled) return;
    this.soundGenerator.playWhoosh();
  }

  /**
   * 播放落入回收盒音效
   */
  playDing(): void {
    if (!this.enabled) return;
    this.soundGenerator.playDing();
  }

  /**
   * 播放失敗音效
   */
  playFail(): void {
    if (!this.enabled) return;
    this.soundGenerator.playFail();
  }
}
