'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'HAllo'});

console.log('\'HAllo \'HAllo! Event Page for Browser Action');
