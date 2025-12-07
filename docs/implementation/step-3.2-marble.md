# Step 3.2 - Marble 彈珠實體

## 建立的檔案

### src/entities/Marble.ts

## 屬性

| 屬性 | 說明 |
|------|------|
| `t` | 軌道參數位置 (0~1) |
| `speed` | 沿軌道方向的速度 (px/s) |
| `position` | 當前位置 |
| `radius` | 半徑 (預設 12px) |
| `hasLeft` | 是否已離開軌道 |
| `speedHistory` | 速度歷史（用於運動模糊/音效） |

## 方法

| 方法 | 說明 |
|------|------|
| `reset()` | 重置到起點 |
| `update(physics, dt)` | 更新物理狀態 |
| `getPosition()` | 取得位置 |
| `getSpeed()` | 取得速度 |
| `getAverageSpeed()` | 取得平均速度 |
| `hasLeftTrack()` | 是否離開軌道 |
| `hasReachedEnd()` | 是否到達終點 |
| `getTangent()` | 取得切線方向 |

## 物理更新流程

```
1. 取得切線方向、曲率
2. 計算重力加速度
3. 更新速度
4. 套用摩擦力
5. 檢查迴圈（向心力）
6. 更新位置參數 t
7. 檢查終點
```
