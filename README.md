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
import extendRoutine from 'extend-saga-routines';
import { createRoutine } from 'redux-saga-routines';
// for this example
import { expect } from 'chai';

const projects = extendRoutine(createRoutine('projects'), 'TOGGLE_INFO');

expect(projects.TOGGLE_INFO).to.equal('projects/TOGGLE_INFO');
expect(projects.toggleInfo({ id: 112 })).to.deep.equal({ type: "projects/TOGGLE_INFO", payload: { id: 112 } });

// and also with array:
const other = extendRoutine(
  createRoutine('other'),
  ['SOME_OTHER', 'CUSTOM']
);

expect(other.SOME_OTHER).to.equal('other/SOME_OTHER');
expect(other.someOther()).to.deep.equal({ type: 'other/SOME_OTHER' });

expect(other.CUSTOM).to.equal('other/CUSTOM');
expect(other.custom('info')).to.deep.equal({ type: 'other/CUSTOM', payload: 'info' });

// with provided payload creators:
const withCustomPayload = extendRoutine(
  createRoutine('custom/payload'),
  'SOME',
  { some: (payload) => payload * 2 }
);

expect(withCustomPayload.some(2)).to.deep.equal({ type: 'custom/payload/SOME', payload: 4 });

// with provided meta creator
const withCustomMeta = extendRoutine(
  createRoutine('custom/meta'),
  'SOME_OTHER',
  (payload) => payload,
  { someOther: () => ({ my: 'meta' }) }
);

expect(withCustomMeta.someOther(42)).to.deep.equal({ type: 'custom/meta/SOME_OTHER', payload: 42, meta: { my: 'meta' } });

/*
  to change default routines payload or meta use createRoutine's arguments.
  for example:
*/
const overwritedDefault = extendRoutine(
  createRoutine('overwrited/default', { trigger: (payload) => payload * 2 }),
  ['TOGGLE', 'OPEN', 'CLOSE']
)

expect(overwritedDefault.trigger(42)).to.deep.equal({ type: 'overwrited/default/TRIGGER', payload: 84 });
```


### Note:
This package [can become deprecated](https://github.com/afitiskin/redux-saga-routines/pull/59)