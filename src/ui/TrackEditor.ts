import { CustomTrack } from '../tracks/CustomTrack';
import { Vector2D } from '../core/Vector2D';

/**
 * 軌道編輯器
 * 處理滑鼠事件，讓使用者透過點擊定義軌道
 */
export class TrackEditor {
  private track: CustomTrack;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private isActive: boolean = false;
  private isDragging: boolean = false;
  private dragPointIndex: number = -1;

  // 回呼
  private onChangeCallback: (() => void) | null = null;

  // 控制點樣式
  private readonly pointRadius = 8;
  private readonly pointColor = '#4dabf7';
  private readonly lineColor = 'rgba(77, 171, 247, 0.3)';

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.track = new CustomTrack();

    this.setupEvents();
  }

  /**
   * 設定滑鼠事件
   */
  private setupEvents(): void {
    this.canvas.addEventListener('click', this.handleClick);
    this.canvas.addEventListener('mousedown', this.handleMouseDown);
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.canvas.addEventListener('mouseup', this.handleMouseUp);
    this.canvas.addEventListener('contextmenu', this.handleRightClick);
  }

  /**
   * 點擊事件 - 新增控制點
   */
  private handleClick = (e: MouseEvent): void => {
    if (!this.isActive || this.isDragging) return;

    const point = this.getMousePosition(e);

    // 檢查是否點擊已存在的控制點
    const nearestIndex = this.track.findNearestPoint(point, this.pointRadius * 2);
    if (nearestIndex >= 0) return; // 點擊到已存在的點，不新增

    this.track.addPoint(point);
    this.onChangeCallback?.();
  };

  /**
   * 滑鼠按下 - 開始拖曳
   */
  private handleMouseDown = (e: MouseEvent): void => {
    if (!this.isActive) return;

    const point = this.getMousePosition(e);
    const nearestIndex = this.track.findNearestPoint(point, this.pointRadius * 2);

    if (nearestIndex >= 0) {
      this.isDragging = true;
      this.dragPointIndex = nearestIndex;
      this.canvas.style.cursor = 'grabbing';
    }
  };

  /**
   * 滑鼠移動 - 拖曳控制點
   */
  private handleMouseMove = (e: MouseEvent): void => {
    if (!this.isActive) return;

    const point = this.getMousePosition(e);

    if (this.isDragging && this.dragPointIndex >= 0) {
      this.track.movePoint(this.dragPointIndex, point);
      this.onChangeCallback?.();
    } else {
      // 更新游標樣式
      const nearestIndex = this.track.findNearestPoint(point, this.pointRadius * 2);
      this.canvas.style.cursor = nearestIndex >= 0 ? 'grab' : 'crosshair';
    }
  };

  /**
   * 滑鼠放開 - 結束拖曳
   */
  private handleMouseUp = (): void => {
    if (this.isDragging) {
      this.isDragging = false;
      this.dragPointIndex = -1;
      this.canvas.style.cursor = 'crosshair';
    }
  };

  /**
   * 右鍵 - 移除最後一個點
   */
  private handleRightClick = (e: MouseEvent): void => {
    if (!this.isActive) return;

    e.preventDefault();
    this.track.removeLastPoint();
    this.onChangeCallback?.();
  };

  /**
   * 取得滑鼠在 Canvas 上的位置
   */
  private getMousePosition(e: MouseEvent): Vector2D {
    const rect = this.canvas.getBoundingClientRect();
    return new Vector2D(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
  }

  /**
   * 啟動編輯器
   */
  activate(): void {
    this.isActive = true;
    this.canvas.style.cursor = 'crosshair';
  }

  /**
   * 停用編輯器
   */
  deactivate(): void {
    this.isActive = false;
    this.isDragging = false;
    this.dragPointIndex = -1;
    this.canvas.style.cursor = 'default';
  }

  /**
   * 繪製編輯器視覺化（控制點和連接線）
   */
  draw(): void {
    const points = this.track.getPoints();
    if (points.length === 0) return;

    // 繪製連接線（虛線）
    if (points.length > 1) {
      this.ctx.beginPath();
      this.ctx.setLineDash([5, 5]);
      this.ctx.strokeStyle = this.lineColor;
      this.ctx.lineWidth = 2;

      this.ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        this.ctx.lineTo(points[i].x, points[i].y);
      }
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    }

    // 繪製控制點
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const isFirst = i === 0;
      const isLast = i === points.length - 1;

      // 控制點外圈
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, this.pointRadius, 0, Math.PI * 2);
      this.ctx.fillStyle = isFirst ? '#22c55e' : (isLast ? '#ef4444' : this.pointColor);
      this.ctx.fill();

      // 控制點內圈（白色）
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, this.pointRadius - 3, 0, Math.PI * 2);
      this.ctx.fillStyle = '#fff';
      this.ctx.fill();

      // 標示起點和終點
      if (isFirst || isLast) {
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.font = 'bold 10px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(isFirst ? '起' : '終', p.x, p.y + 3);
      }
    }
  }

  /**
   * 繪製編輯提示
   */
  drawHint(): void {
    const pointCount = this.track.getPointCount();

    this.ctx.fillStyle = '#94a3b8';
    this.ctx.font = '14px sans-serif';
    this.ctx.textAlign = 'center';

    if (pointCount === 0) {
      this.ctx.fillText('點擊畫布新增起點', this.canvas.width / 2, 30);
    } else if (pointCount === 1) {
      this.ctx.fillText('繼續點擊新增控制點，右鍵移除', this.canvas.width / 2, 30);
    } else {
      this.ctx.fillText(`已新增 ${pointCount} 個控制點，右鍵移除最後一個`, this.canvas.width / 2, 30);
    }
  }

  /**
   * 取得自訂軌道
   */
  getTrack(): CustomTrack {
    return this.track;
  }

  /**
   * 軌道是否有效
   */
  isValid(): boolean {
    return this.track.isValid();
  }

  /**
   * 設定變更回呼
   */
  onChange(callback: () => void): void {
    this.onChangeCallback = callback;
  }

  /**
   * 重置編輯器
   */
  reset(): void {
    this.track.clear();
    this.isDragging = false;
    this.dragPointIndex = -1;
  }
}
