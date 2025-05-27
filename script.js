$(document).ready(function() {

    // Hamburger menu functionality
    const menuBtn = $('.menu-btn'); // Select the hamburger button using jQuery
    const navElement = $('nav');    // Select the <nav> element using jQuery

    // Add a click event listener to the hamburger button
    if (menuBtn.length && navElement.length) { // Check if elements exist
        menuBtn.on('click', function() {
            // Toggle the 'active' class on the <nav> element
            // This class will control the sliding in/out of the menu via CSS
            navElement.toggleClass('active');
        });
    } else {
        console.error('Hamburger button or navigation element not found in the DOM.');
    }

    // Close the menu when a navigation link is clicked
    // This is useful for single-page portfolios to ensure the menu closes
    // after navigating to a section.
    $('nav ul li a').on('click', function() {
        // Check if the menu is currently active (i.e., on mobile)
        if (navElement.hasClass('active')) {
            navElement.removeClass('active');
        }
    });

    // Close the menu if the screen is resized from mobile to desktop
    // This prevents the mobile menu from staying open if the user resizes
    // from a small screen to a larger desktop view.
    $(window).on('resize', function() {
        // Assuming your mobile breakpoint is 768px (as per your CSS)
        if ($(window).width() > 768) {
            if (navElement.hasClass('active')) {
                navElement.removeClass('active');
            }
        }
    });


    // Your existing sticky header functionality
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1) {
            $(".header-area").addClass("sticky");
        } else {
            $(".header-area").removeClass("sticky");
        }

        // Update the active section in the header
        updateActiveSection();
    });

    // Your existing smooth scrolling for navigation links
    $(".header ul li a").click(function(e) {
        e.preventDefault();

        var target = $(this).attr("href");

        if ($(target).hasClass("active-section")) {
            return;
        }

        if (target === "#home") {
            $("html, body").animate(
                {
                    scrollTop: 0
                },
                500
            );
        } else {
            var offset = $(target).offset().top - 40;

            $("html, body").animate(
                {
                    scrollTop: offset
                },
                500
            );
        }

        $(".header ul li a").removeClass("active");
        $(this).addClass("active");
    });


    // Your existing ScrollReveal animations
    ScrollReveal({
        distance: "100px",
        duration: 2000,
        delay: 200
    });

    ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
        origin: "left"
    });
    ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
        origin: "right"
    });
    ScrollReveal().reveal(".project-title, .contact-title", {
        origin: "top"
    });
    ScrollReveal().reveal(".projects, .contact", {
        origin: "bottom"
    });

    // Your existing contact form to Google Sheet submission
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
    const form = document.forms['submitToGoogleSheet'] // Using native JS for form as it's already set up this way
    const msg = document.getElementById("msg") // Ensure you have an element with id="msg" for messages

    if (form) { // Check if the form element exists
        form.addEventListener('submit', e => {
            e.preventDefault()
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
                    if (msg) { // Check if msg element exists before updating
                        msg.innerHTML = "Message sent successfully"
                        setTimeout(function() {
                            msg.innerHTML = ""
                        }, 5000)
                    }
                    form.reset()
                })
                .catch(error => console.error('Error!', error.message))
        });
    } else {
        console.warn('Contact form with name "submitToGoogleSheet" not found. Form submission will not work.');
    }
});

// Your existing updateActiveSection function (outside $(document).ready() as it's global)
function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();

    // Checking if scroll position is at the top of the page
    if (scrollPosition === 0) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#home']").addClass("active");
        return;
    }

    // Iterate through each section and update the active class in the header
    $("section").each(function() {
        var target = $(this).attr("id");
        var offset = $(this).offset().top;
        var height = $(this).outerHeight();

        if (
            scrollPosition >= offset - 40 &&
            scrollPosition < offset + height - 40
        ) {
            $(".header ul li a").removeClass("active");
            $(".header ul li a[href='#" + target + "']").addClass("active");
        }
    });
}