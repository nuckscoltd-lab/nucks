// NUCKS PWA 서비스 워커
// 지금은 "바탕화면/홈 화면 설치"를 가능하게 하는 최소 기능만 담당합니다.
// 오프라인 캐싱은 하지 않습니다 (로그인 상태, 실시간 데이터 특성상 항상 최신 데이터를 받아오는 게 안전해서요).

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// 캐싱 없이 그대로 네트워크로 통과 (설치 가능 조건 충족용)
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
