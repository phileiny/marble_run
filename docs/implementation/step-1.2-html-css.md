# Step 1.2 - HTML 與 CSS

## 建立的檔案

### index.html
- 語言設為 zh-TW
- 包含 Canvas 元素 (`#game-canvas`)
- UI 容器：軌道選擇區 (`#track-selector`) + 控制按鈕 (`#controls`)
- 載入 main.ts 作為 module

### style.css
- 深色漸層背景
- Canvas 有圓角和陰影
- 軌道選項卡片樣式（hover/selected 狀態）
- 按鈕漸層樣式

## 畫面結構

```
┌─────────────────────────────┐
│         Canvas              │
└─────────────────────────────┘
        選擇軌道
  ┌───┐  ┌───┐  ┌───┐
  │ 1 │  │ 2 │  │ 3 │
  └───┘  └───┘  └───┘
      [ 開始模擬 ]
```
