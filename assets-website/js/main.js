!(function ($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $("#header").outerHeight() - 1;
  $(document).on(
    "click",
    ".nav-menu a, .mobile-nav a, .scrollto",
    function (e) {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        if (target.length) {
          e.preventDefault();

          var scrollto = target.offset().top - scrolltoOffset;

          if ($(this).attr("href") == "#header") {
            scrollto = 0;
          }

          $("html, body").animate(
            {
              scrollTop: scrollto,
            },
            1500,
            "easeInOutExpo"
          );

          if ($(this).parents(".nav-menu, .mobile-nav").length) {
            $(".nav-menu .active, .mobile-nav .active").removeClass("active");
            $(this).closest("li").addClass("active");
          }

          if ($("body").hasClass("mobile-nav-active")) {
            $("body").removeClass("mobile-nav-active");
            $(".mobile-nav-toggle i").toggleClass(
              "icofont-navigation-menu icofont-close"
            );
            $(".mobile-nav-overly").fadeOut();
          }
          return false;
        }
      }
    }
  );

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $("html, body").animate(
          {
            scrollTop: scrollto,
          },
          1500,
          "easeInOutExpo"
        );
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $("section");
  var main_nav = $(".nav-menu, .mobile-nav");

  $(window).on("scroll", function () {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find("li").removeClass("active");
        }
        main_nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .parent("li")
          .addClass("active");
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass("active");
      }
    });
  });

  // Mobile Navigation
  if ($(".nav-menu").length) {
    var $mobile_nav = $(".nav-menu").clone().prop({
      class: "mobile-nav d-lg-none",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>'
    );
    $("body").append('<div class="mobile-nav-overly"></div>');

    $(document).on("click", ".mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $(".mobile-nav-toggle i").toggleClass(
        "icofont-navigation-menu icofont-close"
      );
      $(".mobile-nav-overly").toggle();
    });

    $(document).on("click", ".mobile-nav .drop-down > a", function (e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass("active");
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass(
            "icofont-navigation-menu icofont-close"
          );
          $(".mobile-nav-overly").fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
    }
  });

  if ($(window).scrollTop() > 100) {
    $("#header").addClass("header-scrolled");
  }

  // Stick the header at top on scroll
  $("#header").sticky({
    topSpacing: 0,
    zIndex: "50",
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });

  $(".back-to-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500,
      "easeInOutExpo"
    );
    return false;
  });
  // Initiate the venobox plugin
  $(window).on("load", function () {
    $(".venobox").venobox();
  });

  // Clients carousel (uses the Owl Carousel library)
  $(".clients-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 4,
      },
      900: {
        items: 6,
      },
    },
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      900: {
        items: 2,
      },
    },
  });
  // main slider carousel (uses the Owl Carousel library)
  $(".hero-slider").owlCarousel({
    autoplay: true,
    dots: true,
    nav: true,
    loop: true,
    items: 1,
  });

  // R.K Code
  $(document).ready(function () {
    var heroSlider = $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 10,
      nav: false,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true, // Stops slider on hover
      items: 1,
    });

    // Optional: For additional control
    $(".owl-carousel").on("mouseover", function () {
      heroSlider.trigger("stop.owl.autoplay"); // Stop autoplay on mouse over
    });

    $(".owl-carousel").on("mouseleave", function () {
      heroSlider.trigger("play.owl.autoplay"); // Resume autoplay on mouse leave
    });
  });

  // contact from home

  $(document).ready(function () {
    $("#enquiry-form").on("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      console.log("this function waiting call");

      // Serialize form data
      const formData = {
        frmname: $("#frmname").val(),
        frmemail: $("#frmemail").val(),
        frmcourse: $("#frmcourse").val(),
        frmmobile: $("#frmmobile").val(),
        frmcomment: $("#frmcomment").val(),
      };

      console.log(formData);

      // Google Apps Script Web App URL
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbwI_20A668Ot0D5nwd-sP65puGIAD9fHC-yYQbKlSYy35xRguKo0XYQCf9YgdludoKn/exec";

      // AJAX request
      $.ajax({
        url: scriptURL,
        method: "POST",
        data: formData,
        success: function (response) {
          alert(`Form submitted successfully!`);
          $("#enquiry-form")[0].reset(); // Reset form after successful submission
        },
        error: function () {
          alert("Error in form submission. Please try again.");
        },
      });
    });
  });
  //

  //

  // Configuration
  // Configuration
  const apiKey = "AIzaSyA8YAtBYQoUhdNDCDwlDKRWYEGKLoV7mTc";
  const sheetId = "1PDjYMBaFE-B1Ve_b11RgPNQzyWZjxPoh-TubXRaluGU";
  const range = "RK_Google_Revice_Testimonial";

  // Fetch Google Reviews Data
  // Fetch Google Reviews Data
  async function fetchGoogle_revices() {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched Data:", data); // Check the data structure
      return data.values || [];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  // Create Carousel Items
  // Create Carousel Items
  function createCarouselItems(google_revices) {
    const carousel = $("#google-revice-carousel");
    carousel.empty(); // Clear any existing items to avoid duplication

    // If no data or insufficient rows
    if (google_revices.length <= 1) {
      carousel.append(`
        
            <div class="item">
                <h3 class="testimonial-text">No reviews available at the moment.</h3>
                <div class="author-info">
                    <div class="author-text">
                        <strong>Anonymous</strong>
                    </div>
                </div>
            </div>
        `);
      return;
    }

    // Append each testimonial as an item
    google_revices.slice(1).forEach((testimonial) => {
      const fullText = testimonial[0] || "No testimonial text available.";
      const authorName = testimonial[1] || "Anonymous";
      const authorImage =
        testimonial[2] ||
        "https://www.thecore.in/h-upload/2024/09/20/980429-coreiconwhite.png";
      const authorPosition = testimonial[3] || "";
      const StarRating = testimonial[4] || "";
      const item = `
            <div class="item">
            <div class="testimonial-card">
               
                <div class="author-info">
                    <div class="author-text">
                      <div class="author-img">
                        <img src="${authorImage}" alt="${authorName}">
                      </div>
                        <strong>${authorName}</strong><br>
                        ${
                          authorPosition
                            ? `<span> ${authorPosition}</span>`
                            : ""
                        }
                    </div>
                    
                    <div class="quote"><img src=" ./assets-website/img/social-icon/google.png" alt="Quote"></div>
                </div>
                <div class="star-rating-icon"> ${StarRating}</div>
 <h3 class="testimonial-text">${fullText}</h3>

            </div>
        `;
      carousel.append(item); // Append item to the carousel container
    });
  }

  // Initialize Carousel
  $(document).ready(function () {
    fetchGoogle_revices().then((google_revices) => {
      createCarouselItems(google_revices);

      // Destroy any existing carousel (if already initialized)
      const carousel = $("#google-revice-carousel");
      if (carousel.hasClass("owl-loaded")) {
        carousel.trigger("destroy.owl.carousel");
        carousel.removeClass("owl-loaded");
        carousel.find(".owl-stage-outer").children().unwrap(); // Remove leftover wrappers
      }

      // Reinitialize the carousel
      carousel.owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        nav: true,
        navText: [
          "<i class='fas fa-chevron-left'></i>",
          "<i class='fas fa-chevron-right'></i>",
        ],
        dots: true,
        responsive: {
          0: { items: 1 },
          600: { items: 2 },
          1000: { items: 3 },
        },
      });
    });
  });

  //

  // Porfolio isotope and filter
  $(window).on("load", function () {
    var portfolioIsotope = $(".portfolio-container").isotope({
      itemSelector: ".portfolio-item",
      layoutMode: "fitRows",
    });

    $("#portfolio-flters li").on("click", function () {
      $("#portfolio-flters li").removeClass("filter-active");
      $(this).addClass("filter-active");

      portfolioIsotope.isotope({
        filter: $(this).data("filter"),
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function () {
      $(".venobox").venobox();
    });
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1,
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out-back",
      once: true,
    });
  }
  $(window).on("load", function () {
    aos_init();
  });

  // counter

  var a = 0;
  $(window).scroll(function () {
    var oTop = $("#counter-wrap").offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() > oTop) {
      $(".counter-value").each(function () {
        var $this = $(this),
          countTo = $this.attr("data-count");
        $({
          countNum: $this.text(),
        }).animate(
          {
            countNum: countTo,
          },

          {
            duration: 2000,
            easing: "swing",
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
              //alert('finished');
            },
          }
        );
      });
      a = 1;
    }
  });
})(jQuery);
