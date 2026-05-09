export class SaveManager {
  static hasSave() { return !!localStorage.getItem('roguelike_save'); }
  static saveGame(scene) {
    const data = {
      floor: scene.floor,
      playerX: scene.player.x, playerY: scene.player.y,
      playerHp: scene.player.hp, playerMana: scene.player.mana,
      mapData: scene.mapData,
      // ... lưu thêm nếu cần
    };
    localStorage.setItem('roguelike_save', JSON.stringify(data));
  }
  static loadGame() {
    const data = localStorage.getItem('roguelike_save');
    return data ? JSON.parse(data) : null;
  }
}