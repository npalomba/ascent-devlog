let commentsDirectory = "https://api.github.com/repos/npalomba/ascent-devlog/contents/_data/comments/{{ page.slug }}";

function loadComments() {
    let threadNumber = document.head.querySelector("[property~=commentThread][content]").content;
    threadNumber = threadNumber.replace(/'/g, "");
    let jsonStuff = httpGet(commentsDirectory);
    let commentContainer = document.getElementById("existingComments");

    jsonStuff = JSON.parse(jsonStuff);

    if (jsonStuff.length > 0) {
        let h2 = document.createElement("h2");
        h2.textContent = "Comments";
        commentContainer.appendChild(h2);
    }

    for (let i=0; i<jsonStuff.length; i++) {
        let object = jsonStuff[i];
        let staticManData = JSON.parse(httpGet(object["url"]));
        staticManData = atob(staticManData["content"]);

        let commentThreadNumber = getStaticmanField(staticManData, "thread:");
        commentThreadNumber = commentThreadNumber.replace(/'/g, "");

        alert(Number.parseInt(commentThreadNumber) + "," + Number.parseInt(threadNumber));

        if (Number.parseInt(commentThreadNumber) === Number.parseInt(threadNumber)) {
            let message = getStaticmanField(staticManData, "message:");
            let name = getStaticmanField(staticManData, "name:");
            let date = getStaticmanField(staticManData, "date:");

            let root = document.createElement("div");
            root.setAttribute("class", "comment");

            let commentName = document.createElement("span");
            let curdate = new Date(null);
            curdate.setTime(Number.parseInt(date) * 1000);

            commentName.setAttribute("class", "commentName");
            commentName.textContent = name + " commented on:";

            let commentDate = document.createElement("span");
            commentDate.setAttribute("class", "commentDate");
            commentDate.textContent =  curdate + ":";

            let commentContent = document.createElement("div");
            commentContent.setAttribute("class", "commentBody");
            commentContent.textContent = message;

            root.appendChild(commentName);
            root.appendChild(commentDate);
            root.appendChild(commentContent);

            commentContainer.appendChild(root);
        }
        else {
            alert("oh no");
        }
        /** TODO: scommenta questo
         *
         */
        //alert(getStaticmanField(staticManData, "message:"));
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

    for (let i=0; i<fields.length; i++) {
        if (fields[i].startsWith(field)) {
            let ret = fields[i].replace(field, "");
            ret.replace(/'/g, "");

            return ret;
        }
    }
}

/**
 <h2>Comments</h2>
 <div class = "comment">
 <span class = "commentName">Gianni commented on: </span>
 <span class = "commentDate">05/04/2000</span>
 <br><br>
 <div class = "commentBody">I think this is the normal comment length. Will you implement other stuff?</div>
 </div>

 <div class = "comment">
 <span class = "commentName">Gianni commented on: </span>
 <span class = "commentDate">05/04/2000</span>
 <br><br>
 <div class = "commentBody">I think this is the normal comment length. Will you implement other stuff?</div>
 </div>
 */