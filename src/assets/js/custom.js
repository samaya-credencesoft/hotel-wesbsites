/* ----------------- Start JS Document ----------------- */
(function($) {
    "use strict";

    $(document).ready(function() {

        // Our client
        var maping_slider = $(".maping-slider");
        maping_slider.owlCarousel({
            items: 4,
            nav: true,
            dots: false,
            autoplay: false,
            mouseDrag: false,
            loop: true,
            slideBy: 4,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 4,
                    slideBy: 4
                },
                768: {
                    items: 4,
                }
            },
            navText: ['<i class="fas fa-plus"></i>', '<i class="fas fa-plus"></i>']
        });

        $('a[data-toggle="tab"]').on('shown.bs.tab', function(event) {
            $(this).closest('.maping-slider').find('.active-me').removeClass('active-me');
            $(event.target).addClass('active-me');
        });


        // About
        var about = $(".about");
        about.owlCarousel({
            items: 1,
            nav: false,
            dots: false,
            autoplay: true,
            loop: true
        });

        // Our client
        var guideSlider = $(".guide-slider");
        guideSlider.owlCarousel({
            items: 4,
            nav: false,
            dots: true,
            autoplay: true,
            margin: 30,
            autoplaySpeed: 1000,
            smartSpeed: 100,
            loop: false,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                500: {
                    items: 2,
                },
                1000: {
                    items: 4,
                    loop: true
                }


            },
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>']
        });


        // Our client
        var client_says = $(".client-says-slider");
        client_says.owlCarousel({
            items: 1,
            autoplay: true,
            center: true,
            loop: true,
            autoplayHoverPause: true,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>']
        });


        // Our client
        var ourClient = $(".client-slider");
        ourClient.owlCarousel({
            items: 3,
            nav: false,
            dots: false,
            autoplay: true,
            center: true,
            loop: true,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 3,
                    nav: false
                },
                768: {
                    items: 5,
                }

            },
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>']
        });


        /* Animated skills Bars */
        function DemoProgressbars() {

            var prog;

            $('.bar-progres').each(function() {
                prog = $(this);
                prog.LineProgressbar({
                    percentage: prog.data('percent'),
                    fillBackgroundColor: prog.data('color'),
                    duration: 2500
                });
            });

        }

        $('.progressbar-start').waypoint(function() {
            DemoProgressbars();
        }, {
            offset: '100%',
            triggerOnce: true
        });


        // Video Popup
        $(".various").fancybox({
            maxWidth: 800,
            maxHeight: 600,
            fitToView: false,
            width: '70%',
            height: '70%',
            autoSize: false,
            closeClick: false,
            openEffect: 'none',
            closeEffect: 'none'
        });

        $("[data-fancybox]").fancybox({
            // Options will go here
            toolbar: true,
            animationEffect: "zoom-in-out",
            transitionEffect: "circular",
            thumbs: {
                autoStart: false, // Display thumbnails on opening
                hideOnClose: true, // Hide thumbnail grid when closing animation starts
                parentEl: '.fancybox-container', // Container is injected into this element
                axis: 'y' // Vertical (y) or horizontal (x) scrolling
            },
            buttons: [
                'slideShow',
                'fullScreen',
                'thumbs',
                'close'
            ],

        });

        /* Init Counterup */
        $('.counter').counterUp({
            delay: 4,
            time: 1000
        });

        // carousel to mobile touchable
        $('.carousel').each(function() {
            var el = $(this);
            el.swiperight(function() {
                el.carousel('prev');
            });
            el.swipeleft(function() {
                el.carousel('next');
            });
        });


        // Slick Slider || Testimonial
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            dots: false,
            centerPadding: 0,
            asNavFor: '.slider-nav'
        });

        $('.slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            arrows: true,
            infinite: true,
            centerMode: true,
            centerPadding: 0,
            focusOnSelect: true,
            centerMode: true,
            centerPadding: '60px',
            speed: 200,

            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }]
        });


        //Slick Nav 
        $('.wpb-mobile-menu').slicknav({
            prependTo: '.navbar-header',
            parentTag: 'margo',
            allowParentLinks: true,
            duplicate: false,
            label: '',
            closedSymbol: '<i class="fa fa-plus"></i>',
            openedSymbol: '<i class="fa fa-minus"></i>'
        });


        // Menu Area Start
        $('.toggle-inner').on('click', function(e) {
            e.preventDefault();
            $('body').toggleClass('going');
            $('.close-menu').on('click', function() {
                $('body').removeClass('going');
            });
            $('.close-menu-onclick').on('click', function() {
                $('body').removeClass('going');
            });
        });

        var Concertina = function(el, multiple) {
            this.el = el || {};

            this.multiple = multiple || false;

            var dropdown_here = this.el.find('.dropdown-here');
            dropdown_here.on('click', {
                    el: this.el,
                    multiple: this.multiple
                },
                this.dropdown);
        };

        Concertina.prototype.dropdown = function(e) {
            e.preventDefault();
            var $el = e.data.el,
                $this = $(this),

                $next = $this.next();

            $next.slideToggle();
            $this.parent().toggleClass('open');

            if (!e.data.multiple) {
                //show only one menu at the same time
                $el.find('.submenuItems').not($next).slideUp().parent().removeClass('open');
            }
        }
        var accordion = new Concertina($('.slide-menu'), false);
        // Menu Area End

        // Date Choose
        $(function() {
            $('.date-choose').datetimepicker({
                daysOfWeekDisabled: [],
                format: 'DD/MMM/YY'
            });
        });

        $(function () {
            $('.date-choose-placehold input').val('');
        });

        // Rate Yo!
        $(".rateUs").rateYo({
            rating: 3.6
        });



        /*
        ----------------------------------------
        Select Dropdown Filtering
        -----------------------------------------
        */
        // Range sliders initialization
        $(".range-slider-ui").each(function() {
            var minRangeValue = $(this).attr('data-min');
            var maxRangeValue = $(this).attr('data-max');
            var minName = $(this).attr('data-min-name');
            var maxName = $(this).attr('data-max-name');
            var unit = $(this).attr('data-unit');

            $(this).append("" +
                "<span class='min-value'></span> " +
                "<span class='max-value'></span>" +
                "<input class='current-min' type='hidden' name='" + minName + "'>" +
                "<input class='current-max' type='hidden' name='" + maxName + "'>"
            );
            $(this).slider({
                range: true,
                min: minRangeValue,
                max: maxRangeValue,
                values: [minRangeValue, maxRangeValue],
                slide: function(event, ui) {
                    event = event;
                    var currentMin = parseInt(ui.values[0], 10);
                    var currentMax = parseFloat(ui.values[1]);
                    $(this).children(".min-value").text(unit + " " + currentMin);
                    $(this).children(".max-value").text(unit + " " + currentMax);
                    $(this).children(".current-min").val(currentMin);
                    $(this).children(".current-max").val(currentMax);
                }
            });

            var currentMin = parseInt($(this).slider("values", 0), 10);
            var currentMax = parseFloat($(this).slider("values", 1));
            $(this).children(".min-value").text(unit + " " + currentMin);
            $(this).children(".max-value").text(unit + " " + currentMax);
            $(this).children(".current-min").val(currentMin);
            $(this).children(".current-max").val(currentMax);
        });


    }); //$(document).ready



    //Back Top Link

    var offset = 200;
    var duration = 500;
    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
            $('.back-to-top').fadeIn(400);
        } else {
            $('.back-to-top').fadeOut(400);
        }
    });

    $('.back-to-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 600);
        return false;
    });


    /*
    ----------------------------------------
    Select Dropdown Filtering
    -----------------------------------------
    */
    // init Isotope
    var $container = $('.catGrid');
    var PageLoadFilter = '.cat1';
    $container.isotope({
        filter: PageLoadFilter
    });

    var $catGrid = $('.catGrid').isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows',
    });
    // bind filter on select change
    $('.filters-select').on('change', function() {
        // get filter value from option value
        var filterValue = this.value;
        $catGrid.isotope({
            filter: filterValue
        });
    });

    // filter functions
    var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function() {
            var number = $(this).find('.number').text();
            return parseInt(number, 10) > 50;
        },
        // show if name ends with -ium
        ium: function() {
            var name = $(this).find('.name').text();
            return name.match(/ium$/);
        }
    };

    /*
    ----------------------------------------
    Select Count Items Filtering
    -----------------------------------------
    */
    // init Isotope
    var $grid = $('.grid').isotope({
        itemSelector: '.grid-item'
    });

	$grid.imagesLoaded().progress( function() {
		$grid.isotope('layout');
	});

    var $filterButtons = $('.filters-all .filter-nav-item');

    updateFilterCounts();

    // store filter for each group
    var filters = {};

    $('.filters-all').on('click', '.filter-nav-item', function() {
        var $this = $(this);
        // set filter for group
        filters[filterGroup] = $this.attr('data-filter');
        // combine filters
        var filterValue = concatValues(filters);
        // set filter for Isotope
        $grid.isotope({
            filter: filterValue
        });
        updateFilterCounts();
    });

    function updateFilterCounts() {
        // get filtered item elements
        var itemElems = $grid.isotope('getFilteredItemElements');
        var $itemElems = $(itemElems);
        $filterButtons.each(function(i, button) {
            var $button = $(button);
            var filterValue = $button.attr('data-filter');
            if (!filterValue) {
                // do not update 'any' buttons
                return;
            }
            var count = $itemElems.filter(filterValue).length;
            $button.find('.filter-count').text('(' + count + ')');
            if (count < 10) {
                $button.find('.filter-count').text('(' + 0 + count + ')');
            }
            if (count < 1) {
                $button.find('.filter-count').text('(' + count + ')');
            }
        });
    }


    // Google Map
    function initMap() {

        $('.init-gmap').each(function() {

            var element = $(this);

            var uluru = {
                lat: element.data('lat'),
                lng: element.data('lng')
            };

            var center = false;

            if (element.data('center')) {
                var centerLatLng = element.data('center').split(',');
                center = {
                    lat: parseFloat(centerLatLng[0]),
                    lng: parseFloat(centerLatLng[1])
                };
            } else {
                center = uluru;
            }

            var map = new google.maps.Map(element.get(0), {
                scrollwheel: false,
                zoom: element.data('zoom'),
                center: center,
                styles: [{
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#f5f5f5"
                        }]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#616161"
                        }]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [{
                            "color": "#f5f5f5"
                        }]
                    },
                    {
                        "featureType": "administrative.land_parcel",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#bdbdbd"
                        }]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#eeeeee"
                        }]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#757575"
                        }]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#e5e5e5"
                        }]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#9e9e9e"
                        }]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#ffffff"
                        }]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#757575"
                        }]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#dadada"
                        }]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#616161"
                        }]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#9e9e9e"
                        }]
                    },
                    {
                        "featureType": "transit.line",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#e5e5e5"
                        }]
                    },
                    {
                        "featureType": "transit.station",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#eeeeee"
                        }]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#c9c9c9"
                        }]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#9e9e9e"
                        }]
                    }
                ],
            });

            var marker = new google.maps.Marker({
                position: uluru,
                icon: 'assets/images/marker.png',
                map: map,
                title: 'Khulna 9000, Bangladesh'
            });

        });
    }


    $(window).on('load', function() {

        $('#loader').fadeOut();

        initMap();


        /*
        ----------------------------------------
         // Isotope Portfolio / Filtering
        -----------------------------------------
        */
        var $container = $('.portfolio-container');

        $container.isotope({
            filter: '*',
            masonry: {
                horizontalOrder: true
            },
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        
		$container.imagesLoaded().progress( function() {
			$container.isotope('layout');
		});

        $('.portfolio-filter a').on('click', function() {
            $('.portfolio-filter .current').removeClass('current');
            $(this).addClass('current');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                percentPosition: true,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });


    }); //Window Load End



})(jQuery);