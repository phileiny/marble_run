import { Marble } from '../entities/Marble';

/**
 * 彈珠繪製器
 * 繪製帶有光澤和運動模糊的彈珠
 */
export class MarbleRenderer {
  // 彈珠基本顏色
  private readonly baseColor = '#3b82f6';
  private readonly highlightColor = '#93c5fd';
  private readonly shadowColor = '#1e40af';

  constructor(private ctx: CanvasRenderingContext2D) {}

  /**
   * 繪製彈珠
   */
  draw(marble: Marble): void {
    const pos = marble.getPosition();
    const radius = marble.radius;
    const speed = Math.abs(marble.getSpeed());

    // 繪製運動模糊（高速時）
    if (speed > 200) {
      this.drawMotionBlur(marble, speed);
    }

    // 繪製彈珠陰影
    this.drawShadow(pos.x + 3, pos.y + 3, radius);

    // 繪製彈珠本體（漸層）
    this.drawBody(pos.x, pos.y, radius);

    // 繪製高光
    this.drawHighlight(pos.x, pos.y, radius);
  }

  /**
   * 繪製運動模糊
   */
  private drawMotionBlur(marble: Marble, speed: number): void {
    const pos = marble.getPosition();
    const tangent = marble.getTangent();
    const radius = marble.radius;

    // 模糊長度根據速度調整
    const blurLength = Math.min(speed / 10, 30);
    const steps = 5;

    for (let i = 1; i <= steps; i++) {
      const alpha = 0.1 * (1 - i / steps);
      const offset = (blurLength / steps) * i;

      // 反方向繪製殘影
      const blurX = pos.x - tangent.x * offset;
      const blurY = pos.y - tangent.y * offset;

      this.ctx.beginPath();
      this.ctx.arc(blurX, blurY, radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
      this.ctx.fill();
    }
  }

  /**
   * 繪製陰影
   */
  private drawShadow(x: number, y: number, radius: number): void {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    this.ctx.fill();
  }

  /**
   * 繪製彈珠本體
   */
  private drawBody(x: number, y: number, radius: number): void {
    // 建立徑向漸層
    const gradient = this.ctx.createRadialGradient(
      x - radius * 0.3,
      y - radius * 0.3,
      0,
      x,
      y,
      radius
    );

    gradient.addColorStop(0, this.highlightColor);
    gradient.addColorStop(0.5, this.baseColor);
    gradient.addColorStop(1, this.shadowColor);

    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
  }

  /**
   * 繪製高光
   */
  private drawHighlight(x: number, y: number, radius: number): void {
    // 主高光
    const highlightX = x - radius * 0.3;
    const highlightY = y - radius * 0.3;
    const highlightRadius = radius * 0.25;

    const gradient = this.ctx.createRadialGradient(
      highlightX, highlightY, 0,
      highlightX, highlightY, highlightRadius
    );

    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    this.ctx.beginPath();
    this.ctx.arc(highlightX, highlightY, highlightRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    // 小高光
    const smallHighlightX = x + radius * 0.2;
    const smallHighlightY = y + radius * 0.1;
    const smallRadius = radius * 0.1;

    this.ctx.beginPath();
    this.ctx.arc(smallHighlightX, smallHighlightY, smallRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    this.ctx.fill();
  }
}
