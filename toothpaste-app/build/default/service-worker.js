/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","21cd30c752f21f263821f2cde18c5888"],["/bower_components/app-layout/app-drawer/app-drawer.html","1cad6196350458a8c955b55cb1165269"],["/bower_components/app-layout/app-header-layout/app-header-layout.html","b3569d445db00a6e6c8ff4598dc165e9"],["/bower_components/app-layout/app-header/app-header.html","12881517a8784df430c7a37475e8e2ec"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","349f3c6d1728e0187fff4d3d073f7b9f"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","334eac7f54a828baedbe8f09574571b7"],["/bower_components/app-layout/app-scroll-effects/effects/blend-background.html","53ab90982adbe7457d8603d722c98d2f"],["/bower_components/app-layout/app-scroll-effects/effects/fade-background.html","593bd7855bcc277f33e8c256c45ef039"],["/bower_components/app-layout/app-scroll-effects/effects/material.html","09fc23898ebd40bf11160760df03de86"],["/bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","d50c47e6d50fe8a33e65d10a9c189684"],["/bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","a9dcfcb21b7af4dbe25d8ca6d8099463"],["/bower_components/app-layout/app-scroll-effects/effects/resize-title.html","372a9ebaa9d642e878c47da476c171ec"],["/bower_components/app-layout/app-scroll-effects/effects/waterfall.html","0d19840e1b4112985dacaf8a99513abe"],["/bower_components/app-layout/app-toolbar/app-toolbar.html","0f1e0b29d1769e45fe9ca9fc84dc955e"],["/bower_components/app-layout/helpers/helpers.html","c3e82580bbb4c5e4ac5ebf5c22647016"],["/bower_components/app-route/app-location.html","e3bd813962e634bd71009586ddd39db1"],["/bower_components/app-route/app-route-converter-behavior.html","5ed794fad917e6c6cae8ecc2da6a1840"],["/bower_components/app-route/app-route.html","25c486d42a8a5370b7f636c77f3aea78"],["/bower_components/font-roboto/roboto.html","196f915c2bb639c50e0748d057754841"],["/bower_components/iron-a11y-announcer/iron-a11y-announcer.html","7da2a1b06dbf5fc05631df208da0ba8b"],["/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","26309806bc5a08dab92ec43a33bf85ad"],["/bower_components/iron-ajax/iron-ajax.html","5d1209fe045c6db6640fb75307d5e71c"],["/bower_components/iron-ajax/iron-request.html","3d328e708516fdd96605052c2f90f50b"],["/bower_components/iron-autogrow-textarea/iron-autogrow-textarea.html","dccde5934468f998ef56a5b08bde61a1"],["/bower_components/iron-behaviors/iron-button-state.html","69eabb470fcadef4e70ff50a09bedafc"],["/bower_components/iron-behaviors/iron-control-state.html","c206f87dd46f347d33c37004913a24b1"],["/bower_components/iron-flex-layout/iron-flex-layout.html","d209230aa135c45c817b0deacd4fe0cf"],["/bower_components/iron-form-element-behavior/iron-form-element-behavior.html","729d7e9d023843e50ec4d04d66b4376e"],["/bower_components/iron-form/iron-form.html","a1c0319f1844a53114b52001ad532421"],["/bower_components/iron-icon/iron-icon.html","531c4dce3ccc0ca17182d137fb82e2f7"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","df2b26b9f276a709bfe9e75d5f46fbfa"],["/bower_components/iron-image/iron-image.html","45a91e7ed5e339fc446e1bc5eb819ff0"],["/bower_components/iron-input/iron-input.html","5c723fffebe679215012b380bb3d825e"],["/bower_components/iron-location/iron-location.html","632fb5f2d963b7096f3ee6786bef3bf4"],["/bower_components/iron-location/iron-query-params.html","7af5593d2603020de94ba9e63af91b5b"],["/bower_components/iron-media-query/iron-media-query.html","65ec581bf71b4acffa3703a5964e1232"],["/bower_components/iron-meta/iron-meta.html","9a240eda67672e29b82e15898a9619d1"],["/bower_components/iron-pages/iron-pages.html","82d5debc56ced36961be39a181280795"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","369445436b6316b3ce3a36621808e152"],["/bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","aa108ab483825128d97a10a609f9e3c8"],["/bower_components/iron-selector/iron-multi-selectable.html","c3a5407e403189d9ffbb26a94253cac9"],["/bower_components/iron-selector/iron-selectable.html","a179d62580cfdf7c022dcdf24841487a"],["/bower_components/iron-selector/iron-selection.html","3343a653dfada7e893aad0571ceb946d"],["/bower_components/iron-selector/iron-selector.html","eaec85c290f2dfa24f778a676bf56e15"],["/bower_components/iron-validatable-behavior/iron-validatable-behavior.html","276f0be293659b862bc108eabfdb04e5"],["/bower_components/paper-behaviors/paper-button-behavior.html","1b832001d3a6001ddeb2380e4b5bee47"],["/bower_components/paper-behaviors/paper-inky-focus-behavior.html","07276537aed6235c4126ff8f2f38db6a"],["/bower_components/paper-behaviors/paper-ripple-behavior.html","26f84434724812da0631633cdd54676e"],["/bower_components/paper-button/paper-button.html","ce857a5d05931fef7fbb2090ae0feb06"],["/bower_components/paper-card/paper-card.html","b87102cdfd95333929fa0f9a8304f246"],["/bower_components/paper-icon-button/paper-icon-button.html","d2302a27079e142d6cf27ecb26e21e06"],["/bower_components/paper-input/paper-input-addon-behavior.html","2a44f95760e14f00e2edef2941dc3a01"],["/bower_components/paper-input/paper-input-behavior.html","5414ca3c1c15e9914a016e5dc42253d0"],["/bower_components/paper-input/paper-input-char-counter.html","0b700395d284f73e0d5fefb8ecc97786"],["/bower_components/paper-input/paper-input-container.html","449870d5e326ce0057df9453c320e3ea"],["/bower_components/paper-input/paper-input-error.html","ea91878f0704d294c5f7a9090852aba5"],["/bower_components/paper-input/paper-input.html","a2e412908d2b65105baad3f07728dfe1"],["/bower_components/paper-input/paper-textarea.html","03688fa0a8c1bbf3a1936b04158e5b33"],["/bower_components/paper-item/paper-item-behavior.html","b592d0dc10be683c685d3d771b3d0ae5"],["/bower_components/paper-item/paper-item-shared-styles.html","4178a2695e9295e7f141ff3537509603"],["/bower_components/paper-item/paper-item.html","2388ae87769be7d30ecb9c0c82ee2f45"],["/bower_components/paper-material/paper-material-shared-styles.html","96e347b417f6c92a317813cc08a23c8d"],["/bower_components/paper-material/paper-material.html","5b1de192df056015265e247916fbbd7e"],["/bower_components/paper-ripple/paper-ripple.html","ab48a97fb99a146ad6eff4bf3e6d0ad8"],["/bower_components/paper-styles/color.html","731b5f7949a2c3f26ce829fd9be99c2d"],["/bower_components/paper-styles/default-theme.html","9e845d4da61bd65308eb8e4682cd8506"],["/bower_components/paper-styles/shadow.html","17203fd5db371a3e5cb4efabb11951f9"],["/bower_components/paper-styles/typography.html","dc2b6f8af5ebcb16a63800b46017a08a"],["/bower_components/polymer/polymer-micro.html","51bf9669120232f00691f897cd456e35"],["/bower_components/polymer/polymer-mini.html","70300bbedb25a0e0fa086ad307a45117"],["/bower_components/polymer/polymer.html","fcfd1ca7766ad2fc9845a9f5d7d7c8ce"],["/bower_components/promise-polyfill/Promise.js","6d72e76387d06f828797b0ce05a2feb7"],["/bower_components/promise-polyfill/promise-polyfill-lite.html","dde76b713d4508d4b49e5a4b203b2a10"],["/bower_components/webcomponentsjs/webcomponents-lite.min.js","32b5a9b7ada86304bec6b43d3f2194f0"],["/index.html","62683337fa6fe3c086a863eedba7cd41"],["/manifest.json","02b2e4c099f0d5cb096e7d7526e586c3"],["/src/shared-styles.html","78a57285a3470a039388d646357ee82d"],["/src/tp-add.html","743a209e760f4e6840e380f2019d5de0"],["/src/tp-app.html","1b99ff4a4a656825971bce3afea9cc14"],["/src/tp-entries.html","b4dc480323c2f31029ae0e66097a812c"],["/src/tp-entry.html","b4007831e3d8ff319abd6ace3ca563e9"],["/src/tp-home.html","fe8477e169e5092bb2e7e9740dc420d6"],["/src/tp-icons.html","cec8a40149a6b3c1eb0885774b3bd758"],["/src/tp-push.html","6a64ba3b15795c15625325b45661003a"],["/src/tp-view404.html","b942e5f8daad056a4d7ac9ad82a9ebe7"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







