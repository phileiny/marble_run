import { Vector2D } from '../core/Vector2D';

/**
 * 彈珠回收盒
 */
export class CollectionBox {
  constructor(
    public readonly position: Vector2D,
    public readonly width: number = 60,
    public readonly height: number = 40
  ) {}

  /**
   * 檢查彈珠是否在回收盒內
   */
  containsPoint(point: Vector2D, radius: number = 0): boolean {
    const left = this.position.x - this.width / 2;
    const right = this.position.x + this.width / 2;
    const top = this.position.y - this.height / 2;
    const bottom = this.position.y + this.height / 2;

    return (
      point.x + radius > left &&
      point.x - radius < right &&
      point.y + radius > top &&
      point.y - radius < bottom
    );
  }

  /**
   * 取得回收盒中心位置
   */
  getCenter(): Vector2D {
    return this.position.clone();
  }

  /**
   * 取得回收盒頂部中心（彈珠入口）
   */
  getEntryPoint(): Vector2D {
    return new Vector2D(this.position.x, this.position.y - this.height / 2);
  }
}
