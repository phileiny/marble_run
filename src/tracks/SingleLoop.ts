import { Vector2D } from '../core/Vector2D';
import { Track } from '../entities/Track';

/**
 * 單環迴圈軌道
 * 包含一個 360° 環形
 */
export class SingleLoop extends Track {
  readonly name = '單環迴圈';
  readonly description = '包含一個 360° 環形';

  constructor() {
    super();
    this.buildTrack();
  }

  private buildTrack(): void {
    // Canvas 尺寸 800x500
    // 需要足夠高的起點來產生通過迴圈的速度

    // 段落 1：陡峭起始下坡
    this.segments.push({
      p0: new Vector2D(50, 40),
      p1: new Vector2D(100, 100),
      p2: new Vector2D(150, 180),
      p3: new Vector2D(200, 260)
    });

    // 段落 2：進入迴圈前的平緩區
    this.segments.push({
      p0: new Vector2D(200, 260),
      p1: new Vector2D(240, 320),
      p2: new Vector2D(290, 360),
      p3: new Vector2D(350, 370)
    });

    // 迴圈：中心 (450, 300)，半徑 70
    // 使用 4 段貝茲曲線近似圓形
    const cx = 450, cy = 300, r = 70;
    const k = 0.552284749831; // 貝茲曲線近似圓的常數

    // 段落 3：進入迴圈底部（從左進入）
    this.segments.push({
      p0: new Vector2D(350, 370),
      p1: new Vector2D(380, 370),
      p2: new Vector2D(cx - r, cy + r * 0.5),
      p3: new Vector2D(cx - r, cy)
    });

    // 段落 4：迴圈左側到頂部
    this.segments.push({
      p0: new Vector2D(cx - r, cy),
      p1: new Vector2D(cx - r, cy - r * k),
      p2: new Vector2D(cx - r * k, cy - r),
      p3: new Vector2D(cx, cy - r)
    });

    // 段落 5：迴圈頂部到右側
    this.segments.push({
      p0: new Vector2D(cx, cy - r),
      p1: new Vector2D(cx + r * k, cy - r),
      p2: new Vector2D(cx + r, cy - r * k),
      p3: new Vector2D(cx + r, cy)
    });

    // 段落 6：迴圈右側到底部
    this.segments.push({
      p0: new Vector2D(cx + r, cy),
      p1: new Vector2D(cx + r, cy + r * k),
      p2: new Vector2D(cx + r * k, cy + r),
      p3: new Vector2D(cx, cy + r)
    });

    // 段落 7：離開迴圈，滑向回收盒
    this.segments.push({
      p0: new Vector2D(cx, cy + r),
      p1: new Vector2D(cx + 60, cy + r + 30),
      p2: new Vector2D(620, 430),
      p3: new Vector2D(720, 450)
    });
  }
}
