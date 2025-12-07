import { Vector2D } from './Vector2D';

/**
 * 物理引擎
 * 處理重力、摩擦力、軌道約束
 */
export class Physics {
  // 重力加速度 (像素/秒²)
  readonly gravity = 980;

  // 摩擦係數
  readonly friction = 0.995;

  // 最小速度閾值
  readonly minSpeed = 5;

  /**
   * 計算沿軌道切線方向的重力分量
   * @param tangent 軌道切線方向（單位向量）
   * @returns 重力在切線方向的加速度
   */
  getGravityAlongTangent(tangent: Vector2D): number {
    // 重力向量 (0, gravity)，往下為正
    // 投影到切線方向：gravity * sin(angle) = gravity * tangent.y
    return this.gravity * tangent.y;
  }

  /**
   * 計算向心加速度
   * @param speed 當前速度
   * @param curvature 曲率 (1/radius)
   * @returns 向心加速度
   */
  getCentripetalAcceleration(speed: number, curvature: number): number {
    // a = v² / r = v² * curvature
    return speed * speed * curvature;
  }

  /**
   * 檢查是否能通過迴圈（向心力是否足夠）
   * @param speed 當前速度
   * @param curvature 曲率
   * @param tangent 切線方向
   * @returns 是否能維持在軌道上
   */
  canStayOnTrack(_speed: number, _curvature: number, _tangent: Vector2D): boolean {
    // 簡化版本：彈珠永遠維持在軌道上
    // 未來可加入更複雜的迴圈物理檢查
    return true;
  }

  /**
   * 套用摩擦力
   * @param speed 當前速度
   * @returns 摩擦後的速度
   */
  applyFriction(speed: number): number {
    return speed * this.friction;
  }

  /**
   * 檢查是否停止
   */
  isStopped(speed: number): boolean {
    return Math.abs(speed) < this.minSpeed;
  }
}
