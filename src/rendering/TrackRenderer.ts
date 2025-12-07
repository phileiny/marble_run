import { Track, BezierSegment } from '../entities/Track';

/**
 * 軌道繪製器
 * 繪製金屬質感的軌道
 */
export class TrackRenderer {
  // 軌道寬度
  private readonly trackWidth = 8;

  // 軌道顏色
  private readonly trackColor = '#6b7280';
  private readonly trackHighlight = '#9ca3af';
  private readonly trackShadow = '#374151';

  constructor(private ctx: CanvasRenderingContext2D) {}

  /**
   * 繪製軌道
   */
  draw(track: Track): void {
    const segments = track.getSegments();

    // 先繪製陰影層
    this.drawTrackLayer(segments, this.trackWidth + 4, this.trackShadow, 2, 2);

    // 繪製主軌道
    this.drawTrackLayer(segments, this.trackWidth, this.trackColor, 0, 0);

    // 繪製高光
    this.drawTrackLayer(segments, this.trackWidth - 4, this.trackHighlight, -1, -1);
  }

  /**
   * 繪製單層軌道
   */
  private drawTrackLayer(
    segments: BezierSegment[],
    width: number,
    color: string,
    offsetX: number,
    offsetY: number
  ): void {
    this.ctx.save();
    this.ctx.translate(offsetX, offsetY);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    this.ctx.beginPath();

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];

      if (i === 0) {
        this.ctx.moveTo(seg.p0.x, seg.p0.y);
      }

      this.ctx.bezierCurveTo(
        seg.p1.x, seg.p1.y,
        seg.p2.x, seg.p2.y,
        seg.p3.x, seg.p3.y
      );
    }

    this.ctx.stroke();
    this.ctx.restore();
  }

  /**
   * 繪製軌道預覽（用於選擇畫面）
   */
  drawPreview(track: Track, x: number, y: number, scale: number): void {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.scale(scale, scale);

    const segments = track.getSegments();

    this.ctx.strokeStyle = this.trackColor;
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';

    this.ctx.beginPath();

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];

      if (i === 0) {
        this.ctx.moveTo(seg.p0.x, seg.p0.y);
      }

      this.ctx.bezierCurveTo(
        seg.p1.x, seg.p1.y,
        seg.p2.x, seg.p2.y,
        seg.p3.x, seg.p3.y
      );
    }

    this.ctx.stroke();
    this.ctx.restore();
  }
}
