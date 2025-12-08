# 005 - 再玩一次按鈕規劃

## 需求

自訂軌道模擬結束後，可以用同樣的軌道重新模擬，不需要回到選擇畫面重新繪製。

## 使用者流程

```
1. 選擇「自訂軌道」
2. 繪製軌道控制點
3. 點擊「開始模擬」
4. 模擬結束後顯示：
   - 「再玩一次」按鈕（保留軌道重新模擬）
   - 「重新選擇」按鈕（回到選擇畫面）
```

## 技術設計

### 新增元素

- `#replay-btn` 按鈕（綠色）
- `isCustomTrack` 狀態標記

### 修改邏輯

1. `Controls.updateForState()` 新增 `isCustomTrack` 參數
2. FINISHED 狀態時，若為自訂軌道則顯示「再玩一次」按鈕
3. `replay()` 函數保留 `currentTrack` 和 `collectionBox`，只重建彈珠

### 重要：狀態重置

`replay()` 必須重置：
- `stoppedFrames = 0`
- `lastCurvature = 0`
- `inLoop = false`

否則會因為舊的停止計數導致立即觸發失敗。

### 重要：GameState 狀態轉換

`GameState.startSimulation()` 必須允許從 `FINISHED` 狀態轉換到 `SIMULATING`。

否則 replay 時狀態機無法轉換，引擎不會執行更新回呼。

## 修改檔案

| 檔案 | 修改內容 |
|------|----------|
| index.html | 新增 replay-btn |
| Controls.ts | 新增 onReplay、updateForState 參數 |
| main.ts | 新增 isCustomTrack、replay() |
| style.css | replay-btn 樣式 |
| GameState.ts | startSimulation 加入 FINISHED 狀態判斷 |
