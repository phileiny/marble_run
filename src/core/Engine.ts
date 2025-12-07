import { GameState, State } from './GameState';
import { Physics } from './Physics';

/**
 * 遊戲主引擎
 * 管理遊戲迴圈、更新、繪製
 */
export class Engine {
  private lastTime: number = 0;
  private isRunning: boolean = false;
  private animationId: number = 0;

  // 固定時間步長 (60 FPS)
  private readonly fixedDeltaTime: number = 1 / 60;
  private accumulator: number = 0;

  // 回呼函式
  private updateCallback: ((dt: number) => void) | null = null;
  private renderCallback: (() => void) | null = null;

  constructor(
    private gameState: GameState,
    private physics: Physics
  ) {}

  /** 設定更新回呼 */
  onUpdate(callback: (dt: number) => void): void {
    this.updateCallback = callback;
  }

  /** 設定繪製回呼 */
  onRender(callback: () => void): void {
    this.renderCallback = callback;
  }

  /** 開始遊戲迴圈 */
  start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.loop();
  }

  /** 停止遊戲迴圈 */
  stop(): void {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  /** 主迴圈 */
  private loop = (): void => {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastTime) / 1000; // 轉換為秒
    this.lastTime = currentTime;

    // 累積時間，使用固定步長更新物理
    this.accumulator += deltaTime;

    // 限制累積時間，避免螺旋死亡
    if (this.accumulator > 0.2) {
      this.accumulator = 0.2;
    }

    // 固定步長更新
    while (this.accumulator >= this.fixedDeltaTime) {
      if (this.gameState.getState() === State.SIMULATING) {
        this.updateCallback?.(this.fixedDeltaTime);
      }
      this.accumulator -= this.fixedDeltaTime;
    }

    // 繪製
    this.renderCallback?.();

    this.animationId = requestAnimationFrame(this.loop);
  };

  /** 取得物理引擎 */
  getPhysics(): Physics {
    return this.physics;
  }

  /** 取得遊戲狀態 */
  getGameState(): GameState {
    return this.gameState;
  }
}
