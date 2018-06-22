// ==UserScript==
// @name         Better WatchSeries
// @description  Skips countdowns and ads on WatchSeries and related video sites.
// @author       andrewjmetzger
// @copyright    andrewjmetzger
// @license      MIT
//
// @namespace    https://github.com/andrewjmetzger/
// @updateURL    https://openuserjs.org/meta/andrewjmetzger/Better_WatchSeries.meta.js
// @version      2.4.0
//
// @grant        unsafeWindow
// @run-at       document-end
//
// @match        *://*.seriesfree.to/*
// @match        *://*.swatchseries.to/*
// @match        *://*.auroravid.to/*
// @match        *://*.bitvid.sx/*
// @match        *://*.daclips.in/*
// @match        *://*.gorillavid.in/*
// @match        *://*.movpod.in/*
// @match        *://*.nowvideo.to/*
// @match        *://*.openload.co/*
// @match        *://*.thevideo.cc/*
// @match        *://*.thevideo.website/*
// @match        *://*.vidup.me/*
// @match        *://*.vidzi.tv/*
// @match        *://*.wholecloud.net/*
// ==/UserScript==

/**************************************************
 *     SETTINGS START HERE - CHANGE SOME STUFF    *
 *  Warning: Leave the semicolons alone, or else  *
 **************************************************/

// WS_DOMAIN : An optional custom WatchSeries domain. Don't change this if you don't need to.
//             For example, `watchseries.to`. (Case-insensitive)

var WS_DOMAIN = "www.example.com";

// WS_PATH : In the full URL of a video on WatchSeries, the part after the
//           domain, and before the video host. Usually just one word.
//           For example, in `https://seriesfree.to/open/cale/319349c-aabbcc.html`,
//           WS_PATH is `open/cale`. (Case-sensitive)

var WS_PATH = "path/to/foo";

// WS_TARGET : The CSS class for the video host link. Used with document.querySelector()
//             Leave it alone unless you understand exactly what this does. (Case-sensitive)

var WS_TARGET_CLASS = "bar-baz";

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
 *              Hide Incompatible Hosts           *
 **************************************************/

 (function() {
     'use strict';

    var favHosts = [
      'auroravid.to',
      'bitvid.sx',
      'daclips.in',
      'gorillavid.in',
      'movpod.in',
      'nowvideo.to',
      'openload.co',
      'thevideo.cc',
      'thevideo.website',
      'vidup.me',
      'vidzi.tv',
      'wholecloud.net'
    ];


    $('.linktable .myTable td:first-child > span').each(function(){
        var span = $(this);
        if(favHosts.indexOf(span.text()) < 0){
            var tr = span.closest('tr');
            tr.css('display', 'none');
        }
    });
 })();

 /**************************************************
  *                  BUTTON FINDER                 *
  **************************************************/

if (url.indexOf("dwatchseries.to/freecale.html") != -1 || url.indexOf("swatchseries.to/freecale.html") != 1) {
    console.log("Site found: freecale-like");
    dest = document.querySelector("body > div.centeres > div.bk-grey-long > div > div > div > div > div > div > div > div > div > div:nth-child(3) > a").href;
    dest = dest.toString();
    console.log("dest == " + dest);
    console.log("Redirecting to : " + dest);
    location.href = dest;
}

else if (url.indexOf("seriesfree.to/open/cale") != -1) {
    console.log("Site found: open/cale-like");
    dest = document.querySelector("#app > section > div.view.cf > div > div \
                                  > article:nth-child(8) > div.actions.grid-1.grid-lg-8-24 > a").href;
    dest = dest.toString();
    console.log("dest == " + dest);
    console.log("Redirecting to : " + dest);
    location.href = dest;
}

else if (url.indexOf(WS_URL) != -1) {
    console.log("Site found: " + WS_DOMAIN);

    dest = document.querySelector(WS_TARGET_CLASS).href
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
        } catch (err) {}
}

function clickButtonByNameOnHosts(buttonName, hosts) {
    if (checkHosts(hosts))
        try {
            var button = document.getElementsByName(buttonName)[0];
            clickButton(button);
        } catch (err) {}
}

function clickButtonBySelectorOnHosts(buttonSelector, hosts) {
    if (checkHosts(hosts))
        try {
            var button = document.querySelector(buttonSelector);
            clickButton(button);
        } catch (err) {}
}

try {
    var hosts = ["daclips.in", "gorillavid.in", "movpod.in", "vidup.me"];
    clickButtonByIdOnHosts("btn_download", hosts);

    var hosts = ["thevideo.cc", "thevideo.website"];
    clickButtonBySelectorOnHosts("button.btn.btn-lg.btn-primary.bottom-buffer", hosts);

    var hosts = [ "auroravid.to", "bitvid.sx", "nowvideo.to", "wholecloud.net"];
    clickButtonByNameOnHosts("submit", hosts);

} catch (err) {
    console.log("Error: Better WatchSeries could not click the button.");
}
