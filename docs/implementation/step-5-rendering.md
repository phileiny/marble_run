# Step 5 - 繪製系統

## 建立的檔案

### src/rendering/Renderer.ts
主繪製器，協調所有繪製工作：
- `clear()` - 清除畫布（漸層背景）
- `drawTrack()` - 繪製軌道
- `drawMarble()` - 繪製彈珠
- `drawCollectionBox()` - 繪製回收盒
- `drawParticles()` - 繪製粒子
- `emitParticles()` - 觸發粒子效果

### src/rendering/TrackRenderer.ts
軌道繪製器：
- 三層結構：陰影 → 主體 → 高光
- 金屬質感效果
- 支援預覽繪製

### src/rendering/MarbleRenderer.ts
彈珠繪製器：
- 徑向漸層本體（玻璃質感）
- 高光效果（主高光 + 小高光）
- 運動模糊（高速時顯示殘影）

### src/rendering/BoxRenderer.ts
回收盒繪製器：
- 金屬盒子效果
- 頂部凹槽開口
- 發光效果（彈珠接近時）

### src/rendering/ParticleSystem.ts
粒子系統：
- 星星形狀粒子
- 金色/橙色/白色/藍色混合
- 重力影響
- 發光效果

## 視覺效果

```
軌道：三層結構
┌─────────────────┐
│ 高光層（細）     │
│ 主體層          │
│ 陰影層（粗）     │
└─────────────────┘

彈珠：漸層 + 高光
    ○ ← 主高光
   ◕  ← 漸層本體
    · ← 小高光

粒子：星星形狀
  ✦ ✧ ✦
   ✧✦✧
  ✦ ✧ ✦
```
