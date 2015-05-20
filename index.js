
var
  prop,
  events = {
    'animationDuration': {
      start:      'animationstart',
      end:        'animationend',
      iteration:  'animationiteration'
    },
    'WebkitAnimationDuration': {
      start:      'webkitAnimationStart',
      end:        'webkitAnimationEnd',
      iteration:  'webkitAnimationIteration'
    },
    'OAnimationDuration': {
      start:      'oAnimationStart',
      end:        'oAnimationEnd',
      iteration:  'oAnimationIteration'
    },
    'msAnimationDuration': {
      start:      'MSAnimationStart',
      end:        'MSAnimationEnd',
      iteration:  'MSAnimationIteration'
    },
    'MozAnimationDuration': {
      start:      'animationstart',
      end:        'animationend',
      iteration:  'animationiteration'
    }
  }
;

//work out which animation property is supported by the browser
for(var p in events) {
  if (typeof(document.body.style[p]) !== 'undefined') {
    prop = p;
  }
}

/**
 * Get the computed style regardless of browser
 * @param   {HTMLElement} el
 * @returns {boolean}
 */
function style(el) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(el);
  } else {
    return el.currentStyle; //IE
  }
}

module.exports = {

  /**
   * Get whether animations are supported by the browser
   * @type  {boolean}
   */
  supported: !!prop,

  /**
   * Get whether an element has an animation applied
   * @param   {HTMLElement} el
   * @returns {boolean}
   */
  has: function(el) {

    //check the browser supports animations
    if (!prop) return false;

    var cs = style(el);

    return cs[prop].length > 0 && cs[prop] !== '0s';
  },

  /**
   * Add a callback for an animation event
   * @param   {HTMLElement} el        The element
   * @param   {string}      event     The event - `start`, `end` or `iteration`
   * @param   {function}    callback  The callback
   */
  bind: function(el, event, callback) {

    //check the browser supports animations
    if (!prop) return this;

    event = events[prop][event];

    //check the event type is supported
    if (!event) return this;

    el.addEventListener(event, callback);
    return this;
  },

  /**
   * Remove a callback for an animation event
   * @param   {HTMLElement} el        The element
   * @param   {string}      event     The event - `start`, `end` or `iteration`
   * @param   {function}    callback  The callback
   */
  unbind: function(el, event, callback) {

    //check the browser supports animations
    if (!prop) return this;

    event = events[prop][event];

    //check the event type is supported
    if (!event) return this;

    el.removeEventListener(event, callback);
    return this;
  },

  /**
   * Add a callback for a single animation event
   * @param   {HTMLElement} el        The element
   * @param   {string}      event     The event - `start`, `end` or `iteration`
   * @param   {function}    callback  The callback
   */
  once: function(el, event, callback) {
    var self = this;
    return this.bind(el, event, function fn() {
      callback.apply(el, arguments);
      self.unbind(el, event, fn);
    });
  }

};