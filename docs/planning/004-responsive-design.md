# 004 - 響應式設計規劃

## 需求

讓彈珠軌道模擬器可以在手機上正常顯示與操作。

## 問題分析

1. Canvas 固定 800x500，手機螢幕放不下
2. 軌道座標是絕對座標，縮小 Canvas 後軌道超出範圍
3. 自訂軌道編輯器沒有觸控支援
4. 右鍵刪除在手機上無法使用

## 解決方案

### Canvas 自適應

```
設計尺寸：800 x 500（固定）
實際尺寸：min(螢幕寬度 - 40, 800) x 等比例高度
縮放比例：實際寬度 / 800
```

### 座標縮放

使用 `ctx.setTransform(scale, 0, 0, scale, 0, 0)` 在繪製前套用縮放，讓所有繪製都使用設計座標。

### 觸控支援

- touchstart: 新增控制點或開始拖曳
- touchmove: 拖曳控制點
- touchend: 結束拖曳
- 新增「撤銷」按鈕替代右鍵

## 修改檔案

| 檔案 | 修改內容 |
|------|----------|
| main.ts | resizeCanvas()、DESIGN_WIDTH/HEIGHT |
| Renderer.ts | getScale()、setTransform() |
| TrackEditor.ts | 觸控事件、座標轉換 |
| Controls.ts | 撤銷按鈕 |
| index.html | 撤銷按鈕 |
| style.css | 響應式樣式、touch-action |
