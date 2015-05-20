# animation-events

## Installation

Component:

    component install animation-events

## Usage

    var events = require('animation-events');
  
    var el = document.querySelector('.js-ball');
    events
        .bind(el, 'start', function(event) {
            console.log('start', event);
        })
        .bind(el, 'end', function(event) {
            console.log('end', event);
        })
        .once(el, 'iteration', function(event) {
            console.log('iteration', event);
        })
    ;

## API

### Methods

#### .supported

#### .has(el)

#### .bind(el, event, callback)

#### .unbind(el, event, callback)

## Building

    browserify index.js -r ./index.js:animation-events > build/build.js

## Testing

    mochify
