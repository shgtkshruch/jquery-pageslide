class Pageslide

  defaults:

    # event object
    open: '.open'
    close: '#main'

    # animation options
    duration: 200
    easing: 'swing'

  constructor: ($el, options) ->

    @options = $.extend {}, @defaults, options

    # get jQuery Object
    @$body = $ 'body'
    @$open = $ @options.open
    @$close = $ @options.close
    @$slide = $el
    @slideWidth = @$slide.outerWidth()

    # get default body margin
    @bodyMarginLeft = parseInt @$body.css('margin-left'), 10
    @bodyMarginRight = parseInt @$body.css('margin-right'), 10

    # open flag
    @isOpen = false

    # event setting
    @ua = navigator.userAgent

    if @ua.indexOf('iPhone') > -1 or
      @ua.indexOf('iPad') > -1 or
      @ua.indexOf('iPad') > -1 or
      @ua.indexOf('Android') > -1
        @openEvent = 'touchend' 
        @closeEvent = 'touchstart'
    else
      @openEvent = 'click'
      @closeEvent = 'click'

    @init()

  init: ->
    # event hundling
    @$open.on @openEvent, => @open()
    @$close.on @closeEvent, => @close()
    @

  open: ->
    return if @isOpen is true
    @isOpen = true
    @$slide
      .css
        'display': 'block'
        'left': -@slideWidth
      .animate
        'left': 0
      , @options.duration, @options.easing

    @$body
      .animate
        'margin-left': @bodyMarginLeft + @slideWidth
        'margin-right': @bodyMarginRight - @slideWidth
      , @options.duration, @options.easing
    @

  close: ->
    return if @isOpen is false
    @isOpen = false
    @$slide
      .animate
        'left': -@slideWidth
      , @options.duration, @options.easing, => @_callback()

    @$body
      .animate
        'margin-left': @bodyMarginLeft
        'margin-right': @bodyMarginRight
      , @options.duration, @options.easing
    @

  _callback: ->
    @$slide
      .css
        'display': 'none'
    @

# jQuery plugin setting
$.fn.pageslide = (options) ->
  $el = $(@)
  pageslide = new Pageslide $el, options
  return
