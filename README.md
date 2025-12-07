# 彈珠軌道模擬器 Marble Run

一個基於 HTML5 Canvas 的彈珠軌道模擬器，觀看彈珠沿著軌道滾動的療癒體驗。

## 功能特色

- 3 種預設軌道：經典斜坡、單迴圈、雙迴圈
- 自訂軌道：點擊畫布繪製專屬軌道
- 玻璃質感彈珠與金屬軌道視覺效果
- 音效：滾動聲、迴圈咻聲、成功叮聲
- 粒子特效：彈珠落入收集盒時綻放

## 快速開始

```bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 建置生產版本
npm run build

# 預覽生產版本
npm run preview
```

## 技術架構

- **前端框架**：純 TypeScript + HTML5 Canvas
- **建置工具**：Vite
- **音效**：Web Audio API（程式產生）
- **曲線演算法**：Cubic Bezier、Catmull-Rom Spline

## 專案結構

```
src/
├── core/           # 核心模組
│   ├── Engine.ts       # 遊戲引擎（固定時間步）
│   ├── GameState.ts    # 狀態管理
│   ├── Physics.ts      # 物理計算
│   └── Vector2D.ts     # 向量運算
├── entities/       # 遊戲物件
│   ├── Track.ts        # 軌道基底類別
│   ├── Marble.ts       # 彈珠
│   └── CollectionBox.ts # 收集盒
├── tracks/         # 軌道實作
│   ├── TrackFactory.ts # 軌道工廠
│   ├── ClassicSlope.ts # 經典斜坡
│   ├── SingleLoop.ts   # 單迴圈
│   ├── DoubleLoop.ts   # 雙迴圈
│   └── CustomTrack.ts  # 自訂軌道
├── rendering/      # 渲染模組
│   ├── Renderer.ts     # 主渲染器
│   └── ParticleSystem.ts # 粒子系統
├── audio/          # 音效模組
│   ├── AudioManager.ts # 音效管理
│   └── SoundGenerator.ts # 音效產生器
├── ui/             # 使用者介面
│   ├── TrackSelector.ts # 軌道選擇器
│   ├── Controls.ts     # 控制按鈕
│   └── TrackEditor.ts  # 軌道編輯器
└── main.ts         # 進入點
```

## 操作說明

### 預設軌道

1. 選擇一個軌道
2. 點擊「開始模擬」
3. 觀看彈珠滾動
4. 點擊「重新選擇」再玩一次

### 自訂軌道

1. 選擇「自訂軌道」
2. 左鍵點擊畫布新增控制點
3. 左鍵拖曳移動控制點
4. 右鍵移除最後一個控制點
5. 點擊「開始模擬」

## 部署

專案設定為部署至 GitHub Pages：

```bash
npm run build
# 將 dist 資料夾內容部署至 gh-pages 分支
```

## 開發文件

- `docs/planning/` - 規劃文件
- `docs/implementation/` - 實作紀錄
- `docs/validation/` - 驗證文件

## 授權

MIT License
