// ==UserScript==
// @name         Better WatchSeries
// @description  Skips countdowns and ads on WatchSeries and related video sites.
// @author       andrewjmetzger
// @copyright    andrewjmetzger
// @license      MIT
//
// @namespace    https://github.com/andrewjmetzger/
// @updateURL    https://openuserjs.org/meta/andrewjmetzger/Better_WatchSeries.meta.js
// @version      1.9.0
//
// @grant        unsafeWindow
// 
// @include      http://*.dwatchseries.ac/*
// @include      http://*.daclips.in/*
// @include      http://*.gorillavid.in/*
// @include      http://*.movpod.in/*
// @include      https://*.thevideo.cc/*
// ==/UserScript==


/*************************************************
*     SETTINGS START HERE - CHANGE SOME STUFF    *
*  Warning: Leave the semicolons alone, or else  *
**************************************************/


// WS_DOMAIN : The current WatchSeries domain. For example, `watchseries.to`. (Case-insensitive)

WS_DOMAIN = 'www.dwatchseries.ac';


// WS_PATH : In the full URL of a video on WatchSeries, the part after the domain, and before the video host.
//           Usually just one word. For example, in `http://www.dwatchseries.ac/link/some-video-host.not/12345678`, 
//           WS_PATH is `link`. (Case-insensitive)

WS_PATH = 'link';


// WS_BUTTON : After clicking on a video link, the text of the button that goes to the video host.
//               For example, `Click here to play`. (Case-sensitive)

WS_BUTTON = 'Click Here to Play';


// WS_TARGET : The CSS class for the footer. Don't change it if you don't understand. (Case-sensitive)

WS_TARGET = ' video-footer';


/*************************************************
*      END OF SETTINGS - STOP CHANGING STUFF     *
**************************************************/


console.log('Better WatchSeries has loaded. Hello there.');
console.log('Version: ' + GM_info.script.version);

var redirected = false;

var buttons = ['Video', 'Play', 'Yes', 'watch', 'Continue', 'Please', 'wait', 'Free', 'Continue as Free User', WS_BUTTON];

var url = location.href;
console.log('Detected URL: ' + url);

var WS_URL = WS_DOMAIN + '/' + WS_PATH;


if (url.indexOf(WS_URL) != -1) {
    console.log("Site found: WatchSeries");
    dest =  document.getElementsByClassName(WS_TARGET)[0].children[2].href;
    dest = dest.toString();
    console.log('dest == ' + dest);
    console.log('Redirecting to : ' + dest);
    location.href = dest;
}

function checkHosts(hosts) {
    for (i in hosts) if (window.location.hostname == hosts[i] || window.location.hostname == 'www.' + hosts[i]) {
	return true;
    }
    return false;
}

function clickButton(button, hosts) {
    button.disabled = false;
    button.click();
}

function clickButtonByIdOnHosts(buttonId, hosts) {
    if (checkHosts(hosts)) try {
	var button = document.getElementById(buttonId);
	clickButton(button);
    } catch (err) {}
}

function clickButtonByNameOnHosts(buttonName, hosts) {
    if (checkHosts(hosts)) try {
	var button = document.getElementsByName(buttonName)[0];
	clickButton(button);
    } catch (err) {}
}

function clickButtonByTextOnHosts(text) {
    if (checkHosts(hosts)) try {
        var button = document.getElementsByTagName("button");
        for (var i = 0; i < button.length; i++) {
            var content = button[i].innerHTML;
            if (content.indexOf(text) != -1) {
                clickButton(button[i]);
            }
        }
    } catch (err) {}
}

try {
    // HOSTS //
    var hosts = ['gorillavid.in', 'daclips.in', 'movpod.in'];
    clickButtonByIdOnHosts('btn_download', hosts);

    var hosts = ['thevideo.cc'];
    clickButtonByTextOnHosts('Proceed to Video');
    
    } catch(err) {
    console.log('Sorry, could not click the button.');
    }
