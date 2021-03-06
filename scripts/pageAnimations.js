/** Makes the nav disappear and appear when scrolling
 *
 */
(function($) {
    $(document).ready(function(){
        let compareResult = getPageName().localeCompare("contact.html");
        setTimeout(function() {
            if (compareResult !== 0) {
                $(window).scroll(function () {
                    if ($(this).scrollTop() > 10) {
                        $('#mainNav').fadeIn(500);
                    } else {
                        $('#mainNav').fadeOut(500);
                    }
                });
            }
            else {
                $('#mainNav').fadeIn(100);
            }

        }, 100);

    });
})(jQuery);

/** Smooth scroll to plot
 *
 */
function initScrollDownArrow() {
    $("#scrollDownAnchor").on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, "swing", function () {
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
}

function initReadyEvents() {
    initScrollDownArrow();
}