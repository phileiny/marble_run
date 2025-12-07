/**
 * 2D 向量類別
 * 用於位置、速度、加速度等計算
 */
export class Vector2D {
  constructor(
    public x: number,
    public y: number
  ) {}

  /** 向量加法 */
  add(v: Vector2D): Vector2D {
    return new Vector2D(this.x + v.x, this.y + v.y);
  }

  /** 向量減法 */
  subtract(v: Vector2D): Vector2D {
    return new Vector2D(this.x - v.x, this.y - v.y);
  }

  /** 純量乘法 */
  multiply(scalar: number): Vector2D {
    return new Vector2D(this.x * scalar, this.y * scalar);
  }

  /** 向量長度 */
  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /** 單位向量 */
  normalize(): Vector2D {
    const mag = this.magnitude();
    if (mag === 0) return new Vector2D(0, 0);
    return new Vector2D(this.x / mag, this.y / mag);
  }

  /** 內積 */
  dot(v: Vector2D): number {
    return this.x * v.x + this.y * v.y;
  }

  /** 複製向量 */
  clone(): Vector2D {
    return new Vector2D(this.x, this.y);
  }

  /** 兩點間距離 */
  distanceTo(v: Vector2D): number {
    return this.subtract(v).magnitude();
  }

  /** 垂直向量（逆時針旋轉 90 度） */
  perpendicular(): Vector2D {
    return new Vector2D(-this.y, this.x);
  }

  /** 旋轉向量 */
  rotate(angle: number): Vector2D {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Vector2D(
      this.x * cos - this.y * sin,
      this.x * sin + this.y * cos
    );
  }
}
