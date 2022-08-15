import $ from 'jquery';

/* CAROUSEL */
var carousel = $('.carousel'),
    slideWidth = 400,
    dragStart, 
    dragEnd;

$('.next').click(() => { shiftSlide(-1) })
$('.prev').click(() => { shiftSlide(1) })

function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    slideWidth = $('.slide').width();

    let translateY = '';
    const size = getWindowSize();
    if (size == 'lg') {
        translateY = 'translateY(-50%)';
    }

    $(document).off('mouseup')
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px) ' + translateY); 
    setTimeout(function(){
        if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
        } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
        }

        carousel.removeClass('transition');
        carousel.css('transform','translateX(0px) ' + translateY); 

        let index = $('.slide.active').data('index');
        $('.slide.active').removeClass('active');
        index += direction * -1;

        if (index == 0) {
            index = $('.slide').length;
        } else if ($('.slide[data-index="' + index + '"').length == 0) {
            index = 1;
        }

        $('.slide[data-index="' + index + '"').addClass('active');

        $('.carousel-bullets button.active').removeClass('active');
        $('.carousel-bullets button[data-index="' + index + '"').addClass('active');
    },700)
}

/* MENU */
$('.navbar-toggler .burguer').on('click', () => {
    if ($('.navbar-toggler').hasClass('collapsed')) {
        $('#site-header .header-links').fadeIn();
        $('#site-header .navbar-toggler').removeClass('collapsed');
        $('#site-header .logo').addClass('black');
        $('body').css('overflow','hidden');
    } else {
        $('#site-header .header-links').fadeOut();
        $('#site-header .navbar-toggler').addClass('collapsed');
        $('#site-header .logo').removeClass('black');
        $('body').css('overflow','');
    }
});

$(window).on('scroll', (e) => {
    if($(window).scrollTop() > 0){
        $('#site-header').addClass('scrolled');
    } else {
        $('#site-header').removeClass('scrolled');
    }
});

const getWindowSize = () => {
    let size = 'lg';
    if ($(window).width() < 768) {
        size = 'md'
    }
    return size;
}