// ==UserScript==
// @name         Better WatchSeries
// @description  Skips countdowns and ads on WatchSeries and related video sites.
// @author       andrewjmetzger
// @copyright    andrewjmetzger
// @license      MIT
//
// @namespace    https://github.com/andrewjmetzger/
// @updateURL    https://openuserjs.org/meta/andrewjmetzger/Better_WatchSeries.meta.js
// @version      1.10.6
//
// @grant        unsafeWindow
// @run-at       document-end
//
// @match        *://*.dwatchseries.ac/*
// @match        *://*.daclips.in/*
// @match        *://*.gorillavid.in/*
// @match        *://*.movpod.in/*
// @match        *://*.thevideo.cc/*
// @match        *://*.streamplay.top/*
// @match        *://*.nowvideo.to/*
// ==/UserScript==

/*************************************************
 *     SETTINGS START HERE - CHANGE SOME STUFF    *
 *  Warning: Leave the semicolons alone, or else  *
 **************************************************/

// WS_DOMAIN : The current WatchSeries domain. For example, `watchseries.to`.
//             (Case-insensitive)

WS_DOMAIN = "www.dwatchseries.ac";

// WS_PATH : In the full URL of a video on WatchSeries, the part after the
//           domain, and before the video host. Usually just one word.
//           For example, in `http://watchseries.ac/link/some-host.not/12345678`,
//           WS_PATH is `link`. (Case-insensitive)

WS_PATH = "link";

// WS_TARGET : The CSS class for the WatchSeries footer. Leave it alone unless
//             you undersand exactly what this does. (Case-sensitive)

WS_TARGET = " video-footer";

/*************************************************
 *      END OF SETTINGS - STOP CHANGING STUFF     *
 **************************************************/

console.log("Better WatchSeries has loaded. Hello there.");
console.log("Version: " + GM_info.script.version);

var url = location.href;
console.log("Current URL: " + url);

var WS_URL = WS_DOMAIN + "/" + WS_PATH;

if (url.indexOf(WS_URL) != -1) {
    console.log("Site found: WatchSeries");
    dest = document.getElementsByClassName(WS_TARGET)[0].children[2].href;
    dest = dest.toString();
    console.log("dest == " + dest);
    console.log("Redirecting to : " + dest);
    location.href = dest;
}

var wait = ms => new Promise((r, j)=>setTimeout(r, ms));

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
        } catch (err) {}
}

function clickButtonByNameOnHosts(buttonName, hosts) {
    if (checkHosts(hosts))
        try {
            var button = document.getElementsByName(buttonName)[0];
            clickButton(button);
        } catch (err) {}
}

function clickButtonByClassOnHosts(buttonClass, hosts) {
    if (checkHosts(hosts))
        try {
            var button = document.querySelector(buttonClass);
            clickButton(button);
        } catch (err) {}
}

try {
    var hosts = ["gorillavid.in", "daclips.in", "movpod.in"]; // No delay
    clickButtonByIdOnHosts("btn_download", hosts);

    var hosts = ["streamplay.top"]; // 6-second delay
    wait(6000);
    clickButtonByIdOnHosts("btn_download", hosts);
    
    var hosts = ["thevideo.cc"];
    clickButtonByClassOnHosts(
        "button.btn.btn-lg.btn-primary.bottom-buffer",
        hosts,
    );
    
    var hosts = ['nowvideo.to'];
    clickButtonByNameOnHosts("submit", hosts);
    
} catch (err) {
    console.log("Error: Better WatchSeries could not click the button.");
}
