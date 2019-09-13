document.getElementById("track").addEventListener("click", function() {
    //document.getElementById("status").innerHTML = "Tracking...";
    const xhr = new XMLHttpRequest();
    const url = 'https://crystalmathlabs.com/tracker/update.php?player=ironodum&time=1d';
    xhr.open('GET', url);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (document.getElementById("status")) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                //document.getElementById("status").innerHTML = "Success"
            }
        }
    }
});




/*
document.addEventListener('DOMContentLoaded', p => {
    document.getElementById("NewUsernameInput").addEventListener("keypress", function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
            ChangeUsername(document.getElementById("NewUsernameInput").innerText);

            alert(document.getElementById("NewUsernameInput").innerText);
        }
    });
});

function ChangeUsername(NewUsername) {
    alert(NewUsername);
    document.getElementById("UsernameDisplay").innerHTML = NewUsername;
}
*/
