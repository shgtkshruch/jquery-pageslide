class Pageslide

  defaults:

    # slide menu position
    slidePosition: 'left'

    # event object
    open: ''
    close: ''

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

    # event setting
    @ua = navigator.userAgent

    if @ua.indexOf('iPhone') > -1 or
      @ua.indexOf('iPad') > -1 or
      @ua.indexOf('iPod') > -1 or
      @ua.indexOf('Android') > -1
        @openEvent = 'touchend' 
        @closeEvent = 'touchstart'
    else
      @openEvent = @closeEvent = 'click'

    # open flag
    @isOpen = false

    # direction flag
    if @options.slidePosition is 'left'
      @isLeft = true
    else
      @isLeft = false

    # create animation object
    @slideCss = {}
    @slideAnimation = {}
    @bodyAnimation = {}

    @_init()

  _init: ->
    # Animation setting by direction
    @slideCss["#{@options.slidePosition}"] = -@slideWidth

    @slideAnimation["#{@options.slidePosition}"] = 0

    @bodyAnimation['margin-left'] =
      if @isLeft
      then @bodyMarginLeft + @slideWidth
      else @bodyMarginLeft - @slideWidth

    @bodyAnimation['margin-right'] =
      if @isLeft
      then @bodyMarginRight - @slideWidth
      else @bodyMarginRight + @slideWidth

    # event handling
    @$open.on @openEvent, => @open()
    @$close.on @closeEvent, => @close()
    @

  open: ->
    return if @isOpen is true
    @isOpen = true

    # open animation
    @$slide
      .show()
      .css @slideCss
      .animate @slideAnimation, @options.duration, @options.easing

    @$body
      .animate @bodyAnimation, @options.duration, @options.easing

  close: ->
    return if @isOpen is false
    @isOpen = false

    # close animation
    @$slide
      .animate @slideCss, @options.duration, @options.easing, => @_callback() 

    @$body
      .animate
        'margin-left': @bodyMarginLeft
        'margin-right': @bodyMarginRight
      , @options.duration, @options.easing

  _callback: ->
    @$slide
      .hide()

# jQuery plugin setting
$.fn.pageslide = (options) ->
  $el = $(@)
  pageslide = new Pageslide $el, options
  return
