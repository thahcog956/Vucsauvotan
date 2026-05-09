export class CharacterSelectScene {
  constructor(ctx, sprites, switchScene) {
    this.ctx = ctx; this.sprites = sprites; this.switchScene = switchScene;
    this.classes = [
      { id:'warrior', name:'Chiến Binh Bóng Đêm', hp:120, atk:15, spd:2, def:10, skill:'Xoáy Kiếm Đen', desc:'Cân bằng, AOE nhỏ' },
      { id:'mage', name:'Pháp Sư Ánh Sương', hp:70, atk:25, spd:4, def:3, skill:'Mưa Sao Băng', desc:'Đánh xa, né nhanh' },
      { id:'rogue', name:'Thích Khách Hư Vô', hp:90, atk:18, spd:6, def:6, skill:'Phân Thân', desc:'Crit cao, tạo mồi' }
    ];
    this.selected = 0;
    canvas.addEventListener('click', this.onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (360/rect.width);
      const my = (e.clientY - rect.top) * (640/rect.height);
      if (mx>130 && mx<230 && my>550 && my<590) {
        this.switchScene('gameplay', {classId: this.classes[this.selected].id});
      }
      // Chọn class (3 card)
      for (let i=0;i<3;i++) {
        let x = 30 + i*105;
        if (mx>x && mx<x+95 && my>150 && my<350) this.selected = i;
      }
    });
  }
  update() {}
  render() {
    const ctx = this.ctx;
    ctx.fillStyle = '#111'; ctx.fillRect(0,0,360,640);
    ctx.fillStyle = '#fff'; ctx.font = '20px monospace'; ctx.textAlign='center';
    ctx.fillText('Chọn Nhân Vật',180,80);
    for (let i=0;i<3;i++) {
      let c = this.classes[i];
      let x = 30 + i*105;
      ctx.fillStyle = i===this.selected ? '#6a0dad' : '#333';
      ctx.fillRect(x,150,95,200);
      ctx.drawImage(this.sprites.get(c.id), x+40, 160, 16,16);
      ctx.fillStyle = '#fff'; ctx.font = '10px monospace';
      ctx.fillText(c.name, x+47, 200);
      ctx.fillText(`HP:${c.hp} ATK:${c.atk}`, x+47,215);
      ctx.fillText(`SPD:${c.spd} DEF:${c.def}`, x+47,230);
    }
    ctx.fillStyle = '#f39c12'; ctx.fillRect(130,550,100,40);
    ctx.fillStyle = '#000'; ctx.font = '14px monospace'; ctx.fillText('Bắt Đầu',180,576);
  }
  destroy() { canvas.removeEventListener('click', this.onClick); }
}