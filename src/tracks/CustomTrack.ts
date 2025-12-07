import { Vector2D } from '../core/Vector2D';
import { Track, BezierSegment } from '../entities/Track';

/**
 * 自訂軌道
 * 使用者透過點擊畫布定義控制點
 */
export class CustomTrack extends Track {
  readonly name = '自訂軌道';
  readonly description = '點擊畫布建立軌道';

  // 使用者定義的路徑點
  private points: Vector2D[] = [];

  constructor() {
    super();
  }

  /**
   * 新增控制點
   */
  addPoint(point: Vector2D): void {
    this.points.push(point);
    this.rebuildSegments();
  }

  /**
   * 移動控制點
   */
  movePoint(index: number, newPosition: Vector2D): void {
    if (index >= 0 && index < this.points.length) {
      this.points[index] = newPosition;
      this.rebuildSegments();
    }
  }

  /**
   * 移除最後一個控制點
   */
  removeLastPoint(): void {
    if (this.points.length > 0) {
      this.points.pop();
      this.rebuildSegments();
    }
  }

  /**
   * 取得所有控制點
   */
  getPoints(): Vector2D[] {
    return [...this.points];
  }

  /**
   * 取得控制點數量
   */
  getPointCount(): number {
    return this.points.length;
  }

  /**
   * 清除所有控制點
   */
  clear(): void {
    this.points = [];
    this.segments = [];
  }

  /**
   * 檢查軌道是否有效（至少需要 2 個點）
   */
  isValid(): boolean {
    return this.points.length >= 2;
  }

  /**
   * 根據控制點重建貝茲曲線段
   * 使用 Catmull-Rom 樣條轉換為貝茲曲線，產生平滑路徑
   */
  private rebuildSegments(): void {
    this.segments = [];

    if (this.points.length < 2) return;

    // 使用 Catmull-Rom 樣條產生平滑曲線
    for (let i = 0; i < this.points.length - 1; i++) {
      const p0 = this.points[Math.max(0, i - 1)];
      const p1 = this.points[i];
      const p2 = this.points[i + 1];
      const p3 = this.points[Math.min(this.points.length - 1, i + 2)];

      // Catmull-Rom 轉 Bezier
      const segment = this.catmullRomToBezier(p0, p1, p2, p3);
      this.segments.push(segment);
    }
  }

  /**
   * 將 Catmull-Rom 樣條段轉換為三次貝茲曲線
   */
  private catmullRomToBezier(
    p0: Vector2D,
    p1: Vector2D,
    p2: Vector2D,
    p3: Vector2D
  ): BezierSegment {
    // 張力係數（0.5 為標準 Catmull-Rom）
    const tension = 0.5;

    // 計算貝茲控制點
    const c1 = new Vector2D(
      p1.x + (p2.x - p0.x) * tension / 3,
      p1.y + (p2.y - p0.y) * tension / 3
    );

    const c2 = new Vector2D(
      p2.x - (p3.x - p1.x) * tension / 3,
      p2.y - (p3.y - p1.y) * tension / 3
    );

    return {
      p0: p1,
      p1: c1,
      p2: c2,
      p3: p2
    };
  }

  /**
   * 尋找最接近指定位置的控制點
   * @returns 控制點索引，如果沒有找到則返回 -1
   */
  findNearestPoint(position: Vector2D, threshold: number = 20): number {
    let nearestIndex = -1;
    let nearestDistance = threshold;

    for (let i = 0; i < this.points.length; i++) {
      const distance = position.distanceTo(this.points[i]);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = i;
      }
    }

    return nearestIndex;
  }
}
