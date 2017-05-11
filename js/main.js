(function () {

  "use strict";

  // Variables
  // =========================================================================================
  var $html = $('html'),
    $document = $(document),
    $window = $(window),
    i = 0;


  // Scripts initialize
  // ===================

  document.write('<script async defer src="//maps.googleapis.com/maps/api/js?key=AIzaSyAeribzjcm4nCAAwNxm4VfXjajdJZUCMw0" type="text/javascript"></script>');

  $window.on('load', function () {

    // =================================================================================
    // Preloader
    // =================================================================================
    var $preloader = $('#page-preloader');
    $preloader.delay(500).addClass('hid');

    // =================================================================================
    // WOW
    // =================================================================================
    new WOW().init();

    // =================================================================================
    // Google Map
    // =================================================================================
    var map = $(".map");
    if (map.length) {
      var mapWrapper = $('#google-map'),
        latlng = new google.maps.LatLng(mapWrapper.data("x-coord"), mapWrapper.data("y-coord"));
      if ($("body").hasClass("dark")) {
        var styles = [
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
              { "hue": "#ff1a00" },
              { "invert_lightness": true },
              { "saturation": -100 },
              { "lightness": 33 },
              { "gamma": 0.5 },

            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
              { "visibility": "on" },
              { "color": "#000000" },
              { "lightness": 16 }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
              { "visibility": "off" }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
              { "color": "#000000" },
              { "lightness": 20 }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
              { "color": "#000000" },
              { "lightness": 17 },
              { "weight": 1.2 }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
              { "color": "#222222" },
              { "lightness": 20 }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              { "color": "#000000" },
              { "lightness": 21 }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
              { "color": "#000000" },
              { "lightness": 17 }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              { "color": "#000000" },
              { "lightness": 29 },
              { "weight": 0.2 }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              { "color": "#000000" },
              { "lightness": 18 }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
              { "color": "#000000" },
              { "lightness": 16 }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
              { "color": "#000000" },
              { "lightness": 19 }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              { "color": "#000000" },
              { "lightness": 17 }
            ]
          }
        ];
      } else {
        var styles = [
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              { "color": "#e9e9e9" },
              { "lightness": 17 }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
              { "color": "#f5f5f5" },
              { "lightness": 20 }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
              { "color": "#ffffff" },
              { "lightness": 17 }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              { "color": "#ffffff" },
              { "lightness": 29 },
              { "weight": 0.2 }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              { "color": "#ffffff" },
              { "lightness": 18 }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
              { "color": "#ffffff" },
              { "lightness": 16 }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              { "color": "#f5f5f5" },
              { "lightness": 21 }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              { "color": "#dedede" },
              { "lightness": 21 }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              { "visibility": "on" },
              { "color": "#ffffff" },
              { "lightness": 16 }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              { "saturation": 36 },
              { "color": "#333333" },
              { "lightness": 40 }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              { "visibility": "off" }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
              { "color": "#f2f2f2" },
              { "lightness": 19 }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
              { "color": "#fefefe" },
              { "lightness": 20 }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
              { "color": "#fefefe" },
              { "lightness": 17 },
              { "weight": 1.2 }
            ]
          }
        ];
      }

      var myOptions = {
        scrollwheel: false,
        zoom: 10,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false,
        styles: styles
      },
        map = new google.maps.Map(mapWrapper[0], myOptions),
        marker = new google.maps.Marker({
          position: { lat: mapWrapper.data("x-coord"), lng: mapWrapper.data("y-coord") },
          draggable: false,
          animation: false,
          map: map,
          icon: 'img/marker.png'
        }),
        infowindow = new google.maps.InfoWindow({
          content: mapWrapper.data("text")
        });

      marker.addListener('click', function () {
        infowindow.open(map, marker);
      });
    }
  });


  $document.ready(function () {

    // =================================================================================
    // Contact Form
    // =================================================================================
    var contactForm = $(".contact-form");
    if (contactForm.length) {
      var contactResault = $("body").append("<span class='form-resault'></span>").find(".form-resault");
      contactForm.each(function () {
        var this_form = $(this);
        var contactFormInput = this_form.find(".form-control.required");

        contactFormInput.on("blur", function () {
          if (!$.trim($(this).val())) {
            $(this).parent().addClass("input-error");
          }
        });

        contactFormInput.on("focus", function () {
          $(this).parent().removeClass("input-error");
        });

        this_form.on("submit", function () {
          var form_data1 = $(this).serialize();
          if (!contactFormInput.parent().hasClass("input-error") && contactFormInput.val()) {
            // $.ajax({
            //   type: "POST", 
            //   url: "php/contact.php", 
            //   data: form_data1,
            //   success: function() {
            //     contactResault.addClass("correct");
            //     contactResault.html("Your data has been sent!");
            //     setTimeout(function(){
            //       contactResault.removeClass("incorrect").removeClass("correct");
            //     }, 4500);
            //   }
            // });
            this_form.submit();
          } else {
            if (contactFormInput.val() === "") {
              var contactFormInputEmpty = contactFormInput.filter(function () {
                return $(this).val() === "";
              });
              contactFormInputEmpty.parent().addClass("input-error");
            }
            contactResault.addClass("incorrect");
            contactResault.html("You must fill in all required fields");
            setTimeout(function () {
              contactResault.removeClass("incorrect").removeClass("correct");
            }, 4500);
          }
          return false;
        });
      });
    }

    // =================================================================================
    // Fancybox
    // =================================================================================
    var fancybox = $(".fancybox");
    if (fancybox.length) {
      fancybox.fancybox({
        openEffect: 'fade',
        closeEffect: 'fade'
      });
    }
    var fancybox_media = $('.fancybox-media');
    if (fancybox_media.length) {
      fancybox_media.fancybox({
        openEffect: 'fade',
        closeEffect: 'fade',
        helpers: {
          media: {}
        }
      });
    }

    // =================================================================================
    // Responsive Nav
    // =================================================================================
    var responsiveNav = new Navigation({
      init: true,
      stuck: true,
      responsive: true,
      breakpoint: 992, // don't forget to change in css as well
    });

    // =================================================================================
    // Parallax Blocks
    // =================================================================================
    var parallax_block = $(".js-parallax-block");
    var parallaxBlock = function () {
      parallax_block.each(function () {
        if ($window.width() >= 1200) {
          var it = $(this);
          var elem_parent = it.parent();
          var elem_speed = it.attr("data-multiplier");
          var elem_pos = it.attr("data-pos");

          var ot = elem_parent.offset().top * elem_speed;
          var st = $window.scrollTop() * elem_speed;

          var a = elem_pos - (elem_pos - st) * 0.08;
          var b = ot - a;
          it.css({
            transform: "translate3d(0px, " + b + "px, 0px)"
          });
          it.attr("data-pos", a);
        } else {
          $(this).css({
            transform: "translate3d(0px, 0px, 0px)"
          });
        }
      });
      window.requestAnimationFrame(parallaxBlock);
    };
    if (parallax_block.length) {
      parallaxBlock();
    }

    // =================================================================================
    // UIToTop
    // =================================================================================
    $().UItoTop();

    // =================================================================================
    // Owl carousel
    // =================================================================================
    var slider_1 = $('.slider_1');
    if (slider_1.length) {
      slider_1.owlCarousel({
        mouseDrag: true,
        nav: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3500,
        autoplaySpeed: 2000,
        dots: false,
        items: 3,
        margin: 30,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
          0: { items: 1, },
          480: { items: 1, },
          768: { items: 2, },
        }
      });
    }
    var slider_2 = $('.slider_2');
    if (slider_2.length) {
      slider_2.owlCarousel({
        mouseDrag: true,
        nav: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplaySpeed: 1500,
        autoplayHoverPause: true,
        dots: false,
        items: 5,
        margin: 30,
        responsiveClass: true,
        responsive: {
          0: { items: 1 },
          480: { items: 2 },
          768: { items: 3 },
          992: { items: 5 },
        }
      });
    }
    var slider_3 = $('.slider_3');
    if (slider_3.length) {
      slider_3.owlCarousel({
        mouseDrag: true,
        nav: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplaySpeed: 1500,
        autoplayHoverPause: true,
        dots: true,
        items: 3,
        margin: 30,
        responsiveClass: true,
        responsive: {
          0: { items: 1 },
          480: { items: 1 },
          768: { items: 2 },
          992: { items: 3 },
        }
      });
    }

    // =================================================================================
    // Style Switcher
    // =================================================================================
    var switcher = $("#style-switcher");
    var switcher_toggle = switcher.find(".toggle-switcher");
    if (switcher.length) {
      var body = $("body");

      //switcher toggle
      switcher_toggle.on("click", function (e) {
        e.preventDefault();
        switcher.toggleClass("active");
      });

      //color toggle
      var color_stylesheet = $("#colors");
      var color_link = $("#style-switcher .colors > li > a");
      color_link.each(function () {
        var it = $(this);
        it.on("click", function () {
          var color_src = it.attr("data-color-src");
          color_stylesheet.attr("href", color_src);
          return false;
        });
      });

    };

    // =================================================================================
    // Progress Bar
    // =================================================================================
    var progressBar = $(".progress-bar");
    if (progressBar.length) {
      $(document).on("scroll", function () {
        progressBar.not('.scrolled').each(function () {
          var position = $(this).offset().top;
          var item_offset = $window.scrollTop() + $window.height();
          if (item_offset > position) {
            var item = $(this);
            var start = item.attr("data-valuemin");
            var end = item.attr("data-valuenow");
            item.css({ width: end + '%' });
            item.parent().find('.progress-bar-counter')
              .removeClass("hide")
              .counter({
                start: start,
                end: end,
                time: 0.7,
                step: 50
              });
            item.addClass('scrolled');
          }
        });
      }).trigger("scroll");
    }

    // =================================================================================
    // Circular Progress Bars
    // =================================================================================
    var proBar = $(".progr-bar");
    if (proBar.length) {
      proBar.each(function () {
        var Bar = this;
        var pBar = $(this).attr("data-percent") * 0.01;
        var circle = new ProgressBar.Circle(Bar, {
          strokeWidth: 5,
          trailWidth: 5,
          easing: 'easeInOut',
          duration: 1400,
          text: {
            autoStyleContainer: false
          },
          from: { width: 1 },
          to: { width: 5 },
          // Set default step function for all animate calls
          step: function (state, circle) {
            circle.path.setAttribute('stroke-width', 5);
            var value = Math.round(circle.value() * 100);
            if (value === 0) {
              circle.setText('');
            } else {
              circle.setText(value + '%');
            }
          }
        });
        var doOnce;
        $window.on("scroll", function () {
          var Bar_offset = proBar.offset().top;
          var win_offset = $window.height() + $window.scrollTop();
          if (win_offset >= Bar_offset && !doOnce) {
            doOnce = true;
            circle.animate(pBar);
          }
        });
        $window.trigger("scroll");
      });
    }

    // =================================================================================
    // ISOTOPE
    // =================================================================================
    var isotope = $('.iso');
    // debounce so filtering doesn't happen every millisecond
    function debounce(fn, threshold) {
      if (isotope.length) {
        var timeout;
        return function debounced() {
          if (timeout) {
            clearTimeout(timeout);
          }
          function delayed() {
            fn();
            timeout = null;
          }
          timeout = setTimeout(delayed, threshold || 100);
        }
      }
    }
    if (isotope.length) {
      $(function () {
        var $grid = $('.grid').isotope({
          itemSelector: 'article'
        });
        // filter buttons
        $('.filters-button-group').on('click', 'button', function () {
          var filterValue = $(this).attr('data-filter');
          $grid.isotope({ filter: filterValue });
          $window.trigger("resize");
        });
        $('.button-group').each(function (i, buttonGroup) {
          var $buttonGroup = $(buttonGroup);
          $buttonGroup.on('click', 'button', function () {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
          });
        });
      });

      $window.on("load", function () {
        $('.iso .button-group button.is-checked').trigger("click");
      });
    }


    $('.img-container').directionalHover({
      overlay: "img-panel",
      easing: "swing",
      speed: 200
    });



  });

})();