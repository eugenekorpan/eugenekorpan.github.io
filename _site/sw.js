/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
     http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = 'v1';
const RUNTIME = 'libido-cache';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = ['/']
const PRECACHE_URLS1 = [
  '/about.html',
  '/CNAME',
  '/index.html',
  '/README',
  '/sw.js',
  '/approach.html',
  '/contact-us.html',
  '/manifest.json',
  '/services.html',
  '/favicon.ico',
  '/solutions.html',
  '/leadership.html',
  '/assets/scripts.js',
  '/assets/style.css',
  '/media/',
  '/media/about-line-animation.svg',
  '/media/navbar-contact-us-hover.svg',
  '/media/about-us-image-1.png',
  '/media/navbar-contact-us.svg',
  '/media/about-us-image-2.png',
  '/media/navbar-home-hover.svg',
  '/media/about-us-image-3.png',
  '/media/navbar-home.svg',
  '/media/navbar-leadership.svg',
  '/media/navbar-leadership-hover.svg',
  '/media/about-us-image-4.png',
  '/media/navbar-services-hover.svg',
  '/media/approach-1.svg',
  '/media/navbar-services.svg',
  '/media/approach-2.svg',
  '/media/navbar-solutions-hover.svg',
  '/media/approach-3.svg',
  '/media/navbar-solutions.svg',
  '/media/approach-4.svg',
  '/media/services-apps.svg',
  '/media/approach-5.svg',
  '/media/services-content-writing.svg',
  '/media/approach-6.svg',
  '/media/services-design.svg',
  '/media/arrow-left.svg',
  '/media/services-hz.svg',
  '/media/bg-about-us.png',
  '/media/services-logo-design.svg',
  '/media/bg-approach.png',
  '/media/services-sales-and-marketing.svg',
  '/media/bg-contact-us.png',
  '/media/services-seo.svg',
  '/media/bg-home.jpg',
  '/media/services-support-and-maintenance.svg',
  '/media/bg-services.png',
  '/media/ervices-web-and-app.svg',
  '/media/bg-solutions.png',
  '/media/services-website-dev.svg',
  '/media/button-arrow-left.svg',
  '/media/social-facebook-icon-hover.svg',
  '/media/contact-us-mobile.svg',
  '/media/social-facebook-icon.svg',
  '/media/fonts',
  '/media/social-in-icon-hover.svg',
  '/media/hello.jpg',
  '/media/social-in-icon.svg',
  '/media/logo-mobile.svg',
  '/media/social-instagram-icon-hover.svg',
  '/media/logo.svg',
  '/media/social-instagram-icon.svg',
  '/media/mobile-logo192.png',
  '/media/solutions-moc-date.png',
  '/media/mobile-logo512.png',
  '/media/solutions-moc-ecommerce.png',
  '/media/navbar-about-hover.svg',
  '/media/solutions-moc-escort-agency.png',
  '/media/navbar-about.svg',
  '/media/solutions-moc-live-webcam-streaming.png',
  '/media/navbar-approach-hover.svg',
  '/media/solutions-moc-sex-chats.png',
  '/media/navbar-approach.svg',
  '/media/solutions-moc-video-sharing.png',
  '/media/eugene.png',
  '/media/vova.png',
  '/media/julia.png'
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
