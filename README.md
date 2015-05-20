# animation-events

Bind and unbind animation events.

## Installation

Component:

    component install digitaledgeit/js-animation-events

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

Get whether animations are supported by the browser.

#### .has(el)

Get whether an element has an animation applied.

#### .bind(el, event, callback)

Add a callback for an animation event (`start`, `end` or `iteration`).

#### .unbind(el, event, callback)

Remove a callback for an animation event (`start`, `end` or `iteration`).

#### .once(el, event, callback)

Add a callback for a single animation event (`start`, `end` or `iteration`).

## Building

    browserify index.js -r ./index.js:animation-events > build/build.js

## Testing

    mochify
