# extend-saga-routines

![npm](https://img.shields.io/npm/v/extend-saga-routines.svg)
![npm](https://img.shields.io/npm/dm/extend-saga-routines.svg)
![NPM](https://img.shields.io/npm/l/extend-saga-routines.svg)
[![Build Status](https://travis-ci.org/shapkarin/extend-saga-routines.svg?branch=master)](https://travis-ci.org/shapkarin/extend-saga-routines)

## What is a [routine](https://www.npmjs.com/package/redux-saga-routines#what-is-routine)?
Usually you need to describe the same actions for the request with stages like that: 
- 'prefix/TRIGGER' – action to run the request
- 'prefix/REQUEST' – request started
- 'prefix/SUCCESS' – request successed
- 'prefix/FAILURE' – request fail
- 'prefix/FULFILL' – request completed

## What means extended routine?
With this package you can create [more than default actions above](#with-that-package-you-can). It's API allovs you to [extend any routine with custom stages](#extend-any-routine), create routine with [more than default stages](#create-routine-that-has-more-that-just-redux-saga-routines-default-stages), create [custom routine](#if-you-dont-need-default-routine-stages-you-can-use-createcustomroutine-). Also you can create a [socket routine](#socket-routine) with socket specific stages and a [bunch of routines](create-routines).

[more info about `redux-saga-routines`](https://www.npmjs.com/package/redux-saga-routines)
## Install 

```
npm install --save extend-saga-routines
```

Note: from `ver 3` it uses updated `redux-saga-routines` API, so you must have at least `redux-saga-routines 3.2.0` installed.

## Package Usage
- [extend any routine](#extend-any-routine):
  - `extendRoutine(routine, stages, payloadCreator, metaCreator)`
    - routine: any routine you already have, required
    - stages: list or just one stage, can be an array or string, required
    - payloadCreator: yours custom payloadCreator to use with current stage, optional
    - metaCreator: yours custom payloadCreator to use with current stage, optional
- [create routine that has `redux-saga-routines` default stages and yours](#create-routine-that-has-more-that-just-redux-saga-routines-default-stages):
  - `createExtendedRoutine(typePrefix, stages, payloadCreator, metaCreator)`
    - typePrefix: prefix for yours stages, required
    - stages: list or just one stage, can be an array or string, required
    - payloadCreator: yours custom payloadCreator to use with current stage, optional
    - metaCreator: yours custom payloadCreator to use with current stage, optional
- [create routine with only yours stages](#if-you-dont-need-default-routine-stages-you-can-use-createcustomroutine-):
  - `createCustomRoutine(typePrefix, stages, payloadCreator, metaCreator)`
    - typePrefix: prefix for yours stages, required
    - stages: list or just one stage, can be an array or string, required
    - payloadCreator: yours custom payloadCreator to use with current stage, optional
    - metaCreator: yours custom payloadCreator to use with current stage, optional
- [create socket routine that you can extend](#socket-routine)
  - `createSocketRoutine(typePrefix, stages, payloadCreator, metaCreator)`
  - default stages are: 'CONNECTED', 'DISCONNECTED', 'JOIN_CHANNEL', 'CHANNEL_JOINED', 'LEAVE_CHANNEL', 'CHANNEL_LEAVED'
  - you can extend them as well by `stages` argument
- [create a bunch of routines](#create-routines)
  - `createRoutines(scheme, defaultRoutines)`
  - scheme is a special object, check exmaples
  - any routine in `scheme` can be extended
  - if you need only default routines you can replace `scheme` with `defaultRoutines` (createRoutines(defaultRoutines))

### Extend any routine:
```js
import extendRoutine from 'extend-saga-routines';
import { createRoutine } from 'redux-saga-routines';

const projects = extendRoutine(createRoutine('projects'), 'TOGGLE_INFO');

console.log(projects._STAGES);
// ["TRIGGER", "REQUEST", "SUCCESS", "FAILURE", "FULFILL", "TOGGLE_INFO"]
console.log(projects.toggleInfo({ id: 42 }));
// { type: "projects/TOGGLE_INFO", payload: { id: 42 } }

// and also with array:
const tab = extendRoutine(
  createRoutine('tab'),
  ['SOME_OTHER', 'CUSTOM']
);

console.log(tab.OPEN);
// 'tab/OPEN'
console.log(tab.open(42));
// { type: 'tab/OPEN', payload: 42 }

console.log(tab.CLOSE);
// 'tab/CLOSE'
console.log(tab.close(42));
// { type: 'tab/CLOSE', payload: 42 }

// with provided payload creators:
const withCustomPayload = extendRoutine(
  createRoutine('custom/payload'),
  'SOME',
  { some: (payload) => payload * 2 }
);

console.log(withCustomPayload.some(2));
// { type: 'custom/payload/SOME', payload: 4 }

// with provided meta creator
const withCustomMeta = extendRoutine(
  createRoutine('custom/meta'),
  'SOME_OTHER',
  (payload) => payload,
  { someOther: () => ({ my: 'meta' }) }
);

console.log(withCustomMeta.someOther(42))
// { type: 'custom/meta/SOME_OTHER', payload: 42, meta: { my: 'meta' } }

const overwritedDefault = extendRoutine(
  createRoutine('overwrited/default'),
  ['TOGGLE', 'OPEN', 'CLOSE'],
  { trigger: (payload) => payload * 2 }
)

console.log(overwritedDefault.trigger(42))
// { type: 'overwrited/default/TRIGGER', payload: 84 }
```

###  `redux-saga-routines`:

```javascript
import { createExtendedRoutine } from 'extend-saga-routines';

const projects = createExtendedRoutine('projects', 'TOGGLE');

console.log(projects.TRIGGER);
// 'projects/TRIGGER'
console.log(projects.trigger());
// { type: "projects/TRIGGER" }
console.log(projects.TOGGLE);
// 'projects/TOGGLE'
console.log(projects.toggle({ id: 42 }))
// { type: "projects/TOGGLE", payload: { id: 42 } }
```

Passing an array:
```javascript
import { createExtendedRoutine } from 'extend-saga-routines';

const other = createExtendedRoutine('other', ['OPEN', 'CLOSE']);

console.log(other.OPEN);
// 'other/OPEN';
console.log(other.open(42));
// { type: "other/OPEN", payload: 42 }

console.log(other.CLOSE);
// 'other/CLOSE';
console.log(other.close(42));
// { type: "other/CLOSE", payload: 42 }
```

Adding custom payload and meta creators:
```javascript
import { createExtendedRoutine } from 'extend-saga-routines';

const customPayloadMeta = createExtendedRoutine('payload/meta', 'MULTIPLIED_PAYLOAD',
  { multipliedPayload: (payload) => payload * 2 },
  { multipliedPayload: () => ({ some: 'meta' }) }
);

console.log(customPayloadMeta.multipliedPayload(2))
// { type: "payload/meta/MILTIPLIED_PAYLOAD", payload: 4, meta: { some: "meta" }};
```

###  `createCustomRoutine`:
```javascript
import { createCustomRoutine } from 'extend-saga-routines';

const steps = createCustomRoutine('steps', ['NEXT', 'PREVIOUS', 'GO_TO']);

console.log(steps._STAGES)
// ["NEXT", "PREVIOUS", "GO_TO"]

console.log(steps.NEXT)
// 'steps/NEXT';
console.log(steps.next()); 
// { type: "steps/NEXT" }

console.log(steps.PREVIOUS);
// 'steps/PREVIOUS';
console.log(steps.previous());
// { type: "steps/PREVIOUS" }

console.log(steps.GO_TO);
// 'steps/GO_TO';
console.log(steps.goTo(42));
// { type: "steps/GO_TO", payload: 42 }
```

You can add yours custom payload and meta creators to `createCustomRoutine` in the same way as in the `createExtendedRoutine` example.

### Socket Routine
```javascript
import { createSocketRoutine } from 'extend-saga-routines';

const chat = createSocketRoutine('chat', ['WHY', 'NOT']);

console.log(projects._STAGES);
// ['CONNECTED', 'DISCONNECTED', 'JOIN_CHANNEL', 'CHANNEL_JOINED', 'LEAVE_CHANNEL', 'CHANNEL_LEAVED', 'WHY', 'NOT']
console.log(chat.WHY);
// 'chat/WHY';
console.log(chat.why(42));
// { type: "chat/WHY", payload: 42 }
console.log(chat.NOT);
// 'chat/NOT';
console.log(chat.not(42));
// { type: "chat/NOT", payload: 42 }
```

### Create routines
Now you can create multiple routines at once by using `createRoutines`.

## Examples:

#### Default routines using `createRoutines`:
```js
import { createRoutines } from 'extend-saga-routines';

const routines = createRoutines({
  firstRoutine: null,
  secondRoutine: null,
  // or the same
  thirdRoutine: 'default'
});

// or with defaultRoutines argument
const routines2 = createRoutines({ alsoSomeBasci: null }, [
  'firstRoutine'
  'secondRoutine'
  'thirdRoutine'
]);

// or
const routines3 = createRoutines(null, [
  'firstRoutine'
  'secondRoutine'
  'thirdRoutine'
]);

// or if you even don't need any extenened routines or 
const routines4 = createRoutines([
  'firstRoutine'
  'secondRoutine'
  'thirdRoutine'
]);


console.log(routines.firstRoutine._STAGES);
// ["TRIGGER", "REQUEST", "SUCCESS", "FAILURE", "FULFILL"]

console.log(routines4.firstRoutine._STAGES);
// ["TRIGGER", "REQUEST", "SUCCESS", "FAILURE", "FULFILL"]

console.log(routines.firstRoutine(42));
// { type: "firstRoutine/TRIGGER", payload: 42 }

console.log(routines.secondRoutine(42));
// { type: "secondRoutine/TRIGGER", payload: 42 }
console.log(routines.secondRoutine.request(42));
// { type: "secondRoutine/REQUEST", payload: 42 }

// also you can use destructuring assignment
const { firstRoutine, secondRoutine, thirdRoutine } = routines;

```

#### Extended routines using `createRoutines`:
```
To create extended routine inside of bunch
you need to start with `_` underscore
each additional stage. 
Next stage name will be transformed 
to without underscore. 
(`_OPEN` => routine.OPEN, type: 'parent/OPEN' ,routine.open() )
```
```js
import { createRoutines } from 'extend-saga-routines';

const routines = createRoutines({
  firstRoutine: {
    _OPEN: 'default',
    _CLOSE: 'default'
  },
  secondRoutine: 'default',
  thirdRoutine: 'default'
});

console.log(routines.firstRoutine._STAGES);
// ["TRIGGER", "REQUEST", "SUCCESS", "FAILURE", "FULFILL", "TOGGLE_INFO", "OPEN", "CLOSE"]

console.log(routines.firstRoutine(42));
// { type: "firstRoutine/TRIGGER", payload: 42 }

console.log(routines.firstRoutine.open(84));
// { type: "firstRoutine/OPEN", payload: 84 }

console.log(routines.secondRoutine._STAGES);
// ["TRIGGER", "REQUEST", "SUCCESS", "FAILURE", "FULFILL"]

```

#### Create `custom` or `socket` routine using `createRoutines`:
```js
import { createRoutines } from 'extend-saga-routines';

const routines = createRoutines({
  firstRoutine: [
    { method: 'custom' },
    {
      _OPEN: 'default',
      _CLOSE: 'default'
    }
  ],
  socket: 'socket',
  socketExtended: [
    { method: 'socket' },
    {
      _ADD: 'default'
    }
  ]
});

console.log(routines.firstRoutine(42))
// { type: "firstRoutine/OPEN", payload: 42 }

console.log(routines.firstRoutine._STAGES);
// ['OPEN', 'CLOSE']

console.log(routines.socket._STAGES);
// ['CONNECTED', 'DISCONNECTED', 'JOIN_CHANNEL', 'CHANNEL_JOINED', 'LEAVE_CHANNEL', 'CHANNEL_LEAVED']

console.log(routines.socketExtended._STAGES);
// ['CONNECTED', 'DISCONNECTED', 'JOIN_CHANNEL', 'CHANNEL_JOINED', 'LEAVE_CHANNEL', 'CHANNEL_LEAVED', 'ADD']

```

#### Change payload and meta creators using `createRoutines`:

Pretty similar with redux-action [createActions method](https://redux-actions.js.org/api/createaction#createactions)

```js
import { createRoutines } from 'extend-saga-routines';

const routines = createRoutines({
  multiplyPayloads: {
    _TRIGGER: [ (payload) => payload * 2 ],
    _REQUEST: [ (payload) => payload * 3 ],
  },
  customMeta: {
    _TRIGGER: [ null, () => ({ some: 'data' }) ],
  },
  payloadAndMeta: {
    _TRIGGER: [
      (payload) => payload / 2, 
      () => ({ info: 'divide' })
    ]
  },
  extendedRoutine: {
    _PLUS_TEN: [
      (payload) => payload + 10
    ]
  },
  customRoutine: [
    { method: 'custom' },
    {
      _OPEN: null,
      _CLOSE: null
    }
  ],
});

console.log(routines.multiplyPayloads(2))
// { type: "multiplyPayloads/TRIGGER", payload: 4 }

console.log(routines.multiplyPayloads.request(2))
// { type: "multiplyPayloads/TRIGGER", payload: 6 

console.log(routines.customMeta(2))
// { type: "customMeta/TRIGGER", payload: 2, meta: { info: "divide" } }

console.log(routines.payloadAndMeta(4))
// { type: "payloadAndMeta/TRIGGER", payload: 2, meta: { info: "divide" } }

console.log(routines.extendedRoutine(42))
// { type: "extendedRoutine/PLUS_TEN", payload: 52 }

console.log(routines.extendedRoutine.plusTen(42))
// { type: "extendedRoutine/PLUS_TEN", payload: 52 }

console.log(routines.customRoutine)
```
