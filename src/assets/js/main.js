(function ($) {
    "use strict";
    var wWidth = $(window).width();
    var wHight = $(window).height(),
        bannerSlider = $('#banner_slider1');
    if (wWidth < 991) {
        if (bannerSlider.length) {
            bannerSlider.camera({
                height: 595 + 'px',
                loader: false,
                navigation: true,
                autoPlay: false,
                fx: 'scrollLeft',
                time: 4000,
                overlayer: true,
                playPause: false,
                pagination: false,
                thumbnails: false,
                onEndTransition: function () {
                    $('.cameraSlide img').addClass('grow');
                }
            });
        }
    }
    if (wWidth >= 991) {
        if (bannerSlider.length) {
            bannerSlider.camera({
                height: 850 + 'px',
                loader: false,
                navigation: true,
                autoPlay: false,
                fx: 'scrollLeft',
                time: 4000,
                overlayer: true,
                playPause: false,
                pagination: false,
                thumbnails: false,
                onEndTransition: function () {
                    $('.cameraSlide img').addClass('grow');
                }
            });
        }
    }
    var bannerSlider2 = $('#banner_slider2');
    if (wWidth < 768) {
        if (bannerSlider2.length) {
            bannerSlider2.camera({
                height: 600 + 'px',
                loader: false,
                navigation: true,
                autoPlay: false,
                fx: 'scrollLeft',
                time: 4000,
                overlayer: true,
                playPause: false,
                pagination: false,
                thumbnails: false,
            });
        }
    }
    if (wWidth >= 768) {
        if (bannerSlider2.length) {
            bannerSlider2.camera({
                height: 850 + 'px',
                loader: false,
                navigation: true,
                autoPlay: false,
                fx: 'scrollLeft',
                time: 4000,
                overlayer: true,
                playPause: false,
                pagination: false,
                thumbnails: false,
            });
        }
    }
    $('.overview_img').on('mouseenter', function () {
        $(this).css({
            "z-index": "10",
            "opacity": "1",
            "transform": "scale(1.02)"
        });
        $(this).siblings().css({
            "z-index": "0",
            "opacity": ".2",
            "transform": "scale(1)"
        });
    }).on('mouseleave', function () {
        $(this).css({
            "z-index": "1",
            "opacity": "1",
            "transform": "scale(1)"
        });
        $(this).siblings().css({
            "z-index": "1",
            "opacity": "1",
            "transform": "scale(1)"
        });
    });
    $('.room-carousel-type1').owlCarousel({
        loop: true,
        dots: true,
        nav: false,
        autoplay: false,
        margin: 20,
        stagePadding: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
        }
    });
    $(".video_btn").on("click", function () {
        videoControl("playVideo");
        $(".bg_holder").hide();
        $('.video_container .overlay').hide();
        $(this).hide();
    });

    function videoControl(action) {
        var $playerWindow = $('.frame_video')[0].contentWindow;
        $playerWindow.postMessage('{"event":"command","func":"' + action + '","args":""}', '*');
    }
    $('.counter').counterUp({
        delay: 50,
        time: 1000
    });
    $('.testimonial-carousel').owlCarousel({
        loop: true,
        items: 1,
        dots: true,
        responsiveClass: true,
        items: 1,
        nav: false,
        autoplay: true,
    });
    $('.restaurant_menu_image').venobox();
    $(function () {
        $(".datepicker").datepicker();
    });
    $('.scroll_top').fadeOut();
    var docInHeight = $(document).height(),
        wHeight = $(window).height(),
        docUsableHeight = (docInHeight - wHeight) - 1500;
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > docUsableHeight) {
            $('.scroll_top').fadeIn();
        } else {
            $('.scroll_top').fadeOut();
        }
    });
    $(document).on('on', function () {
        $('.datepicker').on('click', function () {
            if ($('#ui-datepicker-div:visible').length != 0) {
                $('.navbar-fixed').css({
                    "z-index": "5"
                });
            } else {
                $('.navbar-fixed').css({
                    "z-index": "999"
                });
            }
        }).on('mouseleave', function () {
            $('.navbar-fixed').css({
                "z-index": "999"
            });
        });
        $('#ui-datepicker-div').on('mouseleave', function () {
            $('.navbar-fixed').css({
                "z-index": "999"
            });
        }).on('mouseenter', function () {
            $('.navbar-fixed').css({
                "z-index": "5"
            });
        });
    });
    $(window).on('load', function () {
        $('#carousel').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            itemWidth: 210,
            itemMargin: 5,
            asNavFor: '#slider'
        });
        $('#slider').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            sync: "#carousel"
        });
        $('.gallery_item1').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-item'
            }
        });
        $('.filter li').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active');
            var filterValue = $(this).attr('data-filter');
            $('.grid').isotope({
                filter: filterValue
            });
        });
    });
    // var googleMapSelector = $('#google-map'),
    //     myCenter = new google.maps.LatLng(40.789886, -74.056700);

    // function initialize() {
    //     var mapProp = {
    //         center: myCenter,
    //         zoom: 15,
    //         scrollwheel: false,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP,
    //         styles: [{
    //             "featureType": "administrative",
    //             "elementType": "labels.text.fill",
    //             "stylers": [{
    //                 "color": "#444444"
    //             }]
    //         }, {
    //             "featureType": "landscape",
    //             "elementType": "all",
    //             "stylers": [{
    //                 "color": "#f2f2f2"
    //             }]
    //         }, {
    //             "featureType": "poi",
    //             "elementType": "all",
    //             "stylers": [{
    //                 "visibility": "off"
    //             }]
    //         }, {
    //             "featureType": "road",
    //             "elementType": "all",
    //             "stylers": [{
    //                 "saturation": -100
    //             }, {
    //                 "lightness": 45
    //             }]
    //         }, {
    //             "featureType": "road.highway",
    //             "elementType": "all",
    //             "stylers": [{
    //                 "visibility": "simplified"
    //             }]
    //         }, {
    //             "featureType": "road.arterial",
    //             "elementType": "labels.icon",
    //             "stylers": [{
    //                 "visibility": "off"
    //             }]
    //         }, {
    //             "featureType": "transit",
    //             "elementType": "all",
    //             "stylers": [{
    //                 "visibility": "off"
    //             }]
    //         }, {
    //             "featureType": "water",
    //             "elementType": "all",
    //             "stylers": [{
    //                 "color": "#46bcec"
    //             }, {
    //                 "visibility": "on"
    //             }]
    //         }, {
    //             "featureType": "water",
    //             "elementType": "geometry.fill",
    //             "stylers": [{
    //                 "color": "#c8d7d4"
    //             }]
    //         }, {
    //             "featureType": "water",
    //             "elementType": "geometry.stroke",
    //             "stylers": [{
    //                 "color": "#ff0000"
    //             }]
    //         }]
    //     };
    //     var map = new google.maps.Map(document.getElementById("google-map"), mapProp);
    //     var marker = new google.maps.Marker({
    //         position: myCenter,
    //         animation: google.maps.Animation.BOUNCE,
    //     });
    //     marker.setMap(map);
    // }
    // if (googleMapSelector.length) {
    //     google.maps.event.addDomListener(window, 'load', initialize);
    // }
})(jQuery);