export class CombatSystem {
  handleCollisions(player, enemies, boss, floatingText) {
    const all = [...enemies];
    if (boss) all.push(boss);
    for (let e of all) {
      const dx = player.x - e.x, dy = player.y - e.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 14 && e.attackCooldown <= 0) {
        player.takeDamage(e.atk);
        floatingText.add(player.x, player.y-10, `-${e.atk}`, '#e74c3c');
        e.attackCooldown = 40;
      }
      // Player tấn công
      if (dist < 20 && player.attackCooldown <= 0) {
        e.takeDamage(player.atk);
        floatingText.add(e.x, e.y-10, `-${player.atk}`, '#fff');
        player.attackCooldown = 20;
      }
    }
  }
}