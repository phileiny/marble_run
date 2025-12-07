# Step 10 - 響應式設計實作

## 修改的檔案

### 1. src/main.ts

新增 `resizeCanvas()` 函數：

```typescript
const DESIGN_WIDTH = 800;
const DESIGN_HEIGHT = 500;

function resizeCanvas(): void {
  const maxWidth = 800;
  const aspectRatio = 800 / 500;
  const availableWidth = Math.min(window.innerWidth - 40, maxWidth);
  const availableHeight = availableWidth / aspectRatio;

  canvas.width = availableWidth;
  canvas.height = availableHeight;
}
```

### 2. src/rendering/Renderer.ts

在 `clear()` 中套用縮放：

```typescript
getScale(): number {
  return this.ctx.canvas.width / this.designWidth;
}

clear(): void {
  const scale = this.getScale();
  this.ctx.setTransform(1, 0, 0, 1, 0, 0);  // 重置
  // 繪製背景...
  this.ctx.setTransform(scale, 0, 0, scale, 0, 0);  // 套用縮放
}
```

### 3. src/ui/TrackEditor.ts

新增觸控事件：

```typescript
this.canvas.addEventListener('touchstart', this.handleTouchStart, { passive: false });
this.canvas.addEventListener('touchmove', this.handleTouchMove, { passive: false });
this.canvas.addEventListener('touchend', this.handleTouchEnd);
```

座標轉換使用設計尺寸：

```typescript
private getMousePosition(e: MouseEvent): Vector2D {
  const rect = this.canvas.getBoundingClientRect();
  const scaleX = this.designWidth / rect.width;
  const scaleY = (this.designWidth / 1.6) / rect.height;
  return new Vector2D(
    (e.clientX - rect.left) * scaleX,
    (e.clientY - rect.top) * scaleY
  );
}
```

### 4. src/ui/Controls.ts

新增撤銷按鈕：

```typescript
private undoBtn: HTMLButtonElement;
private onUndoCallback: (() => void) | null = null;

onUndo(callback: () => void): void {
  this.onUndoCallback = callback;
}
```

### 5. index.html

```html
<button id="undo-btn" style="display: none;">撤銷</button>
```

### 6. style.css

響應式樣式：

```css
@media (max-width: 600px) {
  .track-option { width: 70px; height: 70px; }
  button { padding: 10px 20px; font-size: 14px; }
}

#game-canvas { touch-action: none; }
button { touch-action: manipulation; }
```
