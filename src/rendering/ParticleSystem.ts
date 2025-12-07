/**
 * 粒子
 */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

/**
 * 粒子系統
 * 用於彈珠落入回收盒時的特效
 */
export class ParticleSystem {
  private particles: Particle[] = [];

  // 粒子顏色（星星效果）
  private readonly colors = [
    '#fbbf24', // 金色
    '#f59e0b', // 橙色
    '#fcd34d', // 淺金
    '#ffffff', // 白色
    '#93c5fd', // 淺藍
  ];

  constructor(private ctx: CanvasRenderingContext2D) {}

  /**
   * 發射粒子
   */
  emit(x: number, y: number, count: number): void {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 50 + Math.random() * 150;

      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 50, // 往上偏移
        life: 1,
        maxLife: 0.8 + Math.random() * 0.4,
        size: 3 + Math.random() * 4,
        color: this.colors[Math.floor(Math.random() * this.colors.length)]
      });
    }
  }

  /**
   * 更新粒子
   */
  update(dt: number): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // 更新位置
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      // 重力影響
      p.vy += 200 * dt;

      // 減少生命
      p.life -= dt / p.maxLife;

      // 移除死亡粒子
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  /**
   * 繪製粒子
   */
  draw(): void {
    for (const p of this.particles) {
      this.ctx.save();

      // 透明度隨生命減少
      this.ctx.globalAlpha = p.life;

      // 繪製星星形狀
      this.drawStar(p.x, p.y, p.size, p.color);

      this.ctx.restore();
    }
  }

  /**
   * 繪製星星
   */
  private drawStar(x: number, y: number, size: number, color: string): void {
    const spikes = 4;
    const outerRadius = size;
    const innerRadius = size * 0.4;

    this.ctx.beginPath();
    this.ctx.fillStyle = color;

    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / spikes - Math.PI / 2;

      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;

      if (i === 0) {
        this.ctx.moveTo(px, py);
      } else {
        this.ctx.lineTo(px, py);
      }
    }

    this.ctx.closePath();
    this.ctx.fill();

    // 發光效果
    this.ctx.shadowColor = color;
    this.ctx.shadowBlur = 10;
    this.ctx.fill();
    this.ctx.shadowBlur = 0;
  }

  /**
   * 是否有活動中的粒子
   */
  hasActiveParticles(): boolean {
    return this.particles.length > 0;
  }

  /**
   * 清除所有粒子
   */
  clear(): void {
    this.particles = [];
  }
}
