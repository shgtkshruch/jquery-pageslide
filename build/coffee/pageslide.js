(function() {
  var Pageslide,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pageslide = (function() {
    Pageslide.prototype.defaults = {
      open: '.open',
      close: '#main',
      duration: 200,
      easing: 'swing',
      isOpen: false
    };

    function Pageslide($el, options) {
      this._callback = __bind(this._callback, this);
      this.options = $.extend({}, this.defaults, options);
      this.$body = $('body');
      this.$open = $(this.options.open);
      this.$close = $(this.options.close);
      this.$slide = $el;
      this.slideWidth = this.$slide.outerWidth();
      this.ua = navigator.userAgent;
      if (this.ua.indexOf('iPhone') > -1 || this.ua.indexOf('iPad') > -1 || this.ua.indexOf('iPad') > -1 || this.ua.indexOf('Android') > -1) {
        this.openEvent = 'touchend';
        this.closeEvent = 'touchstart';
      } else {
        this.openEvent = 'click';
        this.closeEvent = 'click';
      }
      this.open();
      this.close();
    }

    Pageslide.prototype.open = function() {
      return this.$open.on(this.openEvent, (function(_this) {
        return function() {
          if (_this.options.isOpen === true) {
            return;
          }
          _this.options.isOpen = true;
          _this.$slide.css({
            'display': 'block',
            'left': -_this.slideWidth
          }).animate({
            'left': 0
          }, _this.options.duration, _this.options.easing);
          _this.$body.animate({
            'margin-left': _this.slideWidth,
            'margin-right': -_this.slideWidth
          }, _this.options.duration, _this.options.easing);
          return _this;
        };
      })(this));
    };

    Pageslide.prototype.close = function() {
      return this.$close.on(this.closeEvent, (function(_this) {
        return function() {
          if (_this.options.isOpen === false) {
            return;
          }
          _this.options.isOpen = false;
          _this.$slide.animate({
            'left': -_this.slideWidth
          }, _this.options.duration, _this.options.easing, _this._callback);
          _this.$body.animate({
            'margin-left': 0,
            'margin-right': 0
          }, _this.options.duration, _this.options.easing);
          return _this;
        };
      })(this));
    };

    Pageslide.prototype._callback = function() {
      this.$slide.css({
        'display': 'none'
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
