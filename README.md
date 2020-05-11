## Extend any routine with custom stages, create routine with more than default stages and create custom routine.

![npm](https://img.shields.io/npm/v/extend-saga-routines.svg)
![npm](https://img.shields.io/npm/dm/extend-saga-routines.svg)
![NPM](https://img.shields.io/npm/l/extend-saga-routines.svg)
[![Build Status](https://travis-ci.org/shapkarin/extend-saga-routines.svg?branch=master)](https://travis-ci.org/shapkarin/extend-saga-routines)

[more info about `redux-saga-routines`](https://www.npmjs.com/package/redux-saga-routines)
### Install 

```
npm install --save extend-saga-routines
```

note: from `ver 3` it uses updated `redux-saga-routines` API, so you must have at least `redux-saga-routines 3.2.0` installed.

### With that package you can
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
  - default stages are: 'CONNECTED', 'DISCONNECTED', 'SENDED', 'RECEIVED'
  - you can extend them as well by `stages` argument

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

### Create routine that has more that just `redux-saga-routines` default stages:

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

You can pass an array:
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

And also you can add cusom payload and meta creators:
```javascript
import { createExtendedRoutine } from 'extend-saga-routines';

const customPayloadMeta = createExtendedRoutine('payload/meta', 'MULTIPLIED_PAYLOAD',
  { multipliedPayload: (payload) => payload * 2 },
  { multipliedPayload: () => ({ some: 'meta' }) }
);

console.log(customPayloadMeta.multipliedPayload(2))
// { type: "payload/meta/MILTIPLIED_PAYLOAD", payload: 4, meta: { some: "meta" }};
```

### If you don't need default routine stages you can use `createCustomRoutine`:
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

Also you can add yours custom payload and meta creators to `createCustomRoutine` in the same way as in the `createExtendedRoutine` example.

### Socket Routine
```javascript
import { createSocketRoutine } from 'extend-saga-routines';

const chat = createSocketRoutine('chat', ['WHY', 'NOT']);

console.log(projects._STAGES);
// ["CONNECTED", "DISCONNECTED", "SENDED", "RECEIVED"];
console.log(chat.WHY);
// 'chat/WHY';
console.log(chat.why(42));
// { type: "chat/WHY", payload: 42 }
console.log(chat.NOT);
// 'chat/NOT';
console.log(chat.not(42));
// { type: "chat/NOT", payload: 42 }
```