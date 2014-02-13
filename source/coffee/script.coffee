$ ->
  $body = $ 'body'
  $main = $ '#main'
  $open = $ '.open'
  $slide = $ '#slide'
  slideWidth = $slide.outerWidth()

  duration = 200
  easing = 'swing'
  open = false

  $open.click ->
    return if open is true
    open = true
    $slide
      .css
        'display': 'block'
        'left': -slideWidth
      .animate
        'left': 0
      , duration, easing
        
    $body
      .animate
        'margin-left': slideWidth
        'margin-right': -slideWidth
      , duration

  $main.click ->
    return if open is false
    open = false
    $slide
      .animate
        'left': -slideWidth
      , duration, easing, callback
    callback = ->
      $slide
        .css
          'display': 'none'
    $body
      .animate
        'margin-left': 0
        'margin-right': 0
      , duration
