export const CONFIG = {
  GAME_WIDTH: 360,
  GAME_HEIGHT: 640,
  TILE_SIZE: 16,
  MAP_COLS: 50,
  MAP_ROWS: 50,
  VIEW_COLS: 23,  // số cột hiển thị trên màn hình dọc
  VIEW_ROWS: 40,

  PLAYER_SPEED: 1.2,
  ENEMY_SPEED: 0.8,

  BASE_PLAYER_HP: 100,
  BASE_PLAYER_MANA: 50,
  MANA_REGEN: 0.05,

  INVINCIBLE_DURATION: 30, // frames
  DASH_COOLDOWN: 40,
  DASH_SPEED: 3,
  DASH_DISTANCE: 2.5,
  DASH_INVINCIBLE: 10,

  SKILL_COOLDOWNS: { warrior: 120, mage: 90, rogue: 80 },

  SAVE_KEY: 'vucsau_save',
  SOUL_COIN_KEY: 'soul_coins',
};