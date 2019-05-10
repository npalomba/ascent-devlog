let recentLogsDirectory = "https://api.github.com/repos/npalomba/ascent-devlog/contents/recentLogs.txt";
let logsDirectory = "https://api.github.com/repos/npalomba/ascent-devlog/contents/allLogs";

function setupSite() {
    loadComments();
    setupSideNav();
    addLogs();
}

function addLogs() {
    let logSection = document.getElementById("logs");

    if (logSection != null && logSection !== undefined) {
        let logsContent = getContentFromGithubFile(JSON.parse(httpGet(logsDirectory)));
        logsContent = logsContent.replace(/>/g, "");
        let logLines = logsContent.split(/[\r\n]+/);

        for (let i=0; i<logLines.length; i++) {
            if (logLines[i] !== "") {
                /* Getting data from the current line */
                let logParams = logLines[i].split(/\|/g);
                let imgURL = logParams[0];
                let title = logParams[1];
                let content = logParams[2];


                content = content.substr(0, 168);
                content += "...";

                /* Creating necessary HTML elements */
                let logDiv = document.createElement("div");
                let img = document.createElement("img");
                let logContent = document.createElement("div");
                let h2 = document.createElement("h2");
                let span = document.createElement("span");

                /* Setting attributes */
                logDiv.setAttribute("class", "log");
                img.setAttribute("src", imgURL);
                img.setAttribute("class", "logImage");
                logContent.setAttribute("class", "logTextContent");
                h2.setAttribute("class", "logTitle");
                span.setAttribute("class", "logContent");
                h2.innerText = title;
                span.innerText = content;
                let link =

                /* Building the div */
                logDiv.appendChild(img);
                logDiv.appendChild(logContent);
                logContent.appendChild(h2);
                logContent.appendChild(span);

                /* Appending div to contaienr */
                logSection.appendChild(logDiv);
            }
        }
    }
}

function setupSideNav() {
    let recentLogsContainer = document.getElementById("recentPosts");

    if (recentLogsContainer != null) {
        recentLogsContainer = recentLogsContainer.children[0];
        let recentPosts = httpGet(recentLogsDirectory);
        let jsonRecentLogs = JSON.parse(recentPosts);
        let recentPostsContent = getContentFromGithubFile(jsonRecentLogs);
        let recentPostsLines = recentPostsContent.split(/[\r\n]+/);


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