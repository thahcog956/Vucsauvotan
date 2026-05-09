import { DungeonGenerator } from '../systems/DungeonGenerator.js';
import { Player } from '../entities/Player.js';
import { Enemy } from '../entities/Enemy.js';
import { Boss } from '../entities/Boss.js';
import { CombatSystem } from '../systems/CombatSystem.js';
import { LootSystem } from '../systems/LootSystem.js';
import { SaveManager } from '../systems/SaveManager.js';
import { ProgressionSystem } from '../systems/ProgressionSystem.js';
import { HUD } from '../ui/HUD.js';
import { Controls } from '../ui/Controls.js';
import { FloatingText } from '../ui/FloatingText.js';
import { Minimap } from '../ui/Minimap.js';
import { CONFIG } from '../config.js';

export class GameplayScene {
  constructor(ctx, sprites, switchScene, data) {
    this.ctx = ctx; this.sprites = sprites; this.switchScene = switchScene;
    this.floor = 1;
    this.player = null;
    this.enemies = [];
    this.boss = null;
    this.mapData = null; // 2D array
    this.cameraX = 0; this.cameraY = 0;
    this.gameOver = false;
    this.paused = false;

    // Khởi tạo player
    const classId = data.classId || 'warrior';
    const baseStats = { warrior:{hp:120,atk:15,spd:2,def:10}, mage:{hp:70,atk:25,spd:4,def:3}, rogue:{hp:90,atk:18,spd:6,def:6} };
    this.player = new Player(0,0, classId, baseStats[classId], this.sprites);
    // Nếu load game
    if (data.loadData) {
      this.loadGameState(data.loadData);
    } else {
      this.generateNewFloor();
    }
    this.combat = new CombatSystem();
    this.loot = new LootSystem();
    this.floatingText = new FloatingText();
    this.hud = new HUD(this.player);
    this.controls = new Controls(this.player);
    this.minimap = new Minimap();

    // Event listeners di chuyển bằng joystick (Controls đã gắn listener, nhưng ta cần update vị trí player)
    this.lastTime = Date.now();
    this.loop = this.gameLoop.bind(this);
    requestAnimationFrame(this.loop);
  }

  generateNewFloor() {
    const gen = new DungeonGenerator(CONFIG.MAP_COLS, CONFIG.MAP_ROWS, this.floor);
    this.mapData = gen.generate();
    // Đặt player ở vị trí phòng đầu
    const startRoom = gen.rooms[0];
    this.player.x = (startRoom.x + startRoom.w/2) * CONFIG.TILE_SIZE;
    this.player.y = (startRoom.y + startRoom.h/2) * CONFIG.TILE_SIZE;
    this.player.mapData = this.mapData;
    // Sinh quái
    this.enemies = [];
    for (let i=1; i<gen.rooms.length; i++) {
      const room = gen.rooms[i];
      let count = Math.floor(Math.random()*3)+2;
      for (let j=0; j<count; j++) {
        let ex = (room.x + 1 + Math.random()*(room.w-2)) * CONFIG.TILE_SIZE;
        let ey = (room.y + 1 + Math.random()*(room.h-2)) * CONFIG.TILE_SIZE;
        let type = ['rat','zombie','shadow_mage'][Math.floor(Math.random()*3)];
        this.enemies.push(new Enemy(ex, ey, type, this.sprites, this.mapData));
      }
    }
    // Boss mỗi 5 tầng
    if (this.floor % 5 === 0) {
      const lastRoom = gen.rooms[gen.rooms.length-1];
      this.boss = new Boss(lastRoom.x+lastRoom.w/2*TILE_SIZE, lastRoom.y+lastRoom.h/2*TILE_SIZE, 'boss', this.sprites, this.mapData);
    } else {
      this.boss = null;
    }
    SaveManager.saveGame(this);
  }

  gameLoop() {
    if (this.gameOver || this.paused) { requestAnimationFrame(this.loop); return; }
    const now = Date.now();
    const delta = (now - this.lastTime) / 16.67; // chuẩn hóa 60fps
    this.lastTime = now;
    this.update(delta);
    this.render();
    requestAnimationFrame(this.loop);
  }

  update(delta) {
    this.controls.update(); // cập nhật input từ joystick, nút skill
    this.player.update(delta, this.mapData, this.enemies, this.boss);
    for (let enemy of this.enemies) enemy.update(delta, this.player);
    if (this.boss) this.boss.update(delta, this.player);
    // Combat
    this.combat.handleCollisions(this.player, this.enemies, this.boss, this.floatingText);
    // Kiểm tra cầu thang
    if (this.player.atStairs) {
      this.floor++;
      this.player.atStairs = false;
      this.generateNewFloor();
    }
    // Kiểm tra chết
    if (this.player.hp <= 0) {
      this.gameOver = true;
      const coins = Math.floor(this.loot.totalGold / 10);
      ProgressionSystem.addSoulCoins(coins);
      this.switchScene('gameover', { floor: this.floor, gold: this.loot.totalGold });
    }
  }

  render() {
    const ctx = this.ctx;
    // Camera theo player
    const centerX = this.player.x - CONFIG.GAME_WIDTH/2;
    const centerY = this.player.y - CONFIG.GAME_HEIGHT/2;
    this.cameraX = Math.max(0, Math.min(centerX, CONFIG.MAP_COLS*TILE_SIZE - CONFIG.GAME_WIDTH));
    this.cameraY = Math.max(0, Math.min(centerY, CONFIG.MAP_ROWS*TILE_SIZE - CONFIG.GAME_HEIGHT));

    ctx.save();
    ctx.translate(-this.cameraX, -this.cameraY);
    // Vẽ map
    for (let row=0; row<CONFIG.MAP_ROWS; row++) {
      for (let col=0; col<CONFIG.MAP_COLS; col++) {
        const tile = this.mapData[row][col];
        let spriteKey = 'floor';
        if (tile === 1) spriteKey = 'wall';
        else if (tile === 2) spriteKey = 'stairs';
        if (tile !== 0) {
          ctx.drawImage(this.sprites.get(spriteKey), col*TILE_SIZE, row*TILE_SIZE);
        }
      }
    }
    // Vẽ quái
    for (let e of this.enemies) e.render(ctx);
    if (this.boss) this.boss.render(ctx);
    // Vẽ player
    this.player.render(ctx);
    // Vẽ floating text
    this.floatingText.render(ctx);
    ctx.restore();

    // UI overlay
    this.hud.render(ctx);
    this.controls.render(ctx); // vẽ joystick + skill buttons
    this.minimap.render(ctx, this.player, CONFIG.MAP_COLS, CONFIG.MAP_ROWS, TILE_SIZE);
  }

  loadGameState(data) {
    // Khôi phục từ save (đơn giản)
    this.floor = data.floor;
    this.mapData = data.mapData;
    this.player.x = data.playerX; this.player.y = data.playerY;
    this.player.hp = data.playerHp; this.player.mana = data.playerMana;
    // ... có thể khôi phục thêm
  }

  destroy() {
    this.controls.destroy();
  }
}