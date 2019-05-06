function setupSite() {
    setupSideNav();
}

function setupSideNav() {
    let sideNav = document.getElementById("recentPosts");
    let recentPosts = readTextFile("scripts/recentLogs.txt");
}
function readTextFile(file) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                let allText = rawFile.responseText;
                return allText;
            }
        }
    };
    rawFile.send(null);
}