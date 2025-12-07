import { Vector2D } from '../core/Vector2D';
import { Track } from './Track';
import { Physics } from '../core/Physics';

/**
 * 彈珠實體
 */
export class Marble {
  // 在軌道上的參數位置 (0~1)
  private t: number = 0;

  // 沿軌道方向的速度 (像素/秒)
  private speed: number = 0;

  // 當前位置（從軌道計算得出）
  private position: Vector2D;

  // 是否已離開軌道（落入回收盒）
  private hasLeft: boolean = false;

  // 速度歷史（用於運動模糊）
  private speedHistory: number[] = [];

  constructor(
    private track: Track,
    public readonly radius: number = 12
  ) {
    this.position = track.getStartPosition();
  }

  /** 重置到起點 */
  reset(): void {
    this.t = 0;
    this.speed = 0;
    this.position = this.track.getStartPosition();
    this.hasLeft = false;
    this.speedHistory = [];
  }

  /** 更新物理狀態 */
  update(physics: Physics, dt: number): void {
    if (this.hasLeft) return;

    // 取得當前切線方向和曲率
    const tangent = this.track.getTangentAt(this.t);
    const curvature = this.track.getCurvatureAt(this.t);

    // 計算重力沿軌道的加速度
    const gravityAcc = physics.getGravityAlongTangent(tangent);

    // 更新速度
    this.speed += gravityAcc * dt;

    // 套用摩擦力
    this.speed = physics.applyFriction(this.speed);

    // 記錄速度歷史
    this.speedHistory.push(Math.abs(this.speed));
    if (this.speedHistory.length > 10) {
      this.speedHistory.shift();
    }

    // 檢查是否能維持在軌道上（通過迴圈時）
    if (!physics.canStayOnTrack(this.speed, curvature, tangent)) {
      // 掉落處理（簡化：直接標記為離開）
      this.hasLeft = true;
      return;
    }

    // 計算新的 t 值
    const totalLength = this.track.getTotalLength();
    const distance = this.speed * dt;
    this.t += distance / totalLength;

    // 檢查是否到達終點
    if (this.t >= 1) {
      this.t = 1;
      this.hasLeft = true;
    }

    // 更新位置
    this.position = this.track.getPointAt(this.t);
  }

  /** 取得當前位置 */
  getPosition(): Vector2D {
    return this.position;
  }

  /** 取得當前速度 */
  getSpeed(): number {
    return this.speed;
  }

  /** 取得平均速度（用於音效） */
  getAverageSpeed(): number {
    if (this.speedHistory.length === 0) return 0;
    const sum = this.speedHistory.reduce((a, b) => a + b, 0);
    return sum / this.speedHistory.length;
  }

  /** 取得軌道參數 */
  getT(): number {
    return this.t;
  }

  /** 是否已離開軌道 */
  hasLeftTrack(): boolean {
    return this.hasLeft;
  }

  /** 是否到達終點 */
  hasReachedEnd(): boolean {
    return this.hasLeft && this.t >= 1;
  }

  /** 取得切線方向（用於運動模糊） */
  getTangent(): Vector2D {
    return this.track.getTangentAt(this.t);
  }
}
