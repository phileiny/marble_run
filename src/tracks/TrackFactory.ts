import { Track } from '../entities/Track';
import { TrackType } from '../core/GameState';
import { ClassicSlope } from './ClassicSlope';
import { SingleLoop } from './SingleLoop';
import { DoubleLoop } from './DoubleLoop';
import { Vector2D } from '../core/Vector2D';
import { CollectionBox } from '../entities/CollectionBox';

/**
 * 軌道工廠
 * 建立預設軌道和對應的回收盒
 */
export class TrackFactory {
  /**
   * 根據類型建立軌道
   */
  static createTrack(type: TrackType): Track {
    switch (type) {
      case 'classic-slope':
        return new ClassicSlope();
      case 'single-loop':
        return new SingleLoop();
      case 'double-loop':
        return new DoubleLoop();
      default:
        throw new Error(`Unknown track type: ${type}`);
    }
  }

  /**
   * 根據軌道建立對應的回收盒
   */
  static createCollectionBox(track: Track): CollectionBox {
    const endPos = track.getEndPosition();
    // 回收盒位於軌道終點下方
    return new CollectionBox(
      new Vector2D(endPos.x, endPos.y + 30),
      60,
      40
    );
  }

  /**
   * 取得所有可用的軌道類型
   */
  static getAvailableTypes(): TrackType[] {
    return ['classic-slope', 'single-loop', 'double-loop'];
  }

  /**
   * 取得軌道資訊
   */
  static getTrackInfo(type: TrackType): { name: string; description: string } {
    const track = this.createTrack(type);
    return {
      name: track.name,
      description: track.description
    };
  }
}
