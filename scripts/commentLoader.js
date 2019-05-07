let commentsDirectory = "https://api.github.com/repos/npalomba/ascent-devlog/contents/_data/comments/{{ page.slug }}";

function loadComments() {
    let threadNumber = document.head.querySelector("[property~=commentThread][content]").content;
    let jsonStuff = httpGet(commentsDirectory);

    jsonStuff = JSON.parse(jsonStuff);

    for (let i=0; i<jsonStuff.length; i++) {
        let object = jsonStuff[i];
        let staticManData = JSON.parse(httpGet(object["url"]));
        staticManData = atob(staticManData["content"]);

        alert(getStaticmanField(staticManData, "thread:"));
    }
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function getStaticmanField(message, field) {
    let fields = message.split("\n");

    alert(fields);
    for (let i=0; i<fields.length; i++) {
        if (fields[i].startsWith(field)) {
            let ret = fields[i].replace(field, "");
            ret = ret.replace(/'/g, "");

            return ret;
        }
    }

    return "AAAA";
}