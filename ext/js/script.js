startup();
var interval;
var username = "IronOdum";
var setIntervalms = 900000; // 10 min
var timeoutInterval = 1000;

if(document.getElementById("instanttrack")) {
    document.getElementById("instanttrack").addEventListener("click", function() {
        document.cookie = "PreviousDate=" + (new Date()).getTime();
        if(document.getElementsByClassName("progressbar")) {
            var div = document.getElementById("progressbar");
            var span = div.getElementsByTagName("span");
            span[0].style.width = "0%";
        }
        updateTimer(setIntervalms);
        track();
    });
}

if(document.getElementById("trackbtn")) {
    document.getElementById("trackbtn").addEventListener("click", trackbtnclick);
}

if(document.getElementById("UsernameDisplay")) {
    document.getElementById("UsernameDisplay").innerText = username;
}



function startup() {
    const status = getCookie("TrackingStatus");
    var trackbtn = document.getElementById("trackbtn");

    if(status === "running") {
        trackbtn.innerText = "Pause";
        trackbtn.style.backgroundColor = "rgb\(200, 150, 150)";
        interval = startChecking();
    }
    else if(status === "paused") {
        trackbtn.innerText = "Resume";
        trackbtn.style.backgroundColor = "rgb\(150, 200, 150)";
    }
}

function startChecking() {
    document.cookie = "TrackingStatus=running";
    document.cookie = "PreviousDate=" + (new Date()).getTime();
    var elem = document.getElementById("trackbtn");
    elem.innerText = "Pause";
    elem.style.backgroundColor = "rgb\(200, 150, 150)";
    track();
    return setInterval(Check, timeoutInterval);
}

function stopChecking() {
    document.cookie = "TrackingStatus=paused";
    var elem = document.getElementById("trackbtn");
    elem.innerText = "Resume";
    elem.style.backgroundColor = "rgb\(150, 200, 150)";
    clearInterval(interval);
}

function trackbtnclick() {
    if(document.cookie.includes("TrackingStatus")) {
        const status = getCookie("TrackingStatus");

        if(status === "running") {
            stopChecking();
        }
        else if(status === "paused") {
            if(interval != null) {
                clearInterval(interval);
            }
            interval = startChecking();
        }
    }
}

function Check() {
    const now = new Date();
    const d = (new Date(now.getTime() - fetchCookieDate())).getTime();
    var timeLeft = setIntervalms - d;
    if (timeLeft < 0) {
        timeLeft = 0;
    }

    if(document.getElementsByClassName("progressbar")) {
        const width = d / setIntervalms * 100;

        var div = document.getElementById("progressbar");
        var span = div.getElementsByTagName("span");

        if(width >= 100) {
            span[0].style.width = "100%";
        }
        else {
            span[0].style.width = width + "%";
        }
    }

    if(d > setIntervalms) {
        document.cookie = "PreviousDate=" + (new Date()).getTime();
        track();
    }
    updateTimer(timeLeft);
}

function updateTimer(ms) {
    if (document.getElementById("nextCheck")) {
        if (ms < setIntervalms) {
            document.getElementById("nextCheck").innerText = msToHHMMSS(ms);
        } else {
            document.getElementById("nextCheck").innerText = msToHHMMSS(setIntervalms);
        }
    }
}

function track() {
    var xhr = new XMLHttpRequest();
    sendCMLRequest(xhr);
    document.cookie = "PreviousDate=" + new Date().getTime();
}

function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}

function fetchCookieDate() {
    var cookieValue;

    if(document.cookie.includes("PreviousDate")) {
        cookieValue = getCookie("PreviousDate");
    }
    else {
        cookieValue = document.cookie = "PreviousDate=" + new Date();
    }

    return cookieValue;
}

function sendCMLRequest(xhr){
    const url = 'https://crystalmathlabs.com/tracker/update.php?player=ironodum&time=1d';
    xhr.open('GET', url, true);
    xhr.send();
}

function msToHHMMSS(ms) {
    var res;

    var hh = Math.floor(ms / 1000 / 60 / 60);
    ms -= hh * 1000 * 60 * 60;
    var mm = Math.floor(ms / 1000 / 60);
    ms -= mm * 1000 * 60;
    var ss = Math.floor(ms / 1000);

    if(hh>0) {
        res = hh+"h "+mm+"m "+ss+"s";
    }
    else if(mm>0){
        res = mm+"m "+ss+"s"
    }
    else {
        res = ss + "s";
    }
    return res;
}
