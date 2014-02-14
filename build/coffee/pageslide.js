(function() {
  var Pageslide;

  Pageslide = (function() {
    Pageslide.prototype.defaults = {
      slidePosition: 'left',
      open: '',
      close: '',
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
      this.isOpen = false;
      this.ua = navigator.userAgent;
      if (this.ua.indexOf('iPhone') > -1 || this.ua.indexOf('iPad') > -1 || this.ua.indexOf('iPad') > -1 || this.ua.indexOf('Android') > -1) {
        this.openEvent = 'touchend';
        this.closeEvent = 'touchstart';
      } else {
        this.openEvent = 'click';
        this.closeEvent = 'click';
      }
      this._init();
    }

    Pageslide.prototype._init = function() {
      this.$open.on(this.openEvent, (function(_this) {
        return function() {
          return _this.open();
        };
      })(this));
      this.$close.on(this.closeEvent, (function(_this) {
        return function() {
          return _this.close();
        };
      })(this));
      return this;
    };

    Pageslide.prototype.open = function() {
      if (this.isOpen === true) {
        return;
      }
      this.isOpen = true;
      switch (this.options.slidePosition) {
        case 'left':
          this.$slide.css({
            display: 'block',
            left: -this.slideWidth
          }).animate({
            left: 0
          }, this.options.duration, this.options.easing);
          this.$body.animate({
            'margin-left': this.bodyMarginLeft + this.slideWidth,
            'margin-right': this.bodyMarginRight - this.slideWidth
          }, this.options.duration, this.options.easing);
          break;
        case 'right':
          this.$slide.css({
            display: 'block',
            right: -this.slideWidth
          }).animate({
            right: 0
          }, this.options.duration, this.options.easing);
          this.$body.animate({
            'margin-left': this.bodyMarginLeft - this.slideWidth,
            'margin-right': this.bodyMarginRight + this.slideWidth
          }, this.options.duration, this.options.easing);
      }
      return this;
    };

    Pageslide.prototype.close = function() {
      if (this.isOpen === false) {
        return;
      }
      this.isOpen = false;
      switch (this.options.slidePosition) {
        case 'left':
          this.$slide.animate({
            left: -this.slideWidth
          }, this.options.duration, this.options.easing, (function(_this) {
            return function() {
              return _this._callback();
            };
          })(this));
          break;
        case 'right':
          this.$slide.animate({
            right: -this.slideWidth
          }, this.options.duration, this.options.easing, (function(_this) {
            return function() {
              return _this._callback();
            };
          })(this));
      }
      return this.$body.animate({
        'margin-left': this.bodyMarginLeft,
        'margin-right': this.bodyMarginRight
      }, this.options.duration, this.options.easing);
    };

    Pageslide.prototype._callback = function() {
      this.$slide.css({
        display: 'none'
      });
      return this;
    };

    return Pageslide;

  })();

  $.fn.pageslide = function(options) {
    var $el, pageslide;
    $el = $(this);
    pageslide = new Pageslide($el, options);
  };

}).call(this);
