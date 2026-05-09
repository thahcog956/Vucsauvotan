export class Boss {
  constructor(x, y, type, sprites, map) {
    this.x = x; this.y = y;
    this.type = type;
    this.sprites = sprites;
    this.map = map;
    this.hp = 150; this.maxHp = 150;
    this.atk = 20;
    this.speed = 0.6;
    this.phase = 1;
  }
  update(delta, player) {
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 10) {
      this.x += (dx/dist) * this.speed * delta;
      this.y += (dy/dist) * this.speed * delta;
    }
    if (this.hp < this.maxHp/2) this.phase = 2;
  }
  takeDamage(dmg) { this.hp -= dmg; }
  render(ctx) {
    ctx.drawImage(this.sprites.get('boss'), this.x-12, this.y-12);
  }
}