# Step 9.4 - Controls 編輯狀態支援

## 修改的檔案

### src/ui/Controls.ts

## 變更內容

在 `updateForState` 方法新增 `State.EDITING` 的處理：

```typescript
case State.EDITING:
  this.startBtn.style.display = 'inline-block';
  this.startBtn.textContent = '開始模擬';
  this.resetBtn.style.display = 'inline-block';
  this.resetBtn.textContent = '取消編輯';
  break;
```

## 按鈕行為

| 狀態 | 開始按鈕 | 重置按鈕 |
|------|----------|----------|
| SELECTING | 顯示「開始模擬」 | 隱藏 |
| EDITING | 顯示「開始模擬」 | 顯示「取消編輯」 |
| SIMULATING | 隱藏 | 隱藏 |
| FINISHED | 隱藏 | 顯示「重新選擇」 |
