export class ProgressionSystem {
  static addSoulCoins(amount) {
    let current = parseInt(localStorage.getItem('soul_coins') || '0');
    localStorage.setItem('soul_coins', current + amount);
  }
  static getSoulCoins() {
    return parseInt(localStorage.getItem('soul_coins') || '0');
  }
}