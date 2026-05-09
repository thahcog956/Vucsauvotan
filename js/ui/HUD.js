export class HUD {
  constructor(player) { this.player = player; }
  render(ctx) {
    const p = this.player;
    // Thanh máu
    ctx.fillStyle = '#e74c3c'; ctx.fillRect(10,10,100,12);
    ctx.fillStyle = '#2ecc71'; ctx.fillRect(10,10,100*(p.hp/p.maxHp),12);
    // Mana
    ctx.fillStyle = '#3498db'; ctx.fillRect(10,26,80,8);
    ctx.fillStyle = '#f1c40f'; ctx.fillRect(10,26,80*(p.mana/p.maxMana),8);
    // Text
    ctx.fillStyle = '#fff'; ctx.font = '10px monospace'; ctx.textAlign='left';
    ctx.fillText(`Tầng: ?`, 120, 20);
  }
}