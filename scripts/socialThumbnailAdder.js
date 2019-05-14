function addSocialThumbnails() {
    let path = getPath();
    let pageName = getPageName();
    let head = document.getElementsByTagName("head")[0];
    let facebook = document.createElement("META");
    let twitter = document.createElement("META");
    let imgURL;

    if (!path.includes("logs")) {
        imgURL = "https://unsettledgames.github.io/ascent-devlog/imgs/portrait.png";
    }
    else {
        let logsContent = getContentFromGithubFile(JSON.parse(httpGet("https://api.github.com/repos/npalomba/ascent-devlog/contents/allLogs")));
        let lines = logsContent.split(/[\r\n]+/);

        for (let i=0; i<lines.length; i++) {
            if (lines[0].includes(pageName)) {
                imgURL = lines[0].split(/\|/g);
            }
        }
    }


    facebook.setAttribute("property", "og:image");
    facebook.setAttribute("content", imgURL);

    twitter.setAttribute("name", "twitter:card");
    twitter.setAttribute("content", imgURL);

    head.appendChild(facebook);
    head.appendChild(twitter);
}