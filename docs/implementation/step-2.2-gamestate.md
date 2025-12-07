# Step 2.2 - GameState 遊戲狀態管理

## 建立的檔案

### src/core/GameState.ts

## 狀態機

```
SELECTING → SIMULATING → FINISHED
    ↑                        │
    └────────────────────────┘
```

## 狀態說明

| 狀態 | 說明 |
|------|------|
| `SELECTING` | 選擇軌道中 |
| `SIMULATING` | 模擬進行中 |
| `FINISHED` | 模擬結束 |

## 方法

| 方法 | 說明 |
|------|------|
| `selectTrack(track)` | 選擇軌道 |
| `startSimulation()` | 開始模擬 |
| `finishSimulation()` | 結束模擬 |
| `reset()` | 重新選擇 |
| `onStateChange(listener)` | 監聽狀態變化 |

## 軌道類型

- `classic-slope`：經典斜坡
- `single-loop`：單環迴圈
- `double-loop`：雙重迴圈
