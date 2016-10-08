$("document").ready(function(){

  smoothScroll.init({
    selector: '[data-scroll]',
    speed: 1000,
    easing: 'easeOutQuad',
    offset: 110,
  });

  function animateTo(selector) {

    var anchor = document.querySelector(selector);

    smoothScroll.animateScroll(anchor, false, {
      speed: 1000,
      easing: 'easeOutQuad',
      offset: 115,
    });

  }

  $('img[data-src]').each(function () {

    var img = $(this);

    if (img.data('src')) {

      img.attr('src', img.data('src'));

    }

  });

});
