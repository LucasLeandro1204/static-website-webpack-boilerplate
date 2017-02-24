window.$ = window.jQuery = require('jquery');

require('bootstrap');

$('document').ready(function () {
  $('img[data-src]').each(function () {
    var img = $(this);

    if (img.data('src')) {
      img.attr('src', img.data('src'));
    }
  });
});
