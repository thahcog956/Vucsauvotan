export class UpgradeScene {
  constructor(ctx, sprites, switchScene, data) {
    this.ctx = ctx; this.sprites = sprites; this.switchScene = switchScene;
    this.player = data.player;
    this.options = [
      { text: 'Tăng ATK +5', effect: ()=> this.player.atk += 5 },
      { text: 'Tăng HP +20', effect: ()=> this.player.maxHp += 20; this.player.hp += 20 },
      { text: 'Tăng SPD +1', effect: ()=> this.player.speed += 1 }
    ];
    canvas.addEventListener('click', this.onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (360/rect.width);
      const my = (e.clientY - rect.top) * (640/rect.height);
      for (let i=0;i<3;i++) {
        let y = 200 + i*100;
        if (mx>50 && mx<310 && my>y && my<y+80) {
          this.options[i].effect();
          this.switchScene('gameplay', { continue: true, player: this.player });
        }
      }
    });
  }
  update() {}
  render() {
    const ctx = this.ctx;
    ctx.fillStyle = '#111'; ctx.fillRect(0,0,360,640);
    ctx.fillStyle = '#fff'; ctx.font = '20px monospace'; ctx.textAlign='center';
    ctx.fillText('Chọn Nâng Cấp',180,100);
    for (let i=0;i<3;i++) {
      let y = 200+i*100;
      ctx.fillStyle = '#6a0dad'; ctx.fillRect(50,y,260,80);
      ctx.fillStyle = '#fff'; ctx.font = '14px monospace';
      ctx.fillText(this.options[i].text, 180, y+45);
    }
  }
  destroy() { canvas.removeEventListener('click', this.onClick); }
}