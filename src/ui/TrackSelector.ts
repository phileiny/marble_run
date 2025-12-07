import { TrackType } from '../core/GameState';
import { TrackFactory } from '../tracks/TrackFactory';

/**
 * 軌道選擇器 UI
 */
export class TrackSelector {
  private container: HTMLElement;
  private selectedTrack: TrackType | null = null;
  private onSelectCallback: ((track: TrackType) => void) | null = null;
  private onCustomCallback: (() => void) | null = null;

  constructor() {
    this.container = document.getElementById('track-options')!;
    this.render();
  }

  /**
   * 渲染軌道選項
   */
  private render(): void {
    const types = TrackFactory.getAvailableTypes();

    this.container.innerHTML = '';

    // 預設軌道選項
    types.forEach(type => {
      const info = TrackFactory.getTrackInfo(type);
      const option = this.createOption(type, info.name, info.description);
      this.container.appendChild(option);
    });

    // 自訂軌道選項
    const customOption = this.createCustomOption();
    this.container.appendChild(customOption);
  }

  /**
   * 建立單個選項元素
   */
  private createOption(type: TrackType, name: string, _description: string): HTMLElement {
    const option = document.createElement('div');
    option.className = 'track-option';
    option.dataset.track = type;

    // 軌道圖示（簡化版）
    const icon = document.createElement('div');
    icon.className = 'track-icon';
    icon.innerHTML = this.getTrackIcon(type);

    // 軌道名稱
    const label = document.createElement('span');
    label.textContent = name;

    option.appendChild(icon);
    option.appendChild(label);

    // 點擊事件
    option.addEventListener('click', () => {
      this.select(type);
    });

    return option;
  }

  /**
   * 建立自訂軌道選項
   */
  private createCustomOption(): HTMLElement {
    const option = document.createElement('div');
    option.className = 'track-option custom-option';
    option.dataset.track = 'custom';

    // 圖示
    const icon = document.createElement('div');
    icon.className = 'track-icon';
    icon.innerHTML = `<svg width="40" height="30" viewBox="0 0 40 30">
      <path d="M10 25 L15 10 L25 20 L35 5" stroke="#9ca3af" stroke-width="2" fill="none" stroke-dasharray="3,2"/>
      <circle cx="10" cy="25" r="3" fill="#22c55e"/>
      <circle cx="15" cy="10" r="2" fill="#4dabf7"/>
      <circle cx="25" cy="20" r="2" fill="#4dabf7"/>
      <circle cx="35" cy="5" r="3" fill="#ef4444"/>
    </svg>`;

    // 名稱
    const label = document.createElement('span');
    label.textContent = '自訂軌道';

    option.appendChild(icon);
    option.appendChild(label);

    // 點擊事件
    option.addEventListener('click', () => {
      this.selectCustom();
    });

    return option;
  }

  /**
   * 取得軌道圖示 SVG
   */
  private getTrackIcon(type: TrackType): string {
    switch (type) {
      case 'classic-slope':
        return `<svg width="40" height="30" viewBox="0 0 40 30">
          <path d="M5 5 Q15 5 20 15 Q25 25 35 25" stroke="#9ca3af" stroke-width="2" fill="none"/>
        </svg>`;
      case 'single-loop':
        return `<svg width="40" height="30" viewBox="0 0 40 30">
          <path d="M5 5 L15 20 Q20 25 25 20 Q30 10 25 5 Q20 0 15 5 Q10 10 15 20 L35 25" stroke="#9ca3af" stroke-width="2" fill="none"/>
        </svg>`;
      case 'double-loop':
        return `<svg width="40" height="30" viewBox="0 0 40 30">
          <path d="M2 2 L8 15 Q10 20 14 15 Q18 5 14 2 Q10 0 8 5 L12 18 Q14 22 18 18 Q22 10 18 7 Q14 5 12 10 L35 25" stroke="#9ca3af" stroke-width="2" fill="none"/>
        </svg>`;
      default:
        return '';
    }
  }

  /**
   * 選擇預設軌道
   */
  select(type: TrackType): void {
    // 移除先前的選擇
    const options = this.container.querySelectorAll('.track-option');
    options.forEach(opt => opt.classList.remove('selected'));

    // 設定新選擇
    const selected = this.container.querySelector(`[data-track="${type}"]`);
    selected?.classList.add('selected');

    this.selectedTrack = type;
    this.onSelectCallback?.(type);
  }

  /**
   * 選擇自訂軌道
   */
  selectCustom(): void {
    // 移除先前的選擇
    const options = this.container.querySelectorAll('.track-option');
    options.forEach(opt => opt.classList.remove('selected'));

    // 設定自訂選項為選中
    const customOption = this.container.querySelector('[data-track="custom"]');
    customOption?.classList.add('selected');

    this.selectedTrack = 'custom';
    this.onCustomCallback?.();
  }

  /**
   * 取得已選擇的軌道
   */
  getSelected(): TrackType | null {
    return this.selectedTrack;
  }

  /**
   * 設定選擇回呼（預設軌道）
   */
  onSelect(callback: (track: TrackType) => void): void {
    this.onSelectCallback = callback;
  }

  /**
   * 設定自訂軌道回呼
   */
  onCustomSelect(callback: () => void): void {
    this.onCustomCallback = callback;
  }

  /**
   * 重置選擇
   */
  reset(): void {
    this.selectedTrack = null;
    const options = this.container.querySelectorAll('.track-option');
    options.forEach(opt => opt.classList.remove('selected'));
  }

  /**
   * 顯示選擇器
   */
  show(): void {
    const selector = document.getElementById('track-selector');
    if (selector) selector.style.display = 'block';
  }

  /**
   * 隱藏選擇器
   */
  hide(): void {
    const selector = document.getElementById('track-selector');
    if (selector) selector.style.display = 'none';
  }
}
