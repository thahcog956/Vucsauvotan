import { SaveManager } from '../systems/SaveManager.js';
export class MenuScene {
  constructor(ctx, sprites, switchScene) {
    this.ctx = ctx; this.sprites = sprites; this.switchScene = switchScene;
    this.hasSave = SaveManager.hasSave();
    this.buttons = [
      { text: 'Chơi Mới', x: 90, y: 300, w: 180, h: 50, action: ()=>this.switchScene('characterSelect') },
      { text: 'Nâng Cấp Vĩnh Viễn', x: 70, y: 370, w: 220, h: 50, action: ()=>alert('Tính năng sẽ có sau!') },
    ];
    if (this.hasSave) this.buttons.splice(1,0,{ text: 'Tiếp Tục', x:90,y:300,w:180,h:50, action:()=>{
      const data = SaveManager.loadGame();
      if(data) this.switchScene('gameplay', {loadData: data});
    }});

    canvas.addEventListener('click', this.onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = 360 / rect.width;
      const scaleY = 640 / rect.height;
      const mx = (e.clientX - rect.left) * scaleX;
      const my = (e.clientY - rect.top) * scaleY;
      for (let b of this.buttons) {
        if (mx>b.x && mx<b.x+b.w && my>b.y && my<b.y+b.h) b.action();
      }
    });
  }
  update() {}
  render() {
    const ctx = this.ctx;
    ctx.fillStyle = '#111'; ctx.fillRect(0,0,360,640);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 28px monospace'; ctx.textAlign='center';
    ctx.fillText('Vực Sâu Vô Tận',180,200);
    for (let b of this.buttons) {
      ctx.fillStyle = '#6a0dad'; ctx.fillRect(b.x,b.y,b.w,b.h);
      ctx.fillStyle = '#fff'; ctx.font = '14px monospace'; ctx.fillText(b.text, b.x+b.w/2, b.y+32);
    }
  }
  destroy() { canvas.removeEventListener('click', this.onClick); }
}