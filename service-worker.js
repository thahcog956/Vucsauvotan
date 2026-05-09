// service-worker.js

const CACHE_NAME = 'roguelike-v1';
const ASSETS_TO_CACHE = [
  '/',
  'index.html',
  'manifest.json',
  'css/style.css',
  'js/main.js',
  'js/config.js',
  'js/utils.js',
  'js/sprites.js',
  'js/scenes/BootScene.js',
  'js/scenes/MenuScene.js',
  'js/scenes/CharacterSelectScene.js',
  'js/scenes/GameplayScene.js',
  'js/scenes/UpgradeScene.js',
  'js/scenes/GameOverScene.js',
  'js/entities/Player.js',
  'js/entities/Enemy.js',
  'js/entities/Boss.js',
  'js/systems/DungeonGenerator.js',
  'js/systems/CombatSystem.js',
  'js/systems/LootSystem.js',
  'js/systems/ProgressionSystem.js',
  'js/systems/SaveManager.js',
  'js/ui/HUD.js',
  'js/ui/Controls.js',
  'js/ui/FloatingText.js',
  'js/ui/Minimap.js',
  'js/ui/InventoryQuick.js'
];

// Sự kiện install: cache toàn bộ tài nguyên tĩnh
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Đang cache tài nguyên...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting()) // Kích hoạt ngay lập tức
  );
});

// Sự kiện activate: xoá cache cũ nếu có
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('Service Worker: Xoá cache cũ', key);
            return caches.delete(key);
          })
      );
    }).then(() => self.clients.claim()) // Kiểm soát tất cả client ngay
  );
});

// Sự kiện fetch: phục vụ từ cache trước (cache-first), nếu không có thì fetch từ mạng
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Có trong cache -> trả về luôn
        if (cachedResponse) {
          return cachedResponse;
        }
        // Không có -> lấy từ mạng
        return fetch(event.request).then(response => {
          // (Tuỳ chọn) cache lại các request mới nếu muốn chiến lược linh hoạt hơn
          // Ở đây chỉ trả về kết quả fetch, không cache thêm để tiết kiệm bộ nhớ
          return response;
        });
      })
  );
});