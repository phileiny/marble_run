# Step 3.1 - Track 軌道基礎類別

## 建立的檔案

### src/entities/Track.ts

## 架構

使用**三次貝茲曲線**定義軌道路徑。

### BezierSegment 介面

```
p0 -------- p1
             |
             |
p3 -------- p2
```

- `p0`：起點
- `p1`：控制點 1
- `p2`：控制點 2
- `p3`：終點

### Track 抽象類別

| 方法 | 說明 |
|------|------|
| `getPointAt(t)` | 取得參數 t (0~1) 對應的位置 |
| `getTangentAt(t)` | 取得切線方向（單位向量） |
| `getCurvatureAt(t)` | 取得曲率 |
| `getTotalLength()` | 取得軌道總長度 |
| `getStartPosition()` | 取得起點 |
| `getEndPosition()` | 取得終點 |

## 數學公式

### 三次貝茲曲線
```
B(t) = (1-t)³P0 + 3(1-t)²tP1 + 3(1-t)t²P2 + t³P3
```

### 曲率
```
κ = (x'y'' - y'x'') / (x'² + y'²)^(3/2)
```
