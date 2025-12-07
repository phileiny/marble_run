import { Track } from '../entities/Track';
import { Marble } from '../entities/Marble';
import { CollectionBox } from '../entities/CollectionBox';
import { TrackRenderer } from './TrackRenderer';
import { MarbleRenderer } from './MarbleRenderer';
import { BoxRenderer } from './BoxRenderer';
import { ParticleSystem } from './ParticleSystem';

/**
 * 主繪製器
 * 協調所有繪製工作
 */
export class Renderer {
  private trackRenderer: TrackRenderer;
  private marbleRenderer: MarbleRenderer;
  private boxRenderer: BoxRenderer;
  private particleSystem: ParticleSystem;

  constructor(private ctx: CanvasRenderingContext2D) {
    this.trackRenderer = new TrackRenderer(ctx);
    this.marbleRenderer = new MarbleRenderer(ctx);
    this.boxRenderer = new BoxRenderer(ctx);
    this.particleSystem = new ParticleSystem(ctx);
  }

  /**
   * 清除畫布
   */
  clear(): void {
    const canvas = this.ctx.canvas;

    // 繪製背景漸層
    const gradient = this.ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#2d2d44');
    gradient.addColorStop(1, '#1a1a2e');

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * 繪製軌道
   */
  drawTrack(track: Track): void {
    this.trackRenderer.draw(track);
  }

  /**
   * 繪製彈珠
   */
  drawMarble(marble: Marble): void {
    this.marbleRenderer.draw(marble);
  }

  /**
   * 繪製回收盒
   */
  drawCollectionBox(box: CollectionBox): void {
    this.boxRenderer.draw(box);
  }

  /**
   * 更新粒子系統
   */
  updateParticles(dt: number): void {
    this.particleSystem.update(dt);
  }

  /**
   * 繪製粒子
   */
  drawParticles(): void {
    this.particleSystem.draw();
  }

  /**
   * 觸發粒子效果（彈珠落入回收盒時）
   */
  emitParticles(x: number, y: number): void {
    this.particleSystem.emit(x, y, 20);
  }

  /**
   * 取得粒子系統
   */
  getParticleSystem(): ParticleSystem {
    return this.particleSystem;
  }
}
