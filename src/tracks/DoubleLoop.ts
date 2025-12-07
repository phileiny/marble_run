import { Vector2D } from '../core/Vector2D';
import { Track } from '../entities/Track';

/**
 * 雙重迴圈軌道
 * 連續兩個大小不同的環形
 */
export class DoubleLoop extends Track {
  readonly name = '雙重迴圈';
  readonly description = '連續兩個大小不同的環形';

  constructor() {
    super();
    this.buildTrack();
  }

  private buildTrack(): void {
    // Canvas 尺寸 800x500
    // 需要更高的起點來通過兩個迴圈

    const k = 0.552284749831; // 貝茲曲線近似圓的常數

    // 段落 1：非常陡的起始下坡
    this.segments.push({
      p0: new Vector2D(30, 30),
      p1: new Vector2D(60, 100),
      p2: new Vector2D(90, 180),
      p3: new Vector2D(120, 260)
    });

    // 段落 2：平緩過渡區
    this.segments.push({
      p0: new Vector2D(120, 260),
      p1: new Vector2D(150, 320),
      p2: new Vector2D(180, 350),
      p3: new Vector2D(220, 360)
    });

    // 第一個迴圈：中心 (300, 290)，半徑 60
    const cx1 = 300, cy1 = 290, r1 = 60;

    // 段落 3：進入第一個迴圈
    this.segments.push({
      p0: new Vector2D(220, 360),
      p1: new Vector2D(240, 360),
      p2: new Vector2D(cx1 - r1, cy1 + r1 * 0.5),
      p3: new Vector2D(cx1 - r1, cy1)
    });

    // 段落 4：第一迴圈左到頂
    this.segments.push({
      p0: new Vector2D(cx1 - r1, cy1),
      p1: new Vector2D(cx1 - r1, cy1 - r1 * k),
      p2: new Vector2D(cx1 - r1 * k, cy1 - r1),
      p3: new Vector2D(cx1, cy1 - r1)
    });

    // 段落 5：第一迴圈頂到右
    this.segments.push({
      p0: new Vector2D(cx1, cy1 - r1),
      p1: new Vector2D(cx1 + r1 * k, cy1 - r1),
      p2: new Vector2D(cx1 + r1, cy1 - r1 * k),
      p3: new Vector2D(cx1 + r1, cy1)
    });

    // 段落 6：第一迴圈右到底
    this.segments.push({
      p0: new Vector2D(cx1 + r1, cy1),
      p1: new Vector2D(cx1 + r1, cy1 + r1 * k),
      p2: new Vector2D(cx1 + r1 * k, cy1 + r1),
      p3: new Vector2D(cx1, cy1 + r1)
    });

    // 第二個迴圈：中心 (500, 310)，半徑 50
    const cx2 = 500, cy2 = 310, r2 = 50;

    // 段落 7：連接兩個迴圈
    this.segments.push({
      p0: new Vector2D(cx1, cy1 + r1),
      p1: new Vector2D(cx1 + 40, cy1 + r1 + 20),
      p2: new Vector2D(cx2 - r2 - 20, cy2 + 10),
      p3: new Vector2D(cx2 - r2, cy2)
    });

    // 段落 8：第二迴圈左到頂
    this.segments.push({
      p0: new Vector2D(cx2 - r2, cy2),
      p1: new Vector2D(cx2 - r2, cy2 - r2 * k),
      p2: new Vector2D(cx2 - r2 * k, cy2 - r2),
      p3: new Vector2D(cx2, cy2 - r2)
    });

    // 段落 9：第二迴圈頂到右
    this.segments.push({
      p0: new Vector2D(cx2, cy2 - r2),
      p1: new Vector2D(cx2 + r2 * k, cy2 - r2),
      p2: new Vector2D(cx2 + r2, cy2 - r2 * k),
      p3: new Vector2D(cx2 + r2, cy2)
    });

    // 段落 10：第二迴圈右到底
    this.segments.push({
      p0: new Vector2D(cx2 + r2, cy2),
      p1: new Vector2D(cx2 + r2, cy2 + r2 * k),
      p2: new Vector2D(cx2 + r2 * k, cy2 + r2),
      p3: new Vector2D(cx2, cy2 + r2)
    });

    // 段落 11：離開迴圈，滑向回收盒
    this.segments.push({
      p0: new Vector2D(cx2, cy2 + r2),
      p1: new Vector2D(cx2 + 50, cy2 + r2 + 30),
      p2: new Vector2D(650, 430),
      p3: new Vector2D(740, 450)
    });
  }
}
