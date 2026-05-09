export class BootScene {
  constructor(ctx, sprites, switchScene) {
    this.ctx = ctx;
    this.sprites = sprites;
    this.switchScene = switchScene;
    this.progress = 0;
    this.loaded = false;
    // Giả lập load assets
    setTimeout(() => { this.loaded = true; this.switchScene('menu'); }, 1000);
  }
  update() { if (!this.loaded) this.progress += 0.02; }
  render() {
    const ctx = this.ctx;
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0,0,360,640);
    ctx.fillStyle = '#fff';
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Đang tải...', 180, 300);
    ctx.fillStyle = '#6a0dad';
    ctx.fillRect(60, 320, 240 * Math.min(this.progress, 1), 10);
  }
  destroy() {}
}