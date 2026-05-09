export class GameOverScene {
  constructor(ctx, sprites, switchScene, data) {
    this.ctx = ctx; this.sprites = sprites; this.switchScene = switchScene;
    this.data = data;
    canvas.addEventListener('click', this.onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (360/rect.width);
      const my = (e.clientY - rect.top) * (640/rect.height);
      if (mx>80 && mx<280 && my>400 && my<450) {
        this.switchScene('menu');
      }
    });
  }
  update() {}
  render() {
    const ctx = this.ctx;
    ctx.fillStyle = '#0a0a0a'; ctx.fillRect(0,0,360,640);
    ctx.fillStyle = '#e74c3c'; ctx.font = '28px monospace'; ctx.textAlign='center';
    ctx.fillText('Ngươi đã ngã xuống...',180,200);
    ctx.fillStyle = '#fff'; ctx.font = '16px monospace';
    ctx.fillText(`Tầng: ${this.data.floor}`,180,280);
    ctx.fillText(`Vàng: ${this.data.gold}`,180,310);
    ctx.fillStyle = '#f1c40f'; ctx.fillRect(80,400,200,50);
    ctx.fillStyle = '#000'; ctx.fillText('Về Thành',180,432);
  }
  destroy() { canvas.removeEventListener('click', this.onClick); }
}