jQuery(function ($) {

    /* =============================
       NAVBAR DROPDOWN
    ============================= */
    function initNavbar() {
        $("<span class='clickD'></span>").insertAfter(".navbar-nav li.menu-item-has-children > a");

        $('.navbar-nav').on('click', '.clickD', function (e) {
            e.preventDefault();

            let $this = $(this);

            if ($this.next().hasClass('show')) {
                $this.next().removeClass('show');
                $this.removeClass('toggled');
            } else {
                $('.sub-menu').removeClass('show');
                $('.clickD').removeClass('toggled');

                $this.next().addClass('show');
                $this.addClass('toggled');
            }
        });

        // close menu on outside click (mobile)
        $(document).on('click', function () {
            if ($(window).width() < 1025) {
                $('.sub-menu').removeClass('show');
                $('.clickD').removeClass('toggled');
            }
        });

        $('.navbar-nav').on('click', function (e) {
            e.stopPropagation();
        });
    }


    /* =============================
       NAV TOGGLER
    ============================= */
    function initNavToggle() {
        $(".navbar-toggler").on('click', function () {
            $(this).toggleClass("open");
            $(".navbar-toggler .stick").toggleClass("open");
            $('body,html').toggleClass("open-nav");
        });
    }


    /* =============================
       BACK TO TOP
    ============================= */
    function initScrollTop() {
        if (!$("#scroll").length) return;

        $(window).on('scroll', function () {
            $('#scroll').toggle($(this).scrollTop() > 200);
        });

        $('#scroll').on('click', function () {
            $("html, body").animate({ scrollTop: 0 }, 500);
            return false;
        });
    }


    /* =============================
       SLICK SLIDER
    ============================= */
    function initSlider() {
        if (!$('.responsive').length) return;

        $('.responsive').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true } },
                { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
                { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
            ]
        });
    }


    /* =============================
       ACCORDION
    ============================= */
    function initAccordion() {
        $('.accordion-button').on('click', function () {
            let parent = $(this).parent();

            if (parent.hasClass("active")) {
                parent.removeClass("active");
            } else {
                $(".accordion-item").removeClass("active");
                parent.addClass("active");
            }
        });
    }


    /* =============================
       MOBILE MENU
    ============================= */
    function initMobileMenu() {
        $(".Hamburger").on("click", function () {
            $(".mob-stick").toggleClass("animate");
            $(".mobile-sub-menu").slideToggle("slow");
        });
    }


    /* =============================
       FANCYBOX
    ============================= */
    function initFancybox() {
        if ($("[data-fancybox]").length) {
            Fancybox.bind("[data-fancybox]", {});
        }
    }


    /* =============================
       SCROLL ANIMATION (GLOBAL)
    ============================= */
    function initScrollAnimation() {

        if (!window.globalObserver) {
            window.globalObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        $(entry.target).addClass('fade-in-visible');
                    }
                });
            }, { threshold: 0.1 });
        }

        const elements = $('.accordion-item, .product-box, .blog-box, .card-box, .abt-cntnt, .abt-cntntTwo, .approach-cntnt, .about-img, .approach-img, .contact-sec');

        elements.each(function (i) {
            const el = this;

            $(el).addClass('fade-in');

            setTimeout(function () {
                window.globalObserver.observe(el);
            }, i * 120);
        });

        // Fix for Bootstrap Tabs (re-trigger animation)
        $('button[data-bs-toggle="pill"]').on('shown.bs.tab', function () {
            $('.tab-pane.active .blog-box').each(function (i) {
                const el = this;

                $(el).removeClass('fade-in-visible').addClass('fade-in');

                setTimeout(function () {
                    window.globalObserver.observe(el);
                }, i * 120);
            });
        });
    }



    function initLazyLoad() {

        const lazyImages = document.querySelectorAll('.lazy-img');

        if (!lazyImages.length) return;

        const imageObserver = new IntersectionObserver(function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const img = entry.target;

                    const src = img.getAttribute('data-src');

                    if (src) {
                        img.src = src;

                        img.onload = function () {
                            img.classList.add('loaded');
                        };
                    }

                    observer.unobserve(img);
                }

            });

        }, {
            threshold: 0.1,
            rootMargin: "0px 0px 100px 0px" // preload before visible
        });

        lazyImages.forEach(function (img) {
            imageObserver.observe(img);
        });

    }

    /* =============================
       INIT ALL
    ============================= */
    function init() {
        initNavbar();
        initNavToggle();
        initLazyLoad();
        initScrollTop();
        initSlider();
        initAccordion();
        initMobileMenu();
        initFancybox();
        initScrollAnimation();
    }

    init();

    

});