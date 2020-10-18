<p align="center">
<a href="https://travis-ci.org/Amourspirit/class-event-handler"><img src="https://travis-ci.org/Amourspirit/class-event-handler.svg?branch=master" /></a>
<a href="https://snyk.io/test/github/Amourspirit/class-event-handler?targetFile=package.json">
<img src="https://snyk.io/test/github/Amourspirit/class-event-handler/badge.svg?targetFile=package.json" /></a>
<a href="https://www.npmjs.com/package/class-event-handler"><img alt="node" src="https://img.shields.io/node/v/class-event-handler.svg"></a>
<img src="https://img.shields.io/github/package-json/v/Amourspirit/class-event-handler.svg" />
<img src="https://img.shields.io/github/license/Amourspirit/class-event-handler.svg" />
<a href="https://github.com/badges/stability-badges"> <img src="https://badges.github.io/stability-badges/dist/stable.svg" /></a>
</p>

# CLASS-EVENT-HANDLER

Event Handler for esm and commonJs

## Usage Examples

### Create and trigger event

```js
const events = new EventHandler();
let first = null;
let second = null;
let third = null;
let foruth = null;
const onTest = (p1, p2, p3, p4) => {
  first = p1;
  second = p2;
  third = p3;
  foruth = p4;
}
events.on('test', onTest);
events.trigger('test', { name: 'first' },'mytest', { place: 'third' }, -999);
console.log(first,second,third,fourth);
```

### Inline callback function

```js
const events = new EventHandler();
let strMsg;
events.on('sendmsg', (msg) => {
    strMsg = msg;
});
events.trigger('sendmsg', "Hello World");
console.log(strMsg);
```

### Remove single event listener

```js
const events = new EventHandler();
let iValue = 0;
const counterOne = (value) => {
  iValue += value;
}
const counterTwo = (value) => {
  iValue += value;
}
events.on('count', counterOne);
events.on('count', counterTwo);
events.trigger('count', 1);

console.log(iValue); // 2
events.off('count', counterTwo);

events.trigger('count', 1);
console.log(iValue); // 3
```

### Remove all event listeners

```js
const events = new EventHandler();
let iValue = 0;
const counterOne = (value) => {
  iValue += value;
}
const counterTwo = (value) => {
  iValue += value;
}
events.on('count', counterOne);
events.on('count', counterTwo);
events.trigger('count', 1);

console.log(iValue); // 2
events.removeAllEventListeners('count');

events.trigger('count', 1);
console.log(iValue); // 2
```
