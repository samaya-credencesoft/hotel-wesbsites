window.theme = {},
    function(e, o) {
        "use strict";
        e = e || {}, o.extend(e, {
            ajax_nonce: js_lordcros_vars.ajax_nonce,
            ajaxurl: js_lordcros_vars.ajax_url,
            timer_days: js_lordcros_vars.timer_days,
            timer_hours: js_lordcros_vars.timer_hours,
            timer_mins: js_lordcros_vars.timer_mins,
            timer_sec: js_lordcros_vars.timer_sec,
            stripe_publishable_key: js_lordcros_vars.stripe_publishable_key
        })
    }.apply(this, [window.theme, jQuery]),
    function(e, o) {
        "use strict";
        e = e || {}, o.extend(e, {
            basicFunctions: function() {
                o("header .sub-menu-dropdown, .lordcros-sticky-header .sub-menu-dropdown").each(function(e) {
                    var t = o(this).outerWidth(),
                        i = o(this).offset().left;
                    o(window).width() < t + i && o(this).addClass("submenu-shift")
                });
                var e = o("header.lordcros-header").outerHeight();
                o(".lordcros-sticky-header").length > 0 && o(window).scroll(function(t) {
                    o(this).scrollTop() > e ? o(".lordcros-sticky-header").addClass("page-scroll") : o(".lordcros-sticky-header").removeClass("page-scroll")
                }), o(".leftside-header.header-style-6 .menu-item-has-children").append('<div class="drop-nav"><i class="fas fa-angle-down"></i></div>'), o(".leftside-header.header-style-6").on("click", ".drop-nav", function(e) {
                    e.stopPropagation(), o(this).parent().toggleClass("active-submenu").children(".sub-menu-dropdown").toggleClass("opened"), o(this).parent().children(".sub-menu-dropdown").hasClass("opened") ? o(this).parent().children(".sub-menu-dropdown").slideDown(300) : o(this).parent().children(".sub-menu-dropdown").slideUp(300)
                }), o('[data-toggle="tooltip"]').tooltip(), o("body .tab-wrapper").each(function(e) {
                    o(this).find(".nav-tabs .tab-pane-title:first-child a").addClass("active show"), o(this).find(".tab-content .tab-pane:first-child").addClass("active show")
                }), o(".lordcros-shortcode-rooms-wrapper").each(function(e) {
                    var t = o(this),
                        i = t.data("margin-val"),
                        a = i / 2;
                    t.hasClass("owl-carousel") || (t.find(".room-content-view-wrap").css({
                        "padding-left": a + "px",
                        "padding-right": a + "px"
                    }), t.find(".room-block-view, .room-grid-view").css("margin-bottom", i + "px"))
                });
                var t = function(e, o) {
                    var t = e,
                        i = t.data("margin-val"),
                        a = i / 2;
                    void 0 !== i && (t.find(o).css({
                        "padding-left": a + "px",
                        "padding-right": a + "px"
                    }), t.find(o).css("margin-bottom", i + "px"))
                };
                o(".lordcros-shortcode-services-wrapper").each(function(e) {
                    t(o(this), ".service-item")
                }), o(".image-gallery-inner").each(function(e) {
                    t(o(this), ".lordcros-image-wrap"), o(this).addClass("added-gap").trigger("classChanged")
                }), o(".lordcros-shortcode-posts-inner").each(function(e) {
                    o(this).hasClass("owl-carousel") || t(o(this), ".blog-post-item")
                }), o(".available-rooms-wrap .room-gallery").owlCarousel({
                    loop: !0,
                    nav: !0,
                    dots: !1,
                    items: 1,
                    onRefreshed: function() {
                        o(window).resize()
                    }
                }), o(".lordcros-burger-wrapper").on("click", function(e) {
                    o(this).find(".hamburger").toggleClass("active"), o(this).hasClass("mobile-burger") || (o(".lordcros-hamburger-menu-wrap").toggleClass("open"), o("html").toggleClass("noScroll hamburger-menu-opened"))
                }), o(".header-mobile-nav").off("click").on("click", function(e) {
                    return e.preventDefault(), o("body").toggleClass("mobile-nav-active"), !1
                }), o(document).on("click", "body", function(e) {
                    o(".mobile-nav-active .mobile-nav").length > 0 && !o(e.target).is(".mobile-nav-active .mobile-nav, .mobile-nav-active .mobile-nav *") && (o("body").removeClass("mobile-nav-active"), o(".lordcros-burger-wrapper.mobile-burger .hamburger").removeClass("active"))
                }), o(".mobile-nav .close-btn .close-btn-link").on("click", function(e) {
                    e.preventDefault(), o("body").removeClass("mobile-nav-active"), o(".lordcros-burger-wrapper.mobile-burger .hamburger").removeClass("active")
                }), o(".lordcros-mobile-nav .menu-item-has-children").append('<div class="drop-nav"><i class="lordcros lordcros-angle-down"></i></div>'), o(".lordcros-mobile-nav").on("click", ".drop-nav", function(e) {
                    e.stopPropagation(), o(this).parent().toggleClass("active-submenu").children(".sub-menu-dropdown").toggleClass("opened"), o(this).parent().children(".sub-menu-dropdown").hasClass("opened") ? o(this).parent().children(".sub-menu-dropdown").slideDown(300) : o(this).parent().children(".sub-menu-dropdown").slideUp(300)
                }), o(".search-button .full-screen-search").each(function() {
                    o(this).on("click", function(e) {
                        e.preventDefault(), o("#lordcros-full-screen-search").removeClass("closed").addClass("opened")
                    })
                }), o("#lordcros-full-screen-search .form-close").on("click", function(e) {
                    o("#lordcros-full-screen-search").removeClass("opened").addClass("closed")
                })
            },
            cookiesPopup: function() {
                if (void 0 !== o.cookie) {
                    var t = e.cookies_law_version;
                    if ("accepted" != o.cookie("lordcros_cookies_" + t)) {
                        var i = o(".lordcros-cookies-popup");
                        setTimeout(function() {
                            i.addClass("popup-display"), i.on("click", ".accept-cookie-btn", function(e) {
                                e.preventDefault(), a()
                            })
                        }, 1e3);
                        var a = function() {
                            i.removeClass("popup-display").addClass("popup-hide"), o.cookie("lordcros_cookies_" + t, "accepted", {
                                expires: 60,
                                path: "/"
                            })
                        }
                    }
                }
            },
            CountDown: {
                initialize: function() {
                    return this.events(), this
                },
                events: function() {
                    o(".countdown-timer").each(function() {
                        var t = moment.tz(o(this).data("date-to"), o(this).data("timezone"));
                        o(this).countdown(t.toDate(), function(t) {
                            o(this).html(t.strftime('<span class="time countdown-days">%-D <span>' + e.timer_days + '</span></span><span class="time countdown-hours">%H <span>' + e.timer_hours + '</span></span><span class="time countdown-min">%M <span>' + e.timer_mins + '</span></span><span class="time countdown-sec">%S <span>' + e.timer_sec + "</span></span>"))
                        })
                    })
                }
            },
            backToTop: function() {
                o(window).scroll(function() {
                    o(this).scrollTop() > 400 && !o(".back-to-top").hasClass("is-visible") && o(".back-to-top").addClass("is-visible"), o(this).scrollTop() < 400 && o(".back-to-top").hasClass("is-visible") && o(".back-to-top").removeClass("is-visible")
                }), o("body").off("click", ".back-to-top").on("click", ".back-to-top", function(e) {
                    return e.preventDefault(), o("html, body").animate({
                        scrollTop: 0
                    }, "slow"), !1
                })
            },
            demoView: function() {
                o("body").hasClass("home") && o(".lordcros-demo-list-sidebar").addClass("opened"), o(".demo-sidebar-toggle").off("click").on("click", function(e) {
                    return e.preventDefault(), o(".lordcros-demo-list-sidebar").toggleClass("opened"), !1
                }), o(document).on("click", "body", function(e) {
                    o(".lordcros-demo-list-sidebar.opened").length > 0 && !o(e.target).is(".lordcros-demo-list-sidebar .demo-list-view-inner, .lordcros-demo-list-sidebar .demo-list-view-inner *") && o(".lordcros-demo-list-sidebar").removeClass("opened")
                })
            },
            initialize: function() {
                this.basicFunctions(), this.cookiesPopup(), this.CountDown.initialize(), this.backToTop(), this.demoView()
            }
        })
    }.apply(this, [window.theme, jQuery]),
    function(e, o) {
        "use strict";
        o(".lc-booking-date-range-from").datepicker({
            defaultDate: "+1w",
            minDate: 0,
            altFormat: "M",
            altField: ".lc-booking-date-month-from",
            firstDay: 0,
            dateFormat: "mm/dd/yy",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            changeMonth: !1,
            numberOfMonths: 1,
            beforeShow: function(e, t) {
                var i = 0;
                e.classList.contains("sidebar-form") ? o("#ui-datepicker-div").removeClass("sidebar-form-datepicker search-form-datepicker").addClass("sidebar-form-datepicker") : o("#ui-datepicker-div").removeClass("sidebar-form-datepicker search-form-datepicker").addClass("search-form-datepicker"), setTimeout(function() {
                    i = t.dpDiv.height(), o(window).height() - e.getBoundingClientRect().top > i ? t.dpDiv.removeClass("ui-top").addClass("ui-bottom") : t.dpDiv.removeClass("ui-bottom").addClass("ui-top")
                }, 0)
            },
            onClose: function() {
                var e = o(this).closest(".room-search-form"),
                    t = o(this).datepicker("getDate"),
                    i = new Date(t.setDate(t.getDate() + 1));
                e.find(".lc-booking-date-range-to").datepicker("option", "minDate", i);
                var a = o(this).val(),
                    r = a.substring(3, 5),
                    n = a.substring(6, 10);
                e.find(".lc-booking-date-day-from").val(r);
                var s = e.find(".lc-booking-date-range-to").val(),
                    c = s.substring(3, 5),
                    l = s.substring(6, 10);
                e.find(".lc-booking-date-day-to").val(c), e.find("#form-check-in .day-val").text(r), e.find("#form-check-in .year-val").text(n);
                var d = e.find(".lc-booking-date-month-from").val();
                e.find("#form-check-in .month-val").text(d), e.find("#form-check-out .day-val").text(c), e.find("#form-check-out .year-val").text(l);
                var u = e.find(".lc-booking-date-month-to").val();
                e.find("#form-check-out .month-val").text(u)
            }
        }), o(".lc-booking-date-range-to").datepicker({
            defaultDate: "+1w",
            minDate: "+1d",
            altFormat: "M",
            altField: ".lc-booking-date-month-to",
            firstDay: 0,
            dateFormat: "mm/dd/yy",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            changeMonth: !1,
            numberOfMonths: 1,
            beforeShow: function(e, t) {
                var i = 0;
                e.classList.contains("sidebar-form") ? o("#ui-datepicker-div").removeClass("sidebar-form-datepicker search-form-datepicker").addClass("sidebar-form-datepicker") : o("#ui-datepicker-div").removeClass("sidebar-form-datepicker search-form-datepicker").addClass("search-form-datepicker"), setTimeout(function() {
                    i = t.dpDiv.height(), o(window).height() - e.getBoundingClientRect().top > i ? t.dpDiv.removeClass("ui-top").addClass("ui-bottom") : t.dpDiv.removeClass("ui-bottom").addClass("ui-top")
                }, 0)
            },
            onClose: function() {
                var e = o(this).closest(".room-search-form"),
                    t = e.find(".lc-booking-date-range-from").val(),
                    i = t.substring(3, 5),
                    a = t.substring(6, 10);
                e.find(".lc-booking-date-day-from").val(i);
                var r = o(this).val(),
                    n = r.substring(3, 5),
                    s = r.substring(6, 10);
                e.find(".lc-booking-date-day-to").val(n), e.find("#form-check-in .day-val").text(i), e.find("#form-check-in .year-val").text(a);
                var c = e.find(".lc-booking-date-month-from").val();
                e.find("#form-check-in .month-val").text(c), e.find("#form-check-out .day-val").text(n), e.find("#form-check-out .year-val").text(s);
                var l = e.find(".lc-booking-date-month-to").val();
                e.find("#form-check-out .month-val").text(l)
            }
        }), o(".lc-booking-date-range-from").datepicker("setDate", "+0"), o(".lc-booking-date-range-to").datepicker("setDate", "+1"), o(".room-search-form #form-check-in").on("click", function(e) {
            o(this).find(".lc-booking-date-range-from").datepicker("show")
        }), o(".room-search-form #form-check-out").on("click", function(e) {
            o(this).find(".lc-booking-date-range-to").datepicker("show")
        }), o(".search-guest-count .fa-chevron-up").on("click", function(e) {
            var t = o(this).closest(".search-guest-count"),
                i = t.find(".guest-val").text();
            i++, t.find(".guest-val").text(i), t.find(".lc-booking-form-guests").val(i)
        }), o(".search-guest-count .fa-chevron-down").on("click", function(e) {
            var t = o(this).closest(".search-guest-count"),
                i = t.find(".guest-val").text();
            1 < i && (i--, t.find(".guest-val").text(i), t.find(".lc-booking-form-guests").val(i))
        }), o('#room-check-form [type="submit"]').on("click", function(t) {
            t.preventDefault();
            var i = o("#room-check-form");
            return o.ajax({
                url: e.ajaxurl,
                type: "POST",
                data: i.serialize() + "&security=" + e.ajax_nonce,
                success: function(e) {
                    1 == e.success ? (i.find("[name='room_price']").val(e.message.total_price), i.submit()) : alert(e.message)
                }
            }), !1
        })
    }.apply(this, [window.theme, jQuery]),
    function(e, o) {
        "use strict";
        e = e || {};
        var t = o(".service-filter-wrap .price-filter-amount").data("list-max-val"),
            i = o(".service-filter-wrap #price-filter-slider").data("min-price"),
            a = o(".service-filter-wrap #price-filter-slider").data("max-price");
        o(".service-filter-wrap #price-filter-slider").slider({
            range: !0,
            min: 0,
            max: t,
            values: [i, a],
            slide: function(e, t) {
                o('.service-filter-wrap .price-filter-amount input[name="min_price"]').val(t.values[0]), o(".price-filter-amount .show-price-values .min-price .price-val").text(t.values[0]), o('.service-filter-wrap .price-filter-amount input[name="max_price"]').val(t.values[1]), o(".price-filter-amount .show-price-values .max-price .price-val").text(t.values[1])
            },
            change: function(e, t) {
                var i = o(".service-filter-wrap #price-filter-slider").data("url").replace(/&amp;/g, "&");
                i += "&max_price=" + t.values[1] + "&min_price=" + t.values[0], document.location.href = i
            }
        })
    }.apply(this, [window.theme, jQuery]),
    function(e, o) {
        "use strict";
        e = e || {}, o('#form_default_service_filter input[type="checkbox"], #form_extra_service_filter input[type="checkbox"]').on("change", function() {
            var e = o(this).attr("name"),
                t = o(this).closest(".service-filter").data("url");
            o('input[name="' + e + '"]:checked').each(function(i) {
                "" != o(this).val() && (t += "&" + e + "=" + o(this).val())
            }), o('input[type="checkbox"').attr("disabled", "disabled"), document.location.href = t
        })
    }.apply(this, [window.theme, jQuery]),
    function(e, o) {
        "use strict";
        e = e || {}, o("#price-order-by, #size-order-by").on("change", function() {
            var e = new URL(location.href),
                t = e.search,
                i = new URLSearchParams(t);
            i.delete("page_num"), i.delete(o(this).attr("name")), i.append(o(this).attr("name"), o(this).children("option:selected").val()), e.search = i.toString(), document.location.href = e.toString()
        })
    }.apply(this, [window.theme, jQuery]),
    function(e, o) {
        "use strict";
        o.validator.addMethod("validate_coupon_code", function(t) {
            if (t) {
                var i = o("#checkout-form"),
                    a = !1;
                return o.ajax({
                    url: e.ajaxurl,
                    type: "POST",
                    async: !1,
                    cache: !1,
                    timeout: 300,
                    data: i.serialize() + "&security=" + e.ajax_nonce,
                    success: function(e) {
                        1 == e.success && (a = !0)
                    },
                    error: function() {
                        return !1
                    }
                }), a
            }
            return !0
        }, "Please enter correct coupon code!"), o("#checkout-form").validate({
            onkeyup: !1,
            onclick: !1,
            onfocusout: !1,
            rules: {
                coupon_code: "validate_coupon_code"
            }
        })
    }.apply(this, [window.theme, jQuery]),
    function(e, o) {
        "use strict";

        function t(e, t) {
            if (t.error) o("#stripe-pay-btn").removeAttr("disabled"), o(".payment-errors").html(t.error.message);
            else {
                var i = o("#stripe-form"),
                    a = t.id;
                i.append("<input type='hidden' name='stripeToken' value='" + a + "' />"), i.get(0).submit()
            }
        }
        "undefined" != typeof Stripe && Stripe.setPublishableKey(e.stripe_publishable_key), o(document).ready(function() {
            o("#stripe-form").submit(function(e) {
                return o("#stripe-pay-btn").attr("disabled", "disabled"), Stripe.createToken({
                    number: o(".card-number").val(),
                    cvc: o(".card-cvc").val(),
                    exp_month: o(".card-expiry-month").val(),
                    exp_year: o(".card-expiry-year").val()
                }, t), !1
            })
        })
    }.apply(this, [window.theme, jQuery]),
    function(e, o) {
        "use strict";
        o(".lordcros-shortcode-rooms-wrapper.owl-carousel.style2, .lordcros-shortcode-img-carousel.nav-center_pos .image-carousel-inner").each(function(e) {
            var t, i, a, r, n, s, c = o(this);
            o(this).on("initialized.owl.carousel resized.owl.carousel", function(e) {
                setTimeout(function(e) {
                    a = c.find(".owl-prev"), r = c.find(".owl-next"), n = c.width(), s = c.find(".owl-stage .owl-item.center").width(), i = (t = n / 2 - s / 2 - 70) + s + 100, a.css("left", t).removeClass("position-set").addClass("position-set"), r.css("left", i).removeClass("position-set").addClass("position-set")
                }, 300)
            })
        })
    }.apply(this, [window.theme, jQuery]),
    function(e, o) {
        "use strict";
        o(".lordcros-shortcode-services.style3 .services-wrap-slide").each(function(e) {
            o(this).owlCarousel({
                animateOut: "fadeOutUpLeft",
                animateIn: "zoomIn",
                loop: !0,
                nav: !0,
                dots: !1,
                items: 1,
                autoHeight: !0,
                mouseDrag: !1,
                touchDrag: !1
            })
        }), o(".lordcros-shortcode-services.style4 .lordcros-shortcode-services-wrapper").each(function(e) {
            var t = o(this),
                i = t.find(".services-thumbs-wrap .thumbs-slider-inner"),
                a = t.find(".services-infoboxes-wrap"),
                r = t.find(".service-slider-nav .slider-prev"),
                n = t.find(".service-slider-nav .slider-next");
            i.owlCarousel({
                animateOut: "fadeOut",
                animateIn: "fadeInRight",
                loop: !0,
                nav: !1,
                dots: !1,
                items: 1,
                mouseDrag: !1,
                touchDrag: !1,
                onInitialized: function() {
                    r.on("click", function(e) {
                        i.find(".owl-nav .owl-prev").click()
                    }), n.on("click", function(e) {
                        i.find(".owl-nav .owl-next").click()
                    })
                }
            }), a.owlCarousel({
                animateOut: "fadeOut",
                animateIn: "fadeInLeft",
                loop: !0,
                nav: !1,
                dots: !1,
                items: 1,
                mouseDrag: !1,
                touchDrag: !1,
                onInitialized: function() {
                    r.on("click", function(e) {
                        a.find(".owl-nav .owl-prev").click()
                    }), n.on("click", function(e) {
                        a.find(".owl-nav .owl-next").click()
                    })
                }
            }), a.trigger("refresh.owl.carousel")
        })
    }.apply(this, [window.theme, jQuery]),
    function(e, o) {
        "use strict";
        var t = o(".room-image-gallery .featured-image-slider"),
            i = o(".room-image-gallery .thumbnail-image-slider"),
            a = o(".single-room-page-wrapper"),
            r = function(e, i, a, r, n, s) {
                t.owlCarousel({
                    animateOut: i,
                    animateIn: e,
                    items: 1,
                    loop: a,
                    autoplay: r,
                    dots: !1,
                    nav: !0,
                    navText: !1,
                    mouseDrag: n,
                    touchDrag: n,
                    margin: s,
                    onInitialized: function() {
                        t.prev(".room-slider-placeholder").addClass("placeholder-hide")
                    },
                    onRefreshed: function() {
                        o(window).resize()
                    }
                })
            };
        a.hasClass("room-slider-content-layout") && (r(!1, !1, !1, !1, !0, 10), function() {
            i.owlCarousel({
                items: 4,
                dots: !1,
                nav: !1,
                nevText: !1,
                responsive: {
                    479: {
                        items: 4,
                        margin: 15
                    },
                    0: {
                        items: 3,
                        margin: 6
                    }
                }
            });
            var e = i.owlCarousel();
            i.on("click", ".owl-item", function(i) {
                var a = o(this).index();
                t.trigger("to.owl.carousel", a), e.trigger("to.owl.carousel", a)
            }), t.on("changed.owl.carousel", function(o) {
                var t = o.item.index;
                e.trigger("to.owl.carousel", t), i.find(".current-thumb").removeClass("current-thumb"), i.find(".gallery-item").eq(t).addClass("current-thumb")
            }), i.find(".gallery-item").eq(0).addClass("current-thumb")
        }(), o(".featured-image-slider").magnificPopup({
            delegate: "a",
            type: "image",
            fixedContentPos: !0,
            image: {
                verticalFit: !0
            },
            gallery: {
                enabled: !0,
                navigateByImgClick: !0
            },
            removalDelay: 500,
            mainClass: "mfp-fade"
        })), a.hasClass("room-slider-header-layout") && r("fadeIn", "fadeOut", !0, !0, !1, 0)
    }.apply(this, [window.theme, jQuery]),
    function(e, o) {
        "use strict";
        o(".mobile-sidebar-toggle-btn").on("click", function(e) {
            return o(".main-content aside").addClass("mobile-sidebar-open"), o("body").addClass("mobile-sidebar-active"), !1
        }), o(document).on("click", "body", function(e) {
            o(".main-content aside.mobile-sidebar-open").length > 0 && !o(e.target).is(".main-content aside.mobile-sidebar-open, .main-content aside.mobile-sidebar-open *") && (o("body").removeClass("mobile-sidebar-active"), o(".main-content aside").removeClass("mobile-sidebar-open"))
        }), o(".mobile-sidebar-header .close-btn").on("click", function(e) {
            e.preventDefault(), o("body").removeClass("mobile-sidebar-active"), o(".main-content aside").removeClass("mobile-sidebar-open")
        })
    }.apply(this, [window.theme, jQuery]),
    function(e, o) {
        "use strict";
        e = e || {}, o(".lordcros-video-placeholder-wrapper").on("click", function() {
            var e = o(this),
                t = e.parent().find("iframe"),
                i = t.attr("src"),
                a = i + "&autoplay=1";
            i.indexOf("vimeo.com") + 1 && (a = i + "?autoplay=1"), t.attr("src", a), e.addClass("hide-placeholder")
        })
    }.apply(this, [window.theme, jQuery]),
    function(e, o) {
        o(document).ready(function() {
            e.initialize()
        })
    }.apply(this, [window.theme, jQuery]);