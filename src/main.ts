// 彈珠軌道模擬器 - 進入點

import { GameState, State } from './core/GameState';
import { Physics } from './core/Physics';
import { Engine } from './core/Engine';
import { Track } from './entities/Track';
import { Marble } from './entities/Marble';
import { CollectionBox } from './entities/CollectionBox';
import { TrackFactory } from './tracks/TrackFactory';
import { Renderer } from './rendering/Renderer';
import { AudioManager } from './audio/AudioManager';
import { TrackSelector } from './ui/TrackSelector';
import { Controls } from './ui/Controls';
import { TrackEditor } from './ui/TrackEditor';
import { Vector2D } from './core/Vector2D';

// Canvas 設定
const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

// 核心系統
const gameState = new GameState();
const physics = new Physics();
const engine = new Engine(gameState, physics);
const renderer = new Renderer(ctx);
const audioManager = new AudioManager();

// UI
const trackSelector = new TrackSelector();
const controls = new Controls();
const trackEditor = new TrackEditor(canvas);

// 遊戲物件
let currentTrack: Track | null = null;
let marble: Marble | null = null;
let collectionBox: CollectionBox | null = null;

// 是否為自訂軌道
let isCustomTrack = false;

// 迴圈檢測（用於播放咻聲）
let lastCurvature = 0;
let inLoop = false;

// 停止檢測
let stoppedFrames = 0;
const STOPPED_THRESHOLD = 60; // 停止 1 秒後結束

// 響應式 Canvas 尺寸
function resizeCanvas(): void {
  const maxWidth = 800;
  const maxHeight = 500;
  const aspectRatio = maxWidth / maxHeight;

  // 取得可用寬度（扣除 padding）
  const availableWidth = Math.min(window.innerWidth - 40, maxWidth);
  const availableHeight = availableWidth / aspectRatio;

  canvas.width = availableWidth;
  canvas.height = availableHeight;

  // 重新繪製（只在已初始化後）
  if (currentTrack || gameState.getState() === State.EDITING) {
    render();
  } else if (gameState.getState() === State.SELECTING) {
    renderWelcome();
  }
}

/**
 * 初始化遊戲
 */
function init(): void {
  // 軌道選擇事件（預設軌道）
  trackSelector.onSelect((type) => {
    // 如果正在編輯，先停用編輯器
    if (gameState.getState() === State.EDITING) {
      trackEditor.deactivate();
      trackEditor.reset();
      gameState.finishEditing();
    }

    isCustomTrack = false;
    gameState.selectTrack(type);
    controls.setStartEnabled(true);
    audioManager.playClick();

    // 預覽軌道
    currentTrack = TrackFactory.createTrack(type);
    collectionBox = TrackFactory.createCollectionBox(currentTrack);
    renderPreview();
  });

  // 自訂軌道選擇事件
  trackSelector.onCustomSelect(() => {
    isCustomTrack = true;
    audioManager.init();
    audioManager.playClick();
    startEditing();
  });

  // 編輯器變更事件
  trackEditor.onChange(() => {
    renderEditing();

    // 當有至少 2 個點時，啟用開始按鈕
    controls.setStartEnabled(trackEditor.isValid());
  });

  // 開始按鈕事件
  controls.onStart(() => {
    audioManager.init();
    audioManager.playClick();

    // 如果在編輯模式，先完成編輯
    if (gameState.getState() === State.EDITING) {
      finishEditing();
    }

    startSimulation();
  });

  // 撤銷按鈕事件（移除最後一個控制點）
  controls.onUndo(() => {
    audioManager.playClick();
    trackEditor.getTrack().removeLastPoint();
    renderEditing();
    controls.setStartEnabled(trackEditor.isValid());
  });

  // 重置按鈕事件
  controls.onReset(() => {
    audioManager.playClick();
    reset();
  });

  // 再玩一次按鈕事件（自訂軌道用同樣軌道重新模擬）
  controls.onReplay(() => {
    audioManager.playClick();
    replay();
  });

  // 遊戲狀態變化
  gameState.onStateChange((state) => {
    controls.updateForState(state, isCustomTrack);

    if (state === State.SELECTING) {
      trackSelector.show();
    } else {
      trackSelector.hide();
    }
  });

  // 初始狀態
  controls.setStartEnabled(false);
  controls.updateForState(State.SELECTING);

  // 設定引擎回呼
  engine.onUpdate(update);
  engine.onRender(render);

  // 啟動引擎
  engine.start();

  // 響應式尺寸
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // 初始畫面
  renderWelcome();
}

/**
 * 開始編輯自訂軌道
 */
function startEditing(): void {
  trackEditor.reset();
  trackEditor.activate();
  gameState.startEditing();
  controls.setStartEnabled(false);
  renderEditing();
}

/**
 * 完成編輯
 */
function finishEditing(): void {
  trackEditor.deactivate();

  // 取得自訂軌道
  currentTrack = trackEditor.getTrack();

  // 在軌道終點建立回收盒
  if (currentTrack && currentTrack.getSegments().length > 0) {
    const endPos = currentTrack.getEndPosition();
    collectionBox = new CollectionBox(
      new Vector2D(endPos.x, endPos.y + 30),
      60,
      40
    );
  }
}

/**
 * 開始模擬
 */
