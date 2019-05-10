function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function getContentFromGithubFile(file) {
    return atob(file["content"]);
}

function getPageName() {
    let path = window.location.pathname;
    let page = path.split("/").pop();

    return page;
}

function getPath() {
    return window.location.pathname;
}