# Step 9.5 - 編輯模式樣式

## 修改的檔案

### style.css

## 新增樣式

### 自訂軌道選項

```css
.custom-option {
  border: 2px dashed rgba(255, 255, 255, 0.3);
}

.custom-option:hover {
  border-color: rgba(77, 171, 247, 0.5);
}

.custom-option.selected {
  border-style: solid;
  border-color: #4dabf7;
}
```

- 使用虛線邊框區分自訂選項
- 選中時變為實線

### 編輯模式

```css
#game-canvas.editing {
  cursor: crosshair;
}

.editing-hint {
  color: #94a3b8;
  font-size: 14px;
  margin-top: 8px;
}
```

- 編輯時 Canvas 顯示十字游標
- 提示文字樣式
