class Pageslide

  defaults:

    # event object
    open: '.open'
    close: '#main'

    # animation options
    duration: 200
    easing: 'swing'

    # open flag
    isOpen: false

  constructor: ($el, options) ->

    @options = $.extend {}, @defaults, options

    @$body = $ 'body'
    @$open = $ @options.open
    @$close = $ @options.close
    @$slide = $el
    @slideWidth = @$slide.outerWidth()

    # event setting
    @ua = navigator.userAgent
    if @ua.indexOf('iPhone') > -1 or @ua.indexOf('iPad') > -1 or @ua.indexOf('iPad') > -1 or @ua.indexOf('Android') > -1
      @openEvent = 'touchend' 
      @closeEvent = 'touchstart'
    else
      @openEvent = 'click'
      @closeEvent = 'click'

    @open()
    @close()

  open: ->
    @$open.on(@openEvent, =>
      return if @options.isOpen is true
      @options.isOpen = true
      @$slide
        .css
          'display': 'block'
          'left': -@slideWidth
        .animate
          'left': 0
        , @options.duration, @options.easing
          
      @$body
        .animate
          'margin-left': @slideWidth
          'margin-right': -@slideWidth
        , @options.duration, @options.easing
      @
    )

  close: ->
    @$close.on(@closeEvent, =>
      return if @options.isOpen is false
      @options.isOpen = false
      @$slide
        .animate
          'left': -@slideWidth
        , @options.duration, @options.easing, @_callback

      @$body
        .animate
          'margin-left': 0
          'margin-right': 0
        , @options.duration, @options.easing
      @
    )

  _callback: =>
    @$slide
      .css
        'display': 'none'
    @

# jQuery plugin setting
$.fn.pageslide = (options) ->
  $el = $(@)
  pageslide = new Pageslide $el, options
  return
