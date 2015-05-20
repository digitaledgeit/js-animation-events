var assert = require('assert');
var events = require('..');

//add an animation class for testing
var
  el,
  style = document.createElement('style')
;
style.appendChild(document.createTextNode('@-webkit-keyframes animation { 0% {opacity: 1;} 100% {opacity: 1} } .animation {-webkit-animation: animation 1s 3;}'));
document.head.appendChild(style);

describe('animation-events', function() {

  beforeEach(function() {
    el = document.createElement('div');
    document.body.appendChild(el); //styles are only calculated if the element is in the doc
  });

  afterEach(function() {
    document.body.removeChild(el);
    el = null;
  });

  describe('.supported', function() {

    it('should return true when animations are supported in PhantomJS', function() {
      assert(events.supported);
    });

  });

  describe('.has()', function() {

    it('should return true when the element has an animation', function() {
      el.classList.add('animation');
      assert(events.has(el));
    });

    it('should return false when the element does not have an animation', function() {
      assert(!events.has(el));
    });

  });

  describe('.bind()', function() {

    it('should call the callback when the animation starts', function(done) {
      events.bind(el, 'start', function() {
        done();
      });
      el.classList.add('animation');
    });

    it('should call the callback when the animation ends', function(done) {
      this.timeout(4000);
      events.bind(el, 'end', function() {
        done();
      });
      el.classList.add('animation');
    });

    it('should call the callback for each repeat of the animation', function(done) {
      this.timeout(4000);

      var count = 0;
      events.bind(el, 'iteration', function() {
        ++count;
      });

      events.bind(el, 'end', function() {
        assert.equal(count, 2);
        done();
      });

      el.classList.add('animation');
    });
    
  });

  describe('.unbind()', function() {

    it('should not call the callback when the animation starts', function(done) {
      this.timeout(4000);

      function fn() {
        assert(false);
      }

      events.bind(el, 'start', fn);
      events.unbind(el, 'start', fn);

      events.bind(el, 'end', function() {
        done();
      });

      el.classList.add('animation');
    });

    it('should not call the callback when the animation ends', function(done) {
      this.timeout(4000);

      function fn() {
        assert(false);
      }

      events.bind(el, 'end', fn);
      events.unbind(el, 'end', fn);

      setTimeout(function() {
        done();
      }, 3500);

      el.classList.add('animation');
    });

    it('should not call the callback for each repeat of the animation', function(done) {
      this.timeout(4000);

      var count = 0;
      events.bind(el, 'iteration', function it() {
        events.unbind(el, 'iteration', it); //TOO late to unbind?
        ++count;
      });

      events.bind(el, 'end', function() {
        assert.equal(count, 1);
        done();
      });

      el.classList.add('animation');
    });

  });

  describe('.once()', function() {

    it('should only call the callback once instead of twice', function(done) {
      this.timeout(4000);

      var count = 0;
      events.once(el, 'iteration', function() {
        ++count;
      });

      events.bind(el, 'end', function() {
        assert.equal(count, 1);
        done();
      });

      el.classList.add('animation');
    });

  });

});