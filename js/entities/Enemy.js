export class Enemy {
  constructor(x, y, type, sprites, map) {
    this.x = x; this.y = y;
    this.type = type;
    this.sprites = sprites;
    this.map = map;
    this.speed = 0.8;
    this.hp = 20; this.maxHp = 20;
    this.atk = 8;
    this.aggroRange = 150;
    this.attackCooldown = 0;
  }
  update(delta, player) {
    if (this.attackCooldown > 0) this.attackCooldown--;
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const dist = Math.hypot(dx, dy);
    if (dist < this.aggroRange && dist > 10) {
      this.x += (dx / dist) * this.speed * delta;
      this.y += (dy / dist) * this.speed * delta;
    }
    // Giới hạn map, va chạm tường đơn giản
  }
  takeDamage(dmg) { this.hp -= dmg; }
  render(ctx) {
    ctx.drawImage(this.sprites.get(this.type), this.x-8, this.y-8);
  }
}