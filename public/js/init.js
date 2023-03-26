jQuery(document).ready(function ($) {
  var time = 380;
  setTimeout(function () {
    $("h1.responsive-headline").fitText(1, {
      minFontSize: "40px",
      maxFontSize: "80px",
    });

    $(".smoothscroll").on("click", function (e) {
      e.preventDefault();
      var target = this.hash,
        $target = $(target);

      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top,
          },
          800,
          "swing",
          function () {
            window.location.hash = target;
          }
        );
    });

    var sections = $("section");
    var navigation_links = $("#nav-wrap a");

    sections.waypoint({
      handler: function (event, direction) {
        var active_section;

        active_section = $(this);
        if (direction === "up")
          active_section = $(
            active_section.parent().prev()[0].querySelector("section") ||
              active_section.parent().prev()[0]
          );

        var active_link = $(
          '#nav-wrap a[href="#' + active_section.attr("id") + '"]'
        );

        navigation_links.parent().removeClass("current");
        active_link.parent().addClass("current");
      },
      offset: "35%",
    });

    $("#home").css({ height: $(window).height() });
    $(window).on("resize", function () {
      $("#home").css({ height: $(window).height() });
      $("body").css({ width: $(window).width() });
    });

    showOrHideNavOnScroll();
  }, time);

  function showOrHideNavOnScroll() {
    $(window).on("scroll", function () {
      var h = $("#home").height();
      var y = $(window).scrollTop();
      var nav = $("#nav-wrap");

      if (y < h * 0.2) {
        nav.removeClass("opaque").fadeIn("fast");
      } else {
        nav.addClass("opaque").fadeIn("fast");
      }
    });
  }
});
