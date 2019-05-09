let recentLogsDirectory = "https://api.github.com/repos/npalomba/ascent-devlog/contents/recentLogs.txt";

function setupSite() {
    loadComments();
    setupSideNav();
}

function setupSideNav() {
    let sideNav = document.getElementById("recentPosts");
    let recentPosts = httpGet(recentLogsDirectory);
    let jsonRecentLogs = JSON.parse(recentPosts);
    let recentPostsContent = getContentFromGithubFile(jsonRecentLogs);
    let recentPostsLines = recentPostsContent.split(/[\r\n]+/);
    let recentLogsContainer = document.getElementById("recentPosts").children[0];

    for (let i=0; i<recentPostsLines.length; i++) {
        let postFields = recentPostsLines[i].split(",");
        let url = postFields[0] + ".html";
        let title = postFields[1];
        let imgURL = postFields[2];

        /* Creating container with background image */
        let postRoot = document.createElement("div");
        postRoot.setAttribute("class", "recentPostBackground");
        postRoot.style.backgroundImage = "url('" + imgURL + "')";

        /* Creating actual container */
        let postContainer = document.createElement("div");
        postContainer.setAttribute("class", "recentPost");

        /* Adding title */
        let postTitle = document.createElement("h3");
        let postURL = document.createElement("a");
        postURL.setAttribute("href", url);
        postURL.appendChild(postTitle);
        postTitle.textContent = title;

        /* Building complete post */
        postRoot.appendChild(postContainer);
        postContainer.append(postURL);

        /* Adding post to section */
        recentLogsContainer.appendChild(postRoot);
    }
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