"use strict";

// Reload client for Chrome Apps & Extensions.
// The reload client has a compatibility with livereload.
// WARNING: only supports reload command.

const LIVERELOAD_HOST = "localhost";
const LIVERELOAD_PORT = 35729;
const LIVERELOAD = `ws://{LIVERELOAD_HOST}:{LIVERELOAD_PORT}/livereload`;
const connection = new WebSocket(LIVERELOAD);

let lastReload = false;

chrome.runtime.onInstalled.addListener(function (details) {
  lastReload = Date.now();
});

connection.onerror = (error) => {
  console.log("reload connection got error:", error);
};

const ONE_MINUTE_MS = 60000;

connection.onmessage = (e) => {
  if (e.data) {
    const data = JSON.parse(e.data);

    if (data && data.command === "reload") {
      let currentTime = Date.now();
      let sinceLastReload = currentTime - lastReload;
      let overOneMinute = sinceLastReload > ONE_MINUTE_MS;

      if (lastReload && overOneMinute) {
        chrome.runtime.reload();
        chrome.developerPrivate.reload(chrome.runtime.id, {
          failQuietly: true,
        });
      }
    }
  }
};
