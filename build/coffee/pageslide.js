(function() {
  var Pageslide;

  Pageslide = (function() {
    Pageslide.prototype.defaults = {
      slidePosition: 'left',
      open: '',
      close: 'body',
      duration: 200,
      easing: 'swing'
    };

    function Pageslide($el, options) {
      this.options = $.extend({}, this.defaults, options);
      this.$body = $('body');
      this.$open = $(this.options.open);
      this.$close = $(this.options.close);
      this.$slide = $el;
      this.slideWidth = this.$slide.outerWidth();
      this.bodyMarginLeft = parseInt(this.$body.css('margin-left'), 10);
      this.bodyMarginRight = parseInt(this.$body.css('margin-right'), 10);
      this.ua = navigator.userAgent;
      if (this.ua.indexOf('iPhone') > -1 || this.ua.indexOf('iPad') > -1 || this.ua.indexOf('iPod') > -1 || this.ua.indexOf('Android') > -1) {
        this.openEvent = 'touchend';
        this.closeEvent = 'touchstart';
      } else {
        this.openEvent = this.closeEvent = 'click';
      }
      if (this.options.slidePosition === 'left') {
        this.isLeft = true;
      } else {
        this.isLeft = false;
      }
      this.slideCss = {};
      this.slideAnimation = {};
      this.bodyAnimation = {};
      this._init();
    }

    Pageslide.prototype._init = function() {
      this.slideCss["" + this.options.slidePosition] = -this.slideWidth;
      this.slideAnimation["" + this.options.slidePosition] = 0;
      this.bodyAnimation['margin-left'] = this.isLeft ? this.bodyMarginLeft + this.slideWidth : this.bodyMarginLeft - this.slideWidth;
      this.bodyAnimation['margin-right'] = this.isLeft ? this.bodyMarginRight - this.slideWidth : this.bodyMarginRight + this.slideWidth;
      this.$close.on(this.closeEvent, (function(_this) {
        return function(e) {
          return _this.close(e);
        };
      })(this));
      this.$open.on(this.openEvent, (function(_this) {
        return function() {
          return _this.open();
        };
      })(this));
      return this;
    };

    Pageslide.prototype.open = function() {
      if (this.$slide.is(':visible')) {
        return;
      }
      this.$slide.show().css(this.slideCss).animate(this.slideAnimation, this.options.duration, this.options.easing);
      return this.$body.animate(this.bodyAnimation, this.options.duration, this.options.easing);
    };

    Pageslide.prototype.close = function(e) {
      if (this.$slide.is(':animated')) {
        return;
      }
      switch (this.options.slidePosition) {
        case 'left':
          if (e.clientX < this.$slide.outerWidth()) {
            return;
          }
          break;
        case 'right':
          if (e.clientX > this.$body.outerWidth() - this.$slide.outerWidth()) {
            return;
          }
      }
      this.$slide.animate(this.slideCss, this.options.duration, this.options.easing, (function(_this) {
        return function() {
          return _this._callback();
        };
      })(this));
      return this.$body.animate({
        'margin-left': this.bodyMarginLeft,
        'margin-right': this.bodyMarginRight
      }, this.options.duration, this.options.easing);
    };

    Pageslide.prototype._callback = function() {
      return this.$slide.hide();
    };

    return Pageslide;

  })();

  $.fn.pageslide = function(options) {
    var $el, pageslide;
    $el = $(this);
    pageslide = new Pageslide($el, options);
  };

}).call(this);
