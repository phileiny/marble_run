# Step 11 - 再玩一次按鈕實作

## 修改的檔案

### 1. index.html

新增按鈕：

```html
<button id="replay-btn" style="display: none;">再玩一次</button>
```

### 2. src/ui/Controls.ts

新增 replayBtn 和回呼：

```typescript
private replayBtn: HTMLButtonElement;
private onReplayCallback: (() => void) | null = null;

onReplay(callback: () => void): void {
  this.onReplayCallback = callback;
}
```

修改 `updateForState` 接受 `isCustomTrack` 參數：

```typescript
updateForState(state: State, isCustomTrack: boolean = false): void {
  // ...
  case State.FINISHED:
    this.replayBtn.style.display = isCustomTrack ? 'inline-block' : 'none';
    break;
}
```

### 3. src/main.ts

新增狀態標記：

```typescript
let isCustomTrack = false;
```

軌道選擇時設定：

```typescript
trackSelector.onSelect(() => {
  isCustomTrack = false;
  // ...
});

trackSelector.onCustomSelect(() => {
  isCustomTrack = true;
  // ...
});
```

新增 replay 函數：

```typescript
function replay(): void {
  marble = null;
  audioManager.stopRolling();
  renderer.getParticleSystem().clear();

  // 重置停止檢測和迴圈檢測
  stoppedFrames = 0;
  lastCurvature = 0;
  inLoop = false;

  // 保留 currentTrack 和 collectionBox，直接重新開始模擬
  startSimulation();
}
```

### 4. style.css

```css
#replay-btn {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
}

#replay-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
}
```

## Bug 修復

原本 replay 後會立即顯示失敗，原因是 `stoppedFrames` 沒有重置。

模擬結束時 `stoppedFrames >= 60`，replay 後第一幀就觸發 `finishSimulation(false)`。

修復：在 replay() 中重置 `stoppedFrames = 0`。
