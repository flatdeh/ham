$(".carousel-bottom").slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.carousel-comments',
    focusOnSelect: true,
    adaptiveHeight: true,
    prevArrow: "<a href=\"#\" class=\"carousel-bottom__btn carousel-bottom__btn_left\">&lt;</a>",
    nextArrow: "<a href=\"#\" class=\"carousel-bottom__btn carousel-bottom__btn_right\">&gt;</a>",

});

$('.carousel-comments').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.carousel-bottom'
});

(function($) {
    $(function() {

        $('ul.tab').on('click', 'li:not(.tab__title_active)', function() {
            $(this)
                .addClass('tab__title_active').siblings().removeClass('tab__title_active')
                .closest('div.tabs').find('div.tab-content').removeClass('tab-content_active').eq($(this).index()).addClass('tab-content_active');
        });
    });
})(jQuery);
