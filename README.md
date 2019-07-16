## Extend any routine with custom stages, create routine with more than defafult stages and create custom routine.

![npm](https://img.shields.io/npm/v/extend-saga-routines.svg)
![npm](https://img.shields.io/npm/dt/extend-saga-routines.svg)
![NPM](https://img.shields.io/npm/l/extend-saga-routines.svg)
[![Build Status](https://travis-ci.org/shapkarin/extend-saga-routines.svg?branch=master)](https://travis-ci.org/shapkarin/extend-saga-routines)
![npm bundle size](https://img.shields.io/bundlephobia/min/extend-saga-routines.svg)

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
- [create routine with only yours custom stages](#if-you-dont-need-default-routine-stages-you-can-use-createcustomroutine-):
  - `createCustomRoutine(typePrefix, stages, payloadCreator, metaCreator)`
    - typePrefix: prefix for yours stages, required
    - stages: list or just one stage, can be an array or string, required
    - payloadCreator: yours custom payloadCreator to use with current stage, optional
    - metaCreator: yours custom payloadCreator to use with current stage, optional

### Extend any routine:
```js
import extendRoutine from 'extend-saga-routines';
import { createRoutine } from 'redux-saga-routines';

const projects = extendRoutine(createRoutine('projects'), 'TOGGLE_INFO');

console.log(projects.TOGGLE_INFO);
// 'projects/TOGGLE_INFO'
console.log(projects.toggleInfo({ id: 112 }));
// { type: "projects/TOGGLE_INFO", payload: { id: 112 } }

// and also with array:
const other = extendRoutine(
  createRoutine('other'),
  ['SOME_OTHER', 'CUSTOM']
);

console.log(other.SOME_OTHER);
// 'other/SOME_OTHER'
console.log(other.someOther());
// { type: 'other/SOME_OTHER' }

console.log(other.CUSTOM);
// 'other/CUSTOM'
console.log(other.custom('info'));
// { type: 'other/CUSTOM', payload: 'info' }

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
console.log(other.close({ id: 42 }))
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

const customPayloadMeta = createExtendedRoutine('payload/meta', 'MILTIPLIED_PAYLOAD',
  { multipliedPayload: (payload) => payload * 2 },
  { multipliedPayload: () => { some: 'meta' } }
);

console.log(customPayloadMeta.multipliedPayload(2))
// { type: "payload/meta/MILTIPLIED_PAYLOAD", payload: 4, meta: { some: "meta" }};
```

### If you don't need default routine stages you can use `createCustomRoutine`:
```javascript
import { createCustomRoutine } from 'extend-saga-routines';

const steps = createCustomRoutine('steps', ['NEXT', 'PREVIOUS', 'GO_TO']);

console.log(steps.NEXT)
// 'steps/NEXT';
console.log(steps.next()); 
// { type: "steps/NEXT" }

console.log(steps.PREVIOUS);
// 'steps/PREVIOUS';
console.log(steps.previous());
// { type: "steps/PREVIOUS" }

console.log(steps.TO);
// 'steps/GO_TO';
console.log(steps.goTo(3));
// { type: "steps/GO_TO", payload: 3 }
```

Also you can add yours custom payload and meta creators to `createCustomRoutine` in the same way as in the `createExtendedRoutine` example.