(function() {
  $(function() {
    var $body, $main, $open, $slide, duration, easing, open, slideWidth;
    $body = $('body');
    $main = $('#main');
    $open = $('.open');
    $slide = $('#slide');
    slideWidth = $slide.outerWidth();
    duration = 200;
    easing = 'swing';
    open = false;
    $open.click(function() {
      if (open === true) {
        return;
      }
      open = true;
      console.log('open');
      $slide.css({
        'display': 'block',
        'left': -slideWidth
      }).animate({
        'left': 0
      }, duration, easing);
      return $body.animate({
        'margin-left': slideWidth,
        'margin-right': -slideWidth
      }, duration);
    });
    return $main.click(function() {
      var callback;
      if (open === false) {
        return;
      }
      console.log('close');
      open = false;
      $slide.animate({
        'left': -slideWidth
      }, duration, easing, callback);
      callback = function() {
        return $slide.css({
          'display': 'none'
        });
      };
      return $body.animate({
        'margin-left': 0,
        'margin-right': 0
      }, duration);
    });
  });

}).call(this);