function startSimulation(): void {
  if (!currentTrack) return;

  // 確保有回收盒
  if (!collectionBox) {
    const endPos = currentTrack.getEndPosition();
    collectionBox = new CollectionBox(
      new Vector2D(endPos.x, endPos.y + 30),
      60,
      40
    );
  }

  // 建立彈珠
  marble = new Marble(currentTrack);

  // 開始滾動音效
  audioManager.startRolling();

  // 重置迴圈檢測
  lastCurvature = 0;
  inLoop = false;

  // 重置停止檢測
  stoppedFrames = 0;

  // 開始模擬
  gameState.startSimulation();
}

/**
 * 重置遊戲
 */
function reset(): void {
  marble = null;
  currentTrack = null;
  collectionBox = null;

  audioManager.stopRolling();
  renderer.getParticleSystem().clear();
  trackSelector.reset();
  trackEditor.reset();
  controls.setStartEnabled(false);

  isCustomTrack = false;
  gameState.reset();
  renderWelcome();
}

/**
 * 再玩一次（自訂軌道保留軌道重新模擬）
 */
function replay(): void {
  marble = null;
  audioManager.stopRolling();
  renderer.getParticleSystem().clear();

  // 保留 currentTrack 和 collectionBox，直接重新開始模擬
  startSimulation();
}

/**
 * 物理更新
 */
function update(dt: number): void {
  if (!marble || !collectionBox) return;

  // 更新彈珠
  marble.update(physics, dt);

  // 更新滾動音效
  audioManager.updateRolling(marble.getSpeed());

  // 迴圈檢測（曲率突然變大）
  const curvature = Math.abs(currentTrack?.getCurvatureAt(marble.getT()) || 0);
  if (curvature > 0.01 && lastCurvature < 0.005 && !inLoop) {
    inLoop = true;
    audioManager.playWhoosh();
  }
  if (curvature < 0.005) {
    inLoop = false;
  }
  lastCurvature = curvature;

  // 檢查是否停止移動
  if (physics.isStopped(marble.getSpeed())) {
    stoppedFrames++;
    if (stoppedFrames >= STOPPED_THRESHOLD) {
      finishSimulation(false);
      return;
    }
  } else {
    stoppedFrames = 0;
  }

  // 檢查是否到達終點
  if (marble.hasReachedEnd()) {
    finishSimulation(true);
  } else if (marble.hasLeftTrack() && !marble.hasReachedEnd()) {
    finishSimulation(false);
  }

  // 更新粒子
  renderer.updateParticles(dt);
}

/**
 * 結束模擬
 */
function finishSimulation(success: boolean): void {
  audioManager.stopRolling();

  if (success && marble && collectionBox) {
    // 成功落入回收盒
    audioManager.playDing();
    const pos = collectionBox.getCenter();
    renderer.emitParticles(pos.x, pos.y);
  } else {
    // 失敗（掉落）
    audioManager.playFail();
  }

  gameState.finishSimulation();
}

/**
 * 繪製畫面
 */
function render(): void {
  renderer.clear();

  const state = gameState.getState();

  // 編輯模式
  if (state === State.EDITING) {
    renderEditing();
    return;
  }

  // 選擇模式但沒有軌道
  if (state === State.SELECTING && !currentTrack) {
    renderWelcome();
    return;
  }

  // 繪製軌道
  if (currentTrack) {
    renderer.drawTrack(currentTrack);
  }

  // 繪製回收盒
  if (collectionBox) {
    renderer.drawCollectionBox(collectionBox);
  }

  // 繪製彈珠
  if (marble && !marble.hasLeftTrack()) {
    renderer.drawMarble(marble);
  }

  // 繪製粒子
  renderer.drawParticles();

  // 結束畫面訊息
  if (state === State.FINISHED) {
    renderFinishMessage();
  }
}

// 設計尺寸（用於座標計算）
const DESIGN_WIDTH = 800;
const DESIGN_HEIGHT = 500;

/**
 * 繪製歡迎畫面
 */
function renderWelcome(): void {
  renderer.clear();

  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 28px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('彈珠軌道模擬器', DESIGN_WIDTH / 2, DESIGN_HEIGHT / 2 - 20);

  ctx.font = '16px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('選擇一個軌道開始模擬', DESIGN_WIDTH / 2, DESIGN_HEIGHT / 2 + 15);
}

/**
 * 繪製編輯模式
 */
function renderEditing(): void {
  renderer.clear();

  // 繪製自訂軌道
  const customTrack = trackEditor.getTrack();
  if (customTrack.getSegments().length > 0) {
    renderer.drawTrack(customTrack);
  }

  // 繪製編輯器控制點
  trackEditor.draw();

  // 繪製提示
  trackEditor.drawHint();
}

/**
 * 繪製預覽
 */
function renderPreview(): void {
  renderer.clear();

  if (currentTrack) {
    renderer.drawTrack(currentTrack);
  }

  if (collectionBox) {
    renderer.drawCollectionBox(collectionBox);
  }

  // 繪製起點標示
  if (currentTrack) {
    const start = currentTrack.getStartPosition();
    ctx.beginPath();
    ctx.arc(start.x, start.y, 12, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
    ctx.fill();

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('起點', start.x, start.y - 20);
  }
}

/**
 * 繪製結束訊息
 */
function renderFinishMessage(): void {
  const success = marble?.hasReachedEnd() ?? false;

  ctx.fillStyle = success ? '#22c55e' : '#ef4444';
  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'center';

  const message = success ? '成功！' : '失敗！';
  ctx.fillText(message, DESIGN_WIDTH / 2, 50);
}

// 啟動遊戲
init();
console.log('Marble Run 初始化完成');
