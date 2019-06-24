## Extend routine with custom types
![npm](https://img.shields.io/npm/v/extend-saga-routines.svg)
![npm](https://img.shields.io/npm/dt/extend-saga-routines.svg)
![NPM](https://img.shields.io/npm/l/extend-saga-routines.svg)

[more info about `redux-saga-routines`](https://www.npmjs.com/package/redux-saga-routines)
### Install 

```
npm install --save extend-saga-routines
```

### Examples:
```js
import createExtendedRoutine from 'extend-saga-routines';
import { createRoutine } from 'redux-saga-routines';

const projects = createExtendedRoutine(createRoutine('projects'), 'TOGGLE_INFO');

projects.TOGGLE_INFO === 'projects/TOGGLE_INFO';

console.log(projects.toggleInfo({ id: 112 })) 
// { type: "projects/TOGGLE_INFO", payload: { id: 112 } }

// and also with array:
const other = createExtendedRoutine(
  createRoutine('other'),
  ['SOME_OTHER', 'CUSTOM']
);

other.SOME_OTHER === 'other/SOME_OTHER';
console.log(other.someOther());
// { type: 'other/SOME_OTHER' }

other.CUSTOM === 'other/CUSTOM'
console.log(other.custom('thing'))
// { type: 'other/CUSTOM', payload: 'thing' }

// with provided payload creators:
const withCustomPayload = createExtendedRoutine(
  createRoutine('custom/payload'),
  'SOME',
  { some: (payload) => payload * 2 }
);

console.log(withCustomPayload.some(2));
// { type: 'custom/payload', payload: 4 }

// with provided meta creator
const withCustomMeta = createExtendedRoutine(
  createRoutine('custom/meta'),
  'SOME_OTHER',
  (payload) => payload,
  { someOther: () => ({ my: 'meta' }) }
);

console.log(withCustomMeta.someOther(42));
// { type: 'custom/meta', payload: 42, meta: { my: 'meta' } }

/*
  to change default routines payload or meta use createRoutine's arguments.
  for example:
*/
const overwriteDefault = createExtendedRoutine(
  createRoutine('overwrite', { trigger: (payload) => payload * 2 }),
  ['TOGGLE', 'OPEN', 'CLOSE']
)
```


### Note:
This package [can become deprecated](https://github.com/afitiskin/redux-saga-routines/pull/59)