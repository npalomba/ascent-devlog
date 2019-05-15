let recentLogsDirectory = "https://api.github.com/repos/npalomba/ascent-devlog/contents/recentLogs.txt";
let logsDirectory = "https://api.github.com/repos/npalomba/ascent-devlog/contents/allLogs";

function setupSite() {
    if (typeof(commentLoaderLoaded) !== "undefined") {
        loadComments();
    }
    addTopNav();
    setupSideNav();
    addLogs();
    setupParticles();
    initReadyEvents();
    addSocialThumbnails();
}

function addTopNav() {
    let navRaw = getContentFromGithubFile(JSON.parse(httpGet("https://api.github.com/repos/npalomba/ascent-devlog/contents/nav.html")));
    let toAppendTo = document.getElementById("body");
    console.log("Adding nav");
    toAppendTo.innerHTML = navRaw + toAppendTo.innerHTML;
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
                let url = "logs/" + logParams[3];

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
                let link = document.createElement("a");
                let titleLink = document.createElement("a");
                titleLink.setAttribute("href", url);
                titleLink.appendChild(h2);
                link.setAttribute("href", url);
                link.innerText = "(read more)";
                span.appendChild(link);

                /* Building the div */
                logDiv.appendChild(img);
                logDiv.appendChild(logContent);
                logContent.appendChild(titleLink);
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
            let url = "logs/" + postFields[0] + ".html";
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

function setupParticles() {
    if (getPageName() === "index.html") {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 355,
                    "density": {
                        "enable": true,
                        "value_area": 789.1476416322727
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.48927153781200905,
                    "random": false,
                    "anim": {
                        "enable": true,
                        "speed": 0.2,
                        "opacity_min": 0,
                        "sync": false
                    }
                },
                "size": {
                    "value": 2,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": false,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 0.2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 83.91608391608392,
                        "size": 1,
                        "duration": 3,
                        "opacity": 1,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
}
