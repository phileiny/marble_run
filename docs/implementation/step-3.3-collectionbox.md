# Step 3.3 - CollectionBox 回收盒

## 建立的檔案

### src/entities/CollectionBox.ts

## 屬性

| 屬性 | 預設值 | 說明 |
|------|--------|------|
| `position` | - | 中心位置 |
| `width` | 60 | 寬度 |
| `height` | 40 | 高度 |

## 方法

| 方法 | 說明 |
|------|------|
| `containsPoint(point, radius)` | 檢查點是否在盒內 |
| `getCenter()` | 取得中心位置 |
| `getEntryPoint()` | 取得入口位置（頂部中心） |

## 結構示意

```
        入口 (getEntryPoint)
          ↓
    ┌─────────────┐
    │             │
    │   回收盒    │ ← position (中心)
    │             │
    └─────────────┘
```
