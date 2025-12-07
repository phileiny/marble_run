# 002 - 實作順序規劃

## 實作步驟（小步迭代）

根據 claude.md 的 Small Steps 原則，將專案拆成以下步驟：

### Phase 1：專案基礎建設

- [ ] Step 1.1：建立 package.json、vite.config.ts、tsconfig.json
- [ ] Step 1.2：建立 index.html 和 style.css
- [ ] Step 1.3：建立 main.ts 進入點，確認專案能執行

### Phase 2：核心模組

- [ ] Step 2.1：Vector2D 向量數學工具
- [ ] Step 2.2：GameState 遊戲狀態管理
- [ ] Step 2.3：Physics 物理引擎基礎
- [ ] Step 2.4：Engine 遊戲主迴圈

### Phase 3：實體物件

- [ ] Step 3.1：Track 軌道基礎類別 + 貝茲曲線
- [ ] Step 3.2：Marble 彈珠實體
- [ ] Step 3.3：CollectionBox 回收盒

### Phase 4：軌道設計

- [ ] Step 4.1：ClassicSlope 經典斜坡
- [ ] Step 4.2：SingleLoop 單環迴圈
- [ ] Step 4.3：DoubleLoop 雙重迴圈

### Phase 5：繪製系統

- [ ] Step 5.1：Renderer 主繪製器
- [ ] Step 5.2：TrackRenderer 軌道繪製（金屬質感）
- [ ] Step 5.3：MarbleRenderer 彈珠繪製（光澤效果）
- [ ] Step 5.4：BoxRenderer 回收盒繪製
- [ ] Step 5.5：ParticleSystem 粒子特效

### Phase 6：音效系統

- [ ] Step 6.1：AudioManager 音效管理
- [ ] Step 6.2：SoundGenerator 程式化音效生成

### Phase 7：使用者介面

- [ ] Step 7.1：TrackSelector 軌道選擇介面
- [ ] Step 7.2：Controls 控制按鈕

### Phase 8：整合與部署

- [ ] Step 8.1：整合所有模組
- [ ] Step 8.2：測試與除錯
- [ ] Step 8.3：GitHub Pages 部署設定

## 原則

- 每完成一個 Step，等待使用者確認後再繼續
- 每個 Step 都要能獨立驗證
- 遇到問題暫停詢問，不擅自決定
