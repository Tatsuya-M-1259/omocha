// sw.js (Service Workerファイル)

// キャッシュの名前を定義（アプリのバージョンが変わったら数字を変更）
const CACHE_NAME = 'wareki-converter-v1';
// キャッシュに保存するファイル一覧
const urlsToCache = [
  './', // index.html
  './index.html',
  './icon-192x192.png', // 🌟 ファイル名を修正
  './icon-512x512.png' // 🌟 ファイル名を修正
];

// Service Workerがインストールされたとき（初回アクセス時など）
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // 定義したファイル群をキャッシュに保存
        return cache.addAll(urlsToCache);
      })
  );
});

// アプリがリソースを要求したとき（ページ遷移、オフライン時など）
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // キャッシュにファイルがあれば、そこから返す（オフライン対応）
        if (response) {
          return response;
        }
        // キャッシュになければ、通常通りネットワークから取得
        return fetch(event.request);
      }
    )
  );
});
