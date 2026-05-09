export class Minimap {
  render(ctx, player, cols, rows, tileSize) {
    const mmSize = 60; const mmX = 10, mmY = 40;
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = '#000'; ctx.fillRect(mmX, mmY, mmSize, mmSize);
    // ...
    ctx.globalAlpha = 1;
  }
}