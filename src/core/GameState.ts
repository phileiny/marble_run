/**
 * 遊戲狀態管理
 */

export enum State {
  SELECTING = 'selecting',
  EDITING = 'editing',
  SIMULATING = 'simulating',
  FINISHED = 'finished'
}

export type TrackType = 'classic-slope' | 'single-loop' | 'double-loop' | 'custom';

export class GameState {
  private currentState: State = State.SELECTING;
  private selectedTrack: TrackType | null = null;
  private listeners: Array<(state: State) => void> = [];

  getState(): State {
    return this.currentState;
  }

  getSelectedTrack(): TrackType | null {
    return this.selectedTrack;
  }

  selectTrack(track: TrackType): void {
    this.selectedTrack = track;
  }

  /** 開始編輯自訂軌道 */
  startEditing(): void {
    if (this.currentState === State.SELECTING) {
      this.selectedTrack = 'custom';
      this.transition(State.EDITING);
    }
  }

  /** 完成編輯，準備模擬 */
  finishEditing(): void {
    if (this.currentState === State.EDITING) {
      this.transition(State.SELECTING);
    }
  }

  /** 開始模擬 */
  startSimulation(): void {
    if (this.selectedTrack && (this.currentState === State.SELECTING || this.currentState === State.EDITING || this.currentState === State.FINISHED)) {
      this.transition(State.SIMULATING);
    }
  }

  /** 模擬結束 */
  finishSimulation(): void {
    if (this.currentState === State.SIMULATING) {
      this.transition(State.FINISHED);
    }
  }

  /** 重新選擇 */
  reset(): void {
    this.selectedTrack = null;
    this.transition(State.SELECTING);
  }

  /** 狀態轉換 */
  private transition(newState: State): void {
    this.currentState = newState;
    this.listeners.forEach(listener => listener(newState));
  }

  /** 監聽狀態變化 */
  onStateChange(listener: (state: State) => void): void {
    this.listeners.push(listener);
  }
}
