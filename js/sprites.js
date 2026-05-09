export class SpriteGenerator {
  constructor() {
    this.cache = {};
  }

  get(key, w = 16, h = 16) {
    if (!this.cache[key]) {
      this.cache[key] = this.generate(key, w, h);
    }
    return this.cache[key];
  }

  generate(key, w, h) {
    const off = document.createElement('canvas');
    off.width = w; off.height = h;
    const ctx = off.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    // Player sprites
    if (key === 'warrior') {
      ctx.fillStyle = '#c0392b'; ctx.fillRect(4,0,8,14); // body
      ctx.fillStyle = '#d35400'; ctx.fillRect(2,2,12,2); // hair
    } else if (key === 'mage') {
      ctx.fillStyle = '#2980b9'; ctx.fillRect(4,0,8,14);
      ctx.fillStyle = '#f1c40f'; ctx.fillRect(6,2,4,2);
    } else if (key === 'rogue') {
      ctx.fillStyle = '#2c3e50'; ctx.fillRect(4,0,8,14);
      ctx.fillStyle = '#7f8c8d'; ctx.fillRect(8,2,4,2);
    }

    // Enemies
    else if (key === 'rat') {
      ctx.fillStyle = '#7f8c8d'; ctx.fillRect(5,8,6,6);
      ctx.fillStyle = '#ecf0f1'; ctx.fillRect(6,6,2,2);
    } else if (key === 'zombie') {
      ctx.fillStyle = '#27ae60'; ctx.fillRect(3,2,10,12);
      ctx.fillStyle = '#2c3e50'; ctx.fillRect(5,0,6,3);
    } else if (key === 'shadow_mage') {
      ctx.fillStyle = '#8e44ad'; ctx.fillRect(3,2,10,12);
      ctx.fillStyle = '#9b59b6'; ctx.fillRect(2,0,12,2);
    }

    // Boss
    else if (key === 'boss') {
      ctx.fillStyle = '#e74c3c'; ctx.fillRect(0,0,16,20);
      ctx.fillStyle = '#c0392b'; ctx.fillRect(2,2,12,4);
    }

    // Tiles
    else if (key === 'floor') {
      ctx.fillStyle = '#2c3e50'; ctx.fillRect(0,0,16,16);
      ctx.fillStyle = '#34495e'; ctx.fillRect(1,1,14,14);
    } else if (key === 'wall') {
      ctx.fillStyle = '#1e272e'; ctx.fillRect(0,0,16,16);
      ctx.fillStyle = '#485460'; ctx.fillRect(0,0,16,2);
    } else if (key === 'stairs') {
      ctx.fillStyle = '#2c3e50'; ctx.fillRect(0,0,16,16);
      ctx.fillStyle = '#f1c40f'; ctx.fillRect(4,4,8,8);
    }

    // Items
    else if (key === 'heart') {
      ctx.fillStyle = '#e74c3c'; ctx.fillRect(4,4,8,8);
    } else if (key === 'coin') {
      ctx.fillStyle = '#f1c40f'; ctx.beginPath(); ctx.arc(8,8,5,0,Math.PI*2); ctx.fill();
    }

    // No default
    return off;
  }
}