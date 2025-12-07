import { Vector2D } from '../core/Vector2D';
import { Track } from '../entities/Track';

/**
 * 經典斜坡軌道
 * S 型下坡設計
 */
export class ClassicSlope extends Track {
  readonly name = '經典斜坡';
  readonly description = 'S 型平緩下坡';

  constructor() {
    super();
    this.buildTrack();
  }

  private buildTrack(): void {
    // Canvas 尺寸 800x500
    // 設計一條從左上到左下的 S 型軌道

    // 段落 1：起始下坡（左上往右下，有明顯傾斜）
    this.segments.push({
      p0: new Vector2D(80, 50),
      p1: new Vector2D(150, 100),
      p2: new Vector2D(280, 140),
      p3: new Vector2D(380, 160)
    });

    // 段落 2：平緩轉向（往右繼續下降）
    this.segments.push({
      p0: new Vector2D(380, 160),
      p1: new Vector2D(480, 180),
      p2: new Vector2D(580, 220),
      p3: new Vector2D(620, 280)
    });

    // 段落 3：S 型轉彎（往左下）
    this.segments.push({
      p0: new Vector2D(620, 280),
      p1: new Vector2D(660, 340),
      p2: new Vector2D(600, 390),
      p3: new Vector2D(500, 410)
    });

    // 段落 4：緩坡滑入回收盒（往左）
    this.segments.push({
      p0: new Vector2D(500, 410),
      p1: new Vector2D(400, 430),
      p2: new Vector2D(280, 445),
      p3: new Vector2D(180, 450)
    });
  }
}
