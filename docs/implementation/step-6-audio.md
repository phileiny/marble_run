# Step 6 - 音效系統

## 建立的檔案

### src/audio/SoundGenerator.ts
程式化音效生成器，使用 Web Audio API：

| 方法 | 說明 | 實作方式 |
|------|------|----------|
| `createRollingSound()` | 滾動聲 | 濾波噪音，頻率隨速度變化 |
| `playClick()` | 點擊音效 | 短促正弦波 800Hz |
| `playWhoosh()` | 通過迴圈 | 鋸齒波頻率掃描 300→600→200Hz |
| `playDing()` | 落入回收盒 | 三個泛音 1200/2400/3600Hz |
| `playFail()` | 失敗音效 | 下降音 400→100Hz |

### src/audio/AudioManager.ts
音效管理器，統一介面：

| 方法 | 說明 |
|------|------|
| `init()` | 初始化（使用者互動後） |
| `setEnabled(bool)` | 開關音效 |
| `startRolling()` | 開始滾動聲 |
| `stopRolling()` | 停止滾動聲 |
| `updateRolling(speed)` | 更新滾動音量/頻率 |
| `playClick()` | 點擊 |
| `playWhoosh()` | 咻聲 |
| `playDing()` | 叮聲 |
| `playFail()` | 失敗 |

## 音效設計

```
滾動聲：噪音 → 低通濾波器 → 增益
        ↑          ↑
      速度影響   速度影響

叮聲：三個正弦波疊加
      1200Hz (主音)
      2400Hz (泛音)
      3600Hz (泛音)
```
