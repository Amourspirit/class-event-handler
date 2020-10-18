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
