// ==UserScript==
// @name         Better WatchSeries
// @description  Skips countdowns and ads on WatchSeries and related video sites.
// @author       andrewjmetzger
// @copyright    andrewjmetzger
// @license      MIT
//
// @namespace    https://github.com/andrewjmetzger/
// @updateURL        https://openuserjs.org/meta/andrewjmetzger/Better_WatchSeries.meta.js
// @version      2.12.0
//
// @grant        unsafeWindow
// @run-at       document-end
//
// ******** LINK AGGREGATORS ********
// @match        *://*.watchseries.video/*
//
// ******** VIDEO HOSTS *********
// @match        *://*.powvideo.net/*
// @match        *://*.vshare.eu/*

// ==/UserScript==

/**************************************************
 *     SETTINGS START HERE - CHANGE SOME STUFF    *
 *  Warning: Leave the semicolons alone, or else  *
 **************************************************/

// WS_DOMAIN : An optional custom WatchSeries domain. Largeely used for testing purposes.
//             For example, `watchseries.video`. (Case-insensitive). 
//             Must be added in your Tampermonkey script settings as a User match.

var WS_DOMAIN = "";

// WS_PATH : In the full URL of a video on WatchSeries, the part after the
//           domain, and before the video host. Usually just one word.
//           For example, in `https://seriesfree.to/open/cale/319349c-aabbcc.html`,
//           WS_PATH is `open/cale`. (Case-sensitive)

var WS_PATH = "";

// WS_TARGET : The CSS class for the video host redirect link. Used with document.querySelector()
//             Usually the "Click here to continue opening the link" button. (Case-sensitive)

var WS_TARGET = "";

/**************************************************
 *      END OF SETTINGS - STOP CHANGING STUFF     *
 **************************************************/

console.log("Better WatchSeries has loaded. Hello there.");
console.log("Version: " + GM_info.script.version);

var url = location.href;
console.log("Current URL: " + url);

WS_DOMAIN = WS_DOMAIN.toLocaleLowerCase();

var WS_URL = WS_DOMAIN + "/" + WS_PATH;

/**************************************************
 *                  BUTTON FINDER                 *
 **************************************************/

if (url.indexOf("/freecale.html") != -1) {
  console.log("Site found: freecale-like");
  dest = document.querySelector(
    "body > div.centeres > div.bk-grey-long > div > div > div > div > div > div > div > div > div > div:nth-child(3) > a"
  ).href;
  dest = dest.toString();
  console.log("dest == " + dest);
  console.log("Redirecting to : " + dest);
  location.href = dest;
} else if (url.indexOf("/open/link") != -1) {
  console.log("Site found: open/link -like");
  dest = document.querySelector(
    "#link-button > a"
  ).href;
  dest = dest.toString();
  console.log("dest == " + dest);
  console.log("Redirecting to : " + dest);
  location.href = dest;
} else if (url.indexOf(WS_URL) != -1) {
  console.log("Site found: " + WS_DOMAIN);

  dest = document.querySelector(WS_TARGET).href;
  dest = dest.toString();
  console.log("dest == " + dest);
  console.log("Redirecting to : " + dest);
  location.href = dest;
}

function checkHosts(hosts) {
  for (i in hosts)
    if (
      window.location.hostname == hosts[i] ||
      window.location.hostname == "www." + hosts[i]
    ) {
      return true;
    }
  return false;
}

function clickButton(button, hosts) {
  button.disabled = false;
  button.click();
}

function clickButtonByIdOnHosts(buttonId, hosts) {
  if (checkHosts(hosts))
    try {
      var button = document.getElementById(buttonId);
      clickButton(button);
    } catch (err) {
      console.error(err.message);
    }
}

function clickButtonByNameOnHosts(buttonName, hosts) {
  if (checkHosts(hosts))
    try {
      var button = document.getElementsByName(buttonName)[0];
      clickButton(button);
    } catch (err) {
      console.error(err.message);
    }
}

function clickButtonBySelectorOnHosts(buttonSelector, hosts) {
  if (checkHosts(hosts))
    try {
      var button = document.querySelector(buttonSelector);
      clickButton(button);
    } catch (err) {
      console.error(err.message);
    }
}

try {
  var hosts = ["powvideo.net"];
  clickButtonByIdOnHosts("btn_download", hosts);

  var hosts = ["vshare.eu"]
  clickButtonByNameOnHosts("method_free", hosts);


} catch (err) {
  console.log("Error: Better WatchSeries could not click the button.");
}
