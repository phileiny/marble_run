# Step 7 - 使用者介面

## 建立的檔案

### src/ui/TrackSelector.ts
軌道選擇器：
- 動態生成三種軌道選項
- 每個選項包含 SVG 圖示和名稱
- 點擊選擇，樣式變化
- 支援回呼通知

| 方法 | 說明 |
|------|------|
| `select(type)` | 選擇軌道 |
| `getSelected()` | 取得已選軌道 |
| `onSelect(callback)` | 設定選擇回呼 |
| `reset()` | 重置選擇 |
| `show()` / `hide()` | 顯示/隱藏 |

### src/ui/Controls.ts
控制按鈕：
- 開始模擬按鈕
- 重新選擇按鈕
- 根據遊戲狀態切換顯示

| 方法 | 說明 |
|------|------|
| `onStart(callback)` | 設定開始回呼 |
| `onReset(callback)` | 設定重置回呼 |
| `setStartEnabled(bool)` | 啟用/停用開始按鈕 |
| `updateForState(state)` | 根據狀態更新按鈕 |

## 狀態對應

| 狀態 | 開始按鈕 | 重置按鈕 |
|------|----------|----------|
| SELECTING | 顯示 | 隱藏 |
| SIMULATING | 隱藏 | 隱藏 |
| FINISHED | 隱藏 | 顯示 |
