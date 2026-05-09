import { CONFIG } from './config.js';
import { SpriteGenerator } from './sprites.js';
import { BootScene } from './scenes/BootScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { CharacterSelectScene } from './scenes/CharacterSelectScene.js';
import { GameplayScene } from './scenes/GameplayScene.js';
import { UpgradeScene } from './scenes/UpgradeScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = CONFIG.GAME_WIDTH;
canvas.height = CONFIG.GAME_HEIGHT;

const sprites = new SpriteGenerator();

let currentScene = null;

function switchScene(name, data = {}) {
  if (currentScene && currentScene.destroy) currentScene.destroy();
  switch (name) {
    case 'boot': currentScene = new BootScene(ctx, sprites, switchScene); break;
    case 'menu': currentScene = new MenuScene(ctx, sprites, switchScene); break;
    case 'characterSelect': currentScene = new CharacterSelectScene(ctx, sprites, switchScene); break;
    case 'gameplay': currentScene = new GameplayScene(ctx, sprites, switchScene, data); break;
    case 'upgrade': currentScene = new UpgradeScene(ctx, sprites, switchScene, data); break;
    case 'gameover': currentScene = new GameOverScene(ctx, sprites, switchScene, data); break;
  }
}

function gameLoop() {
  if (currentScene) {
    currentScene.update();
    currentScene.render();
  }
  requestAnimationFrame(gameLoop);
}

switchScene('boot');
gameLoop();