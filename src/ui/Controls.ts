import { State } from '../core/GameState';

/**
 * 控制按鈕 UI
 */
export class Controls {
  private startBtn: HTMLButtonElement;
  private resetBtn: HTMLButtonElement;
  private undoBtn: HTMLButtonElement;
  private replayBtn: HTMLButtonElement;

  private onStartCallback: (() => void) | null = null;
  private onResetCallback: (() => void) | null = null;
  private onUndoCallback: (() => void) | null = null;
  private onReplayCallback: (() => void) | null = null;

  constructor() {
    this.startBtn = document.getElementById('start-btn') as HTMLButtonElement;
    this.resetBtn = document.getElementById('reset-btn') as HTMLButtonElement;
    this.undoBtn = document.getElementById('undo-btn') as HTMLButtonElement;
    this.replayBtn = document.getElementById('replay-btn') as HTMLButtonElement;

    this.setupEvents();
  }

  /**
   * 設定事件監聽
   */
  private setupEvents(): void {
    this.startBtn.addEventListener('click', () => {
      this.onStartCallback?.();
    });

    this.resetBtn.addEventListener('click', () => {
      this.onResetCallback?.();
    });

    this.undoBtn.addEventListener('click', () => {
      this.onUndoCallback?.();
    });

    this.replayBtn.addEventListener('click', () => {
      this.onReplayCallback?.();
    });
  }

  /**
   * 設定開始按鈕回呼
   */
  onStart(callback: () => void): void {
    this.onStartCallback = callback;
  }

  /**
   * 設定重置按鈕回呼
   */
  onReset(callback: () => void): void {
    this.onResetCallback = callback;
  }

  /**
   * 設定撤銷按鈕回呼
   */
  onUndo(callback: () => void): void {
    this.onUndoCallback = callback;
  }

  /**
   * 設定再玩一次按鈕回呼
   */
  onReplay(callback: () => void): void {
    this.onReplayCallback = callback;
  }

  /**
   * 啟用/停用開始按鈕
   */
  setStartEnabled(enabled: boolean): void {
    this.startBtn.disabled = !enabled;
  }

  /**
   * 根據遊戲狀態更新按鈕顯示
   */
  updateForState(state: State, isCustomTrack: boolean = false): void {
    switch (state) {
      case State.SELECTING:
        this.undoBtn.style.display = 'none';
        this.startBtn.style.display = 'inline-block';
        this.startBtn.textContent = '開始模擬';
        this.replayBtn.style.display = 'none';
        this.resetBtn.style.display = 'none';
        break;

      case State.EDITING:
        this.undoBtn.style.display = 'inline-block';
        this.startBtn.style.display = 'inline-block';
        this.startBtn.textContent = '開始模擬';
        this.replayBtn.style.display = 'none';
        this.resetBtn.style.display = 'inline-block';
        this.resetBtn.textContent = '取消編輯';
        break;

      case State.SIMULATING:
        this.undoBtn.style.display = 'none';
        this.startBtn.style.display = 'none';
        this.replayBtn.style.display = 'none';
        this.resetBtn.style.display = 'none';
        break;

      case State.FINISHED:
        this.undoBtn.style.display = 'none';
        this.startBtn.style.display = 'none';
        // 自訂軌道顯示「再玩一次」按鈕
        this.replayBtn.style.display = isCustomTrack ? 'inline-block' : 'none';
        this.resetBtn.style.display = 'inline-block';
        this.resetBtn.textContent = '重新選擇';
        break;
    }
  }
}
