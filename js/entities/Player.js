import { CONFIG } from '../config.js';
export class Player {
  constructor(x, y, classId, stats, sprites) {
    this.x = x; this.y = y;
    this.classId = classId;
    this.speed = stats.spd;
    this.hp = stats.hp; this.maxHp = stats.hp;
    this.mana = 50; this.maxMana = 50;
    this.atk = stats.atk;
    this.def = stats.def;
    this.sprites = sprites;
    this.direction = 0; // radian
    this.vx = 0; this.vy = 0;
    this.attackCooldown = 0;
    this.dashCooldown = 0;
    this.isDashing = false;
    this.invincible = 0;
    this.atStairs = false;
    this.mapData = null;
    // Skill specific
    this.skillCooldown = 0;
  }

  update(delta, map, enemies, boss) {
    if (this.invincible > 0) this.invincible--;
    if (this.attackCooldown > 0) this.attackCooldown--;
    if (this.dashCooldown > 0) this.dashCooldown--;
    if (this.skillCooldown > 0) this.skillCooldown--;
    // Movement (được set bởi Controls)
    if (this.isDashing) {
      this.x += this.vx * CONFIG.DASH_SPEED * delta;
      this.y += this.vy * CONFIG.DASH_SPEED * delta;
      this.dashTimer--;
      if (this.dashTimer <= 0) { this.isDashing=false; this.vx=0; this.vy=0; }
    } else {
      this.x += this.vx * this.speed * delta;
      this.y += this.vy * this.speed * delta;
    }
    // Giới hạn map
    this.x = Math.max(8, Math.min(this.x, CONFIG.MAP_COLS*16-8));
    this.y = Math.max(8, Math.min(this.y, CONFIG.MAP_ROWS*16-8));
    // Kiểm tra va chạm tường (đơn giản)
    let tileX = Math.floor(this.x / 16);
    let tileY = Math.floor(this.y / 16);
    if (map[tileY] && map[tileY][tileX] === 1) { // wall
      this.x -= this.vx * this.speed * delta;
      this.y -= this.vy * this.speed * delta;
    }
    // Cầu thang
    if (map[tileY] && map[tileY][tileX] === 2 && !this.atStairs) {
      this.atStairs = true;
    }
    // Mana regen
    this.mana = Math.min(this.maxMana, this.mana + CONFIG.MANA_REGEN * delta);
  }

  takeDamage(dmg) {
    if (this.invincible > 0) return;
    this.hp -= dmg;
    this.invincible = CONFIG.INVINCIBLE_DURATION;
  }

  dash() {
    if (this.dashCooldown > 0 || this.isDashing) return;
    this.isDashing = true;
    this.dashTimer = 10;
    this.dashCooldown = CONFIG.DASH_COOLDOWN;
    this.invincible = CONFIG.DASH_INVINCIBLE;
  }

  useSkill() {
    if (this.skillCooldown > 0 || this.mana < 15) return false;
    this.mana -= 15;
    this.skillCooldown = CONFIG.SKILL_COOLDOWNS[this.classId] || 100;
    return true; // hiệu ứng xử lý ở combat
  }

  render(ctx) {
    ctx.drawImage(this.sprites.get(this.classId), this.x-8, this.y-8);
    if (this.invincible > 0 && Math.floor(Date.now()/100)%2) return; // nhấp nháy
  }
}