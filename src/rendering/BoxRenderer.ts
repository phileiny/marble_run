import { CollectionBox } from '../entities/CollectionBox';

/**
 * 回收盒繪製器
 */
export class BoxRenderer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  /**
   * 繪製回收盒
   */
  draw(box: CollectionBox): void {
    const pos = box.position;
    const w = box.width;
    const h = box.height;

    const left = pos.x - w / 2;
    const top = pos.y - h / 2;

    // 繪製盒子陰影
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    this.ctx.fillRect(left + 4, top + 4, w, h);

    // 繪製盒子底部（深色）
    const bottomGradient = this.ctx.createLinearGradient(left, top, left, top + h);
    bottomGradient.addColorStop(0, '#4a5568');
    bottomGradient.addColorStop(1, '#2d3748');

    this.ctx.fillStyle = bottomGradient;
    this.ctx.fillRect(left, top, w, h);

    // 繪製盒子邊框
    this.ctx.strokeStyle = '#718096';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(left, top, w, h);

    // 繪製盒子開口（頂部凹槽效果）
    this.ctx.fillStyle = '#1a202c';
    this.ctx.fillRect(left + 4, top, w - 8, 6);

    // 繪製金屬邊緣高光
    this.ctx.strokeStyle = '#a0aec0';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(left, top);
    this.ctx.lineTo(left + w, top);
    this.ctx.stroke();

    // 繪製標籤
    this.ctx.fillStyle = '#e2e8f0';
    this.ctx.font = '10px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('收集', pos.x, pos.y + 4);
  }

  /**
   * 繪製發光效果（彈珠即將落入時）
   */
  drawGlow(box: CollectionBox): void {
    const pos = box.position;
    const w = box.width;
    const h = box.height;

    this.ctx.save();

    // 發光效果
    const gradient = this.ctx.createRadialGradient(
      pos.x, pos.y, 0,
      pos.x, pos.y, Math.max(w, h)
    );
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(pos.x - w, pos.y - h, w * 2, h * 2);

    this.ctx.restore();
  }
}
