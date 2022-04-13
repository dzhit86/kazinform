

// Sliders
const sliderPhoto = new Swiper('#swiperPhoto', {
    direction: 'horizontal',
    loop: true,
    spaceBetween: 20,
    pagination: false,
    autoplay: true,
    speed: 500,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1.2,
          spaceBetween: 20
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 2.2,
          spaceBetween: 20
        },
        // when window width is >= 640px
        1024: {
          slidesPerView: 3.2,
          spaceBetween: 20
        }
      }
});



$(document).ready(function () {
    const menuMain = $(".menu-main");
    const first = menuMain.children(".menu-main__item").first();
    const last = menuMain.children(".menu-main__item").eq(2);
    const btnBurger = $(".header__burger");
    const topNav = $(".header__grid");

    btnBurger.on("click", mobileMenu);
  
    function mobileMenu(event) {
        event.preventDefault();
        btnBurger.add(topNav).toggleClass("_active");
    }
    function closeMenu() {
        btnBurger.add(topNav).removeClass("_active");
    }

    if ($(".menu-wrap")[0].scrollWidth < $(".menu-main__list")[0].scrollWidth) {
        $(".menu-wrap").addClass("_right");
    }

    var scrollingIsThrottled = false;
    var sticker = last;
    menuMain.scroll(function() {
        var stickers_width = $(this).width();
        if (!scrollingIsThrottled) {
            scrollingIsThrottled = true;

            var StickerMatchingExpression = sticker.filter(function() {
                var $this = $(this);
                var left_of_element = $this.offset().left;
                var right_of_element = left_of_element + $this.width();
                return 0 <= left_of_element && right_of_element <= stickers_width;
            });
            scrollingIsThrottled = false;
        }
    });
    

    menuMain.mousewheel(function(event, delta) {
        this.scrollLeft -= (delta * 30);      
        event.preventDefault();  
    });

    (function(){
        const tabWrap = $("[data-wrap-tab]");
        const tabLink = $(".news-tabs__link");
        const tabCont = $(".news-tabs__content");

        tabLink.on("click", function(e){
            e.preventDefault();
            tabLink.removeClass("_active");
            $(this).addClass("_active");
            let link = $(this).attr("href").substring(1);
            tabWrap.find(tabCont).removeClass("_active");
            tabCont.filter(`[data-cont-tab="${link}"]`).addClass("_active");
        });

    })();
    
    let curDay = new Date();
    let prevDay = curDay.setDate(curDay.getDate() - 1);

    new AirDatepicker("#datepickerPC", {
        inline: true,
        selectedDates: [new Date()],
        isMobile: true,
        autoClose: true,
        maxDate: prevDay,
        onSelect({date, formattedDate, datepicker}) {
            $.ajax({
                type: "GET",
                url: calendarHandler,
                data: "date=" + date.toLocaleDateString(),
                dataType: "string",
                success: function (response) {
                    window.location.href = response;
                }
            });
        },
    });

    new AirDatepicker("#datepickerMobile", {
        inline: true,
        selectedDates: [new Date()],
        isMobile: true,
        autoClose: true,
        maxDate: prevDay,
        onSelect({date, formattedDate, datepicker}) {
            $.ajax({
                type: "GET",
                url: calendarHandler,
                data: "date=" + date.toLocaleDateString(),
                dataType: "string",
                success: function (response) {
                    window.location.href = response;
                }
            });
        },
    });

    $('.news-list__col_calendar').stickySidebar({
        topSpacing: 20,
        bottomSpacing: 20,
    });

    $(window).resize(function () { 
        if ($(this).outerWidth() >= 860) {
            closeMenu();
        }
    });

    $(document).mouseup(function (e) {
        if (!topNav.is(e.target)
            && topNav.has(e.target).length === 0
            && !btnBurger.is(e.target)
            && btnBurger.has(e.target).length === 0) {
                closeMenu();
        }
    });
});
