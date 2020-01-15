// toggle menu function
function menuToggle() {
    // toggle menu
    $('.open-menu').on('click', function () {
        $('html, body').toggleClass('menu-open');
        $('.open-menu').toggleClass('active');
        $('.overlay').toggleClass('open');
    });
}

// secondary nav on scroll
function secondNavbar() {
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 1) {
            $("body").addClass("scrolled-top");
            $(".main-header").addClass("scrolled");
        } else {
            $("body").removeClass("scrolled-top");
            $(".main-header").removeClass("scrolled");
        }
    });
}

// hero slider - next slide preview on arrow hover
function get_next_slick_img() {
    if (!($('.slick-current').next('.hero-slider__slide').length)) {
        var next_slick_img = $('.hero-slider__slide').first().find('img').attr('src');
    } else {
        var next_slick_img = $('.slick-current').next('.hero-slider__slide').find('img').attr('src');
    }
    $('.slick-next span + span').css('background-image', 'url(' + next_slick_img + ')');
}

function get_prev_slick_img() {
    if (!($('.slick-current').prev('.hero-slider__slide').length)) {
        var prev_slick_img = $('.hero-slider__slide').last().find('img').attr('src');
    } else {
        var prev_slick_img = $('.slick-current').prev('.hero-slider__slide').find('img').attr('src');
    }
    $('.slick-prev span + span').css('background-image', 'url(' + prev_slick_img + ')');
}

// toggle more info on products
function toggleMoreInfo() {
    $('.product').on('click', function (evt) {
        if (!$(evt.target).is('.add-favorite, button > i, .btn-second')) {
            $(this).find('.product-details--more').toggleClass('active');
            $(this).toggleClass('active');
        }
    });
}

// star icon toggle state
function starStateToggle() {
    $('.add-favorite').on('click', function () {
        $(this).toggleClass('ico-star-solid');
    })
}

// custom increment function
function customIncrement() {
    var count = 0;
    $('.increment-up').on('click', function () {
        count++;
        $(this).parent().parent().find('.custom-increment').val(count);
    });

    $('.increment-down').on('click', function () {
        if ($(this).parent().parent().find('.custom-increment').val() > 0) {
            count--;
            $(this).parent().parent().find('.custom-increment').val(count);
        }
    });
}


// adding and removing products filter
function addFilter() {
    $('select').on('change', function (params) {
        var optionSelected = $("option:selected", this);
        var valueSelected = this.value;
        $('#filterHolder').append('<button class="btn btn-filter">' + valueSelected + '<span class="remove-filter">&times;</span></button>');
        $('.remove-filter').on('click', function () {
            $(this).parent().hide();
        })
    })
}

function addToCart() {

    var getItemsLength = function () {
        var itemsLength = JSON.parse(localStorage.getItem('cart')).length;
        $('.cart-number').text(itemsLength);
    }

   

    if (localStorage.getItem('cart') === null) {
        var cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        getItemsLength();
    } else {
        getItemsLength();
    }

    var getSum = function () {
        var cart = JSON.parse(localStorage.getItem('cart'));
        console.log(cart);

        const total = cart.reduce((sum, item) => {
            return sum + parseInt(item.price.replace(/,/g, ''));
        }, 0);
        console.log(total);

        function numberWithCommas(number) {
            var parts = number.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        }
        var totalInt = numberWithCommas(total);

        $(".menu-cart__price > span").text(totalInt);
    }

    $('.addtocart').on('click', function () {
        var existingCart = JSON.parse(localStorage.getItem('cart'));
        var item = {};


        var parent = $(this).closest('.product');

        item.title = parent.find('.product-title').text();
        item.id = parent.find('.product-id').text();
        item.img = parent.find('.product-img').attr('src');
        item.cat = parent.find('.product-cat').text();
        item.price = parent.find('#product-price > span').text();

        localStorage.setItem('item', JSON.stringify(item));
        existingCart.push(item);
        localStorage.setItem('cart', JSON.stringify(existingCart));

        getItemsLength();
        getSum();

    });

}

$(document).ready(function () {
    menuToggle();
    secondNavbar();
    toggleMoreInfo();
    starStateToggle();
    customIncrement();
    addFilter();
    addToCart();

    // hero slider
    $('.hero-slider').slick({
        dots: true,
        infinite: true,
        fade: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 1000,
        appendDots: '.hero',
        prevArrow: '<button type="button" class="slick-prev"><span></span><span></span></button>',
        nextArrow: '<button type="button" class="slick-next"><span></span><span></span></button>',
    });


    $('.hero-slider').on('afterChange', function () {
        get_next_slick_img();
        get_prev_slick_img();
    });
    get_next_slick_img();
    get_prev_slick_img();

});

