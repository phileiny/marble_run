import { Vector2D } from '../core/Vector2D';

/**
 * 貝茲曲線段
 * 使用三次貝茲曲線定義軌道
 */
export interface BezierSegment {
  p0: Vector2D; // 起點
  p1: Vector2D; // 控制點 1
  p2: Vector2D; // 控制點 2
  p3: Vector2D; // 終點
}

/**
 * 軌道基礎類別
 */
export abstract class Track {
  abstract readonly name: string;
  abstract readonly description: string;
  protected segments: BezierSegment[] = [];

  /** 取得所有曲線段 */
  getSegments(): BezierSegment[] {
    return this.segments;
  }

  /** 取得軌道總長度（近似值） */
  getTotalLength(): number {
    let total = 0;
    for (const segment of this.segments) {
      total += this.getSegmentLength(segment);
    }
    return total;
  }

  /** 取得單段曲線長度（使用數值積分近似） */
  private getSegmentLength(segment: BezierSegment, samples: number = 50): number {
    let length = 0;
    let prevPoint = this.evaluateBezier(segment, 0);

    for (let i = 1; i <= samples; i++) {
      const t = i / samples;
      const point = this.evaluateBezier(segment, t);
      length += point.distanceTo(prevPoint);
      prevPoint = point;
    }
    return length;
  }

  /**
   * 根據全域參數 t (0~1) 取得軌道上的點
   */
  getPointAt(t: number): Vector2D {
    const { segment, localT } = this.getSegmentAt(t);
    return this.evaluateBezier(segment, localT);
  }

  /**
   * 根據全域參數 t (0~1) 取得切線方向
   */
  getTangentAt(t: number): Vector2D {
    const { segment, localT } = this.getSegmentAt(t);
    return this.evaluateBezierTangent(segment, localT).normalize();
  }

  /**
   * 根據全域參數 t (0~1) 取得曲率
   * 正值：凹面朝上，負值：凹面朝下
   */
  getCurvatureAt(t: number): number {
    const { segment, localT } = this.getSegmentAt(t);
    return this.evaluateBezierCurvature(segment, localT);
  }

  /**
   * 將全域參數轉換為段落和局部參數
   */
  private getSegmentAt(t: number): { segment: BezierSegment; localT: number } {
    const clampedT = Math.max(0, Math.min(1, t));
    const totalSegments = this.segments.length;

    if (totalSegments === 0) {
      throw new Error('Track has no segments');
    }

    const scaledT = clampedT * totalSegments;
    const segmentIndex = Math.min(Math.floor(scaledT), totalSegments - 1);
    const localT = scaledT - segmentIndex;

    return {
      segment: this.segments[segmentIndex],
      localT: Math.min(localT, 1)
    };
  }

  /**
   * 計算三次貝茲曲線上的點
   * B(t) = (1-t)³P0 + 3(1-t)²tP1 + 3(1-t)t²P2 + t³P3
   */
  private evaluateBezier(seg: BezierSegment, t: number): Vector2D {
    const t2 = t * t;
    const t3 = t2 * t;
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;

    return new Vector2D(
      mt3 * seg.p0.x + 3 * mt2 * t * seg.p1.x + 3 * mt * t2 * seg.p2.x + t3 * seg.p3.x,
      mt3 * seg.p0.y + 3 * mt2 * t * seg.p1.y + 3 * mt * t2 * seg.p2.y + t3 * seg.p3.y
    );
  }

  /**
   * 計算三次貝茲曲線的一階導數（切線）
   * B'(t) = 3(1-t)²(P1-P0) + 6(1-t)t(P2-P1) + 3t²(P3-P2)
   */
  private evaluateBezierTangent(seg: BezierSegment, t: number): Vector2D {
    const t2 = t * t;
    const mt = 1 - t;
    const mt2 = mt * mt;

    const d0 = seg.p1.subtract(seg.p0);
    const d1 = seg.p2.subtract(seg.p1);
    const d2 = seg.p3.subtract(seg.p2);

    return new Vector2D(
      3 * mt2 * d0.x + 6 * mt * t * d1.x + 3 * t2 * d2.x,
      3 * mt2 * d0.y + 6 * mt * t * d1.y + 3 * t2 * d2.y
    );
  }

  /**
   * 計算曲率
   * κ = (x'y'' - y'x'') / (x'² + y'²)^(3/2)
   */
  private evaluateBezierCurvature(seg: BezierSegment, t: number): number {
    const mt = 1 - t;

    // 一階導數
    const d0 = seg.p1.subtract(seg.p0);
    const d1 = seg.p2.subtract(seg.p1);
    const d2 = seg.p3.subtract(seg.p2);

    const dx = 3 * mt * mt * d0.x + 6 * mt * t * d1.x + 3 * t * t * d2.x;
    const dy = 3 * mt * mt * d0.y + 6 * mt * t * d1.y + 3 * t * t * d2.y;

    // 二階導數
    const dd0 = d1.subtract(d0);
    const dd1 = d2.subtract(d1);

    const ddx = 6 * mt * dd0.x + 6 * t * dd1.x;
    const ddy = 6 * mt * dd0.y + 6 * t * dd1.y;

    // 曲率公式
    const numerator = dx * ddy - dy * ddx;
    const denominator = Math.pow(dx * dx + dy * dy, 1.5);

    if (denominator < 0.0001) return 0;
    return numerator / denominator;
  }

  /** 取得起點位置 */
  getStartPosition(): Vector2D {
    return this.getPointAt(0);
  }

  /** 取得終點位置 */
  getEndPosition(): Vector2D {
    return this.getPointAt(1);
  }
}
