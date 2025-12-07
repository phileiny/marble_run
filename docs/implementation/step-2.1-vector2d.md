# Step 2.1 - Vector2D 向量數學工具

## 建立的檔案

### src/core/Vector2D.ts

2D 向量類別，提供以下方法：

| 方法 | 說明 |
|------|------|
| `add(v)` | 向量加法 |
| `subtract(v)` | 向量減法 |
| `multiply(scalar)` | 純量乘法 |
| `magnitude()` | 向量長度 |
| `normalize()` | 單位向量 |
| `dot(v)` | 內積 |
| `clone()` | 複製向量 |
| `distanceTo(v)` | 兩點間距離 |
| `perpendicular()` | 垂直向量 |
| `rotate(angle)` | 旋轉向量 |

## 用途

- 彈珠位置、速度、加速度
- 軌道切線方向計算
- 物理力的計算
