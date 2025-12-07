# Step 2.3 - Physics 物理引擎

## 建立的檔案

### src/core/Physics.ts

## 物理常數

| 常數 | 值 | 說明 |
|------|------|------|
| `gravity` | 980 | 重力加速度 (px/s²) |
| `friction` | 0.995 | 摩擦係數 |
| `minSpeed` | 5 | 停止判定閾值 |

## 方法

| 方法 | 說明 |
|------|------|
| `getGravityAlongTangent(tangent)` | 計算切線方向的重力分量 |
| `getCentripetalAcceleration(speed, curvature)` | 計算向心加速度 |
| `canStayOnTrack(speed, curvature, tangent)` | 檢查是否能通過迴圈 |
| `applyFriction(speed)` | 套用摩擦力 |
| `isStopped(speed)` | 檢查是否停止 |

## 物理原理

1. **重力沿軌道分量**：g × sin(θ) = g × tangent.y
2. **向心加速度**：a = v² / r = v² × curvature
3. **迴圈檢查**：頂部向心力需 ≥ 重力
