# 003 - 自訂軌道功能規劃

## 需求

新增第四種軌道選項「自訂軌道」，讓使用者透過點擊畫布定義控制點，自動產生平滑曲線。

## 使用者流程

```
1. 在軌道選擇畫面選擇「自訂軌道」
2. 進入編輯模式
3. 點擊畫布新增控制點（自動連接成平滑曲線）
4. 可拖曳調整已存在的控制點
5. 右鍵或按鈕移除最後一個點
6. 點擊「完成編輯」
7. 系統在終點自動放置收集盒
8. 點擊「開始模擬」
```

## 技術設計

### 狀態機更新

```
SELECTING → EDITING → SIMULATING → FINISHED
    ↑          │           │           │
    ├──────────┴───────────┴───────────┘
    │
    └── (選擇自訂軌道時進入 EDITING)
```

### 新增/修改的檔案

| 檔案 | 動作 | 說明 |
|------|------|------|
| GameState.ts | 修改 | 新增 EDITING 狀態、custom 軌道類型 |
| CustomTrack.ts | 新增 | 自訂軌道類別，支援動態增減控制點 |
| TrackEditor.ts | 新增 | 編輯器 UI，處理滑鼠事件 |
| TrackSelector.ts | 修改 | 新增第四個選項 |
| main.ts | 修改 | 整合編輯模式 |
| style.css | 修改 | 編輯模式樣式 |

### CustomTrack 類別

- `addPoint(point)` - 新增控制點
- `movePoint(index, position)` - 移動控制點
- `removeLastPoint()` - 移除最後一個點
- `getPoints()` - 取得所有控制點
- `isValid()` - 檢查是否有效（至少 2 個點）
- 使用 Catmull-Rom 樣條產生平滑曲線

### TrackEditor 類別

- 監聽 Canvas 滑鼠事件
- 點擊新增控制點
- 拖曳移動控制點
- 繪製控制點視覺化
- 顯示編輯提示文字

## 實作順序

1. 修改 GameState.ts - 新增 EDITING 狀態
2. 建立 CustomTrack.ts - 自訂軌道類別
3. 建立 TrackEditor.ts - 編輯器 UI
4. 修改 TrackSelector.ts - 新增自訂選項
5. 修改 main.ts - 整合編輯模式
6. 修改 style.css - 編輯模式樣式

## 待確認

- [x] 使用點擊方式新增控制點
- [ ] 最少需要幾個控制點？（建議 2 個）
- [ ] 是否需要儲存自訂軌道？（本次不做）
