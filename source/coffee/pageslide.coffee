class Pageslide

  defaults:

    # slide menu position
    slidePosition: 'left'

    # event object
    open: ''
    close: 'body'

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
    @$close.on @closeEvent, (e) => @close(e)
    @$open.on @openEvent, () => @open()
    @

  open: () ->
    return if @$slide.is ':visible'
    # open animation
    @$slide
      .show()
      .css @slideCss
      .animate @slideAnimation, @options.duration, @options.easing

    @$body
      .animate @bodyAnimation, @options.duration, @options.easing

  close: (e) ->
    return if @$slide.is ':animated'
    switch @options.slidePosition
      when 'left' then return if e.clientX < @$slide.outerWidth()
      when 'right' then return if e.clientX > @$body.outerWidth() - @$slide.outerWidth()

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
