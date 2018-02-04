// ==UserScript==
// @name         Better WatchSeries
// @description  Skips countdowns and ads on WatchSeries and related video sites.
// @author       andrewjmetzger
// @copyright    andrewjmetzger
// @license      MIT
//
// @namespace    https://github.com/andrewjmetzger/
// @updateURL    https://openuserjs.org/meta/andrewjmetzger/Better_WatchSeries.meta.js
// @version      1.1.4
//
// @grant        unsafeWindow
// @include      http://*/rc.php?Id=*
// @include      http://*/videos.php?Id=*
// @include      http://*.daclips.in/*
// @include      http://*.gorillavid.in/*
// @include      http://*.movpod.in/*
// @include      http://*.dwatchseries.ac/*
// ==/UserScript==

/*************************************************
*     SETTINGS START HERE - CHANGE SOME STUFF    *
*  Warning: Leave the semicolons alone, or else  *
**************************************************/


// WS_DOMAIN : The current WatchSeries domain. For example, `watchseries.to`. (Case-insensitive)

WS_DOMAIN = 'dwatchseries.ac';


// WS_PATH : In the full URL of a video on WatchSeries, the part after the domain, and before the video host.
//           Usually just one word. For example, in `http://www.dwatchseries.ac/link/some-video-host.not/12345678`, 
//           WS_PATH is `link`. (Case-insensitive)

WS_PATH = 'link';


// WS_BUTTON : After clicking on a video link, the text of the button that goes to the video host.
//               For example, `Click here to play`. (Case-sensitive)

WS_BUTTON = 'Click Here to Play';


// WS_TARGET : The partial CSS selector for WS_BUTTON. Don't change it if you don't understand. (Case-sensitive)

WS_TARGET = 'a#video-embed';


/*************************************************
*      END OF SETTINGS - STOP CHANGING STUFF     *
**************************************************/


GM_log('Better WatchSeries has loaded successfully. Hi there. :-)');
var redirected = false;

var buttons = ['Video', 'Play', 'Yes', 'watch', 'Continue', 'Please', 'wait', 'Free', 'Continue as Free User', WS_BUTTON];

var url = location.href;
GM_log('Detected URL: ' + WS_DOMAIN + '/' + WS_PATH);

if (inArray(url, ['/rc.php?'])) {
  location.href = url.replace('/rc.php?', '/videos.php?');
}
else if (inArray(url, ['/pc/'])) {
  location.href = url.replace('/pc/', '/playerframe.php?Id=').replace(/\/$/, '');
}
else if (inArray(url, [WS_DOMAIN + '/' + WS_PATH])) {
    GM_log('Found WS; Redirecting to host: ' + $(WS_TARGET).attr('href'));
  location.href = $(WS_TARGET).attr('href');
}
else if (findSubmit()) { }

else if (!redirected) {
  var arrFn = ['closead', 'player_start', 'hideOverlay', ];
  for (var i in arrFn) {
    if (typeof unsafeWindow[arrFn[i]] === 'function') {
      unsafeWindow[arrFn[i]]();
    }
  }

}

function inArray(strData, arrFind) {
  for (var i in arrFind) {
    if (strData.indexOf(arrFind[i]) >= 0) {
      return true;
    }
  }
  return false;
}

function findForm() {
  if (document.forms) {
    for (var x in document.forms) {
      if (document.forms[x] && document.forms[x].getElementsByTagName) {
        var inputs = document.forms[x].getElementsByTagName('input');
        if (inputs) {
          for (var y in inputs) {
            if (inputs[y] && inputs[y].getAttribute && inputs[y].getAttribute('type') === 'submit' && inArray(inputs[y].getAttribute('value'), buttons)) {
              console.log(inputs[y], inputs[y].click);
              redirected = true;
              inputs[y].click();
              GM_log('Button found: Clicked the button called \'' + WS_BUTTON + '\' (findForm).');
              // document.forms[x].submit();
              return true;
            }
          }
        }
      }
    }
  }
  return false;
}

function findSubmit() {
  if (document.forms) {
    var inputs = document.getElementsByTagName('input');
    if (inputs) {
      for (var y in inputs) {
        if (inputs[y] && inputs[y].getAttribute && inputs[y].getAttribute('type') === 'submit' && inArray(inputs[y].getAttribute('value'), buttons)) {
          redirected = true;
          if (inputs[y].mousedown) {
            inputs[y].mousedown();
          }
          else if (inputs[y].click) {
            inputs[y].click();
          }
          GM_log('Button found: Clicked the button called \'' + WS_BUTTON + '\' (findSubmit).');
          return true;
        }
      }
    }
  }
  return false;
}
