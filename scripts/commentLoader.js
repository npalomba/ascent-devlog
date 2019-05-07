function loadComments() {
    let threadNumber = document.head.querySelector("[property~=commentThread][content]").content;

    $.ajax({
        url: "https://github.com/npalomba/ascent-devlog/tree/master/_data/comments/%7B%7B%20page.slug%20%7D%7D",
        crossDomain: true,
        dataType: "jsonp",
        success: function(data){
            $(data).find("a:contains(.yml)").each(function(){
                // will loop through
                var images = $(this).attr("href");

                alert("success" + images.toString());

            });
        },
        error: function(data) {
            alert("error" + data.toString());
        }
    });
}