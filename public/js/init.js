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
        if (direction === "up") active_section = active_section.prev();

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

    $("#contactForm").on("click", "button.submit", function () {
      const $submitButton = $(this);

      $submitButton.attr("disabled", "disabled");

      $("#message-warning").hide();
      $("#image-loader").fadeIn();

      var name = $("#contactForm #contactName").val();
      var email = $("#contactForm #contactEmail").val();
      var message = $("#contactForm #contactMessage").val();

      var data = "name=" + name + "&email=" + email + "&message=" + message;

      $.ajax({
        type: "POST",
        url: "/api/chat",
        data: data,
        success: function (data) {
          $("#image-loader").fadeOut();
          $("#contactForm").fadeOut(250);

          setTimeout(() => {
            // $("#contactForm")[0].reset();
            $("#message-success").fadeIn();
          }, 250);

          // setTimeout(() => {
          //   $("#message-success").fadeOut(250);

          //   setTimeout(() => {
          //     $("#contactForm").fadeIn();
          //   }, 250);
          // }, 3000);
        },
        error: function (err) {
          const errorMessage =
            err?.responseText || "A server error has occurred";

          $("#image-loader").fadeOut();
          $("#message-warning").html(errorMessage);
          $("#message-warning").fadeIn();

          // setTimeout(() => {
          //   $("#message-warning").fadeOut();
          // }, 3000);
        },
        complete: function (err) {
          $submitButton.removeAttr("disabled");
        },
      });
      return false;
    });
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
