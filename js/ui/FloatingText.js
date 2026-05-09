export class FloatingText {
  constructor() { this.messages = []; }
  add(x,y,text,color) { this.messages.push({x,y,text,color,life:30}); }
  update() { for (let m of this.messages) m.life--; this.messages = this.messages.filter(m=>m.life>0); }
  render(ctx) {
    for (let m of this.messages) {
      ctx.fillStyle = m.color; ctx.font = '10px monospace';
      ctx.fillText(m.text, m.x, m.y - (30-m.life)*0.5);
    }
  }
}