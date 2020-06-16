$(document).ready( ()=> {

    const menuBtn = $('#browse'),
        menu = $('.dropMenu');

    menuBtn.on('click', function () {
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
            menu.slideUp();
        } else {
            $(this).addClass('is-active');
            menu.slideDown();
        }
    });

    $(document).click(function (e) {
        if (!menuBtn.is(e.target) && !menu.is(e.target) && menu.has(e.target).length === 0) {
            menu.slideUp();
            menuBtn.removeClass('is-active');
        }
    });


});
