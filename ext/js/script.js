startup();
var username = "IronOdum";
var interval;
var setIntervalms = 60000; // 10 min
var timeoutInterval = 1000;

function startup() {
    setEventListeners();
    setHTML();
    interval = setInterval(setHTML, timeoutInterval);
}

function setEventListeners() {
    document.getElementById("instantTrack").addEventListener("click", track);
}

function setHTML() {
    document.getElementById("UsernameDisplay").innerText = username;
    updateLastCheck();
}

function updateLastCheck() {
    var d = getLastCheckms();
    document.getElementById("lastCheck").innerText = msToHHMMSS(d) + " ago";

    var color;
    if(d > setIntervalms) {
        color = "rgb(125,225,150)";
    }
    else {
        color = "rgb(225,125,150)";
    }
    document.getElementById("instantTrack").style.backgroundColor = color;
}

function getLastCheckms() {
    return new Date().getTime() - getCookie("PreviousDate");
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
