## Extend routine with custom types
![npm](https://img.shields.io/npm/v/extend-saga-routines.svg)
![npm](https://img.shields.io/npm/dt/extend-saga-routines.svg)
![NPM](https://img.shields.io/npm/l/extend-saga-routines.svg)

[more info about `redux-saga-routines`](https://www.npmjs.com/package/redux-saga-routines)
### Install 

```
npm install --save extend-saga-routines
```

### Example:
```js
import { createRoutine } from 'redux-saga-routines';
import extendRoutine from 'extend-saga-routines';

const projects = extendRoutine(createRoutine('projects'), 'TOGGLE_INFO');

projects.TOGGLE_INFO === 'projects/TOGGLE_INFO';

console.log(projects.toggleInfo({ id: 112 })) 
// { type: "projects/TOGGLE_INFO", payload: { id: 112 } }

// and also with array
const other = extendRoutine(
  createRoutine('other'),
  ['SOME_OTHER', 'CUSTOM']
);

other.SOME_OTHER === 'other/SOME_OTHER';
console.log(other.someOther());
// { type: 'other/SOME_OTHER' }

other.CUSTOM === 'other/CUSTOM'
console.log(other.custom('thing'))
// { type: 'other/CUSTOM', payload: 'thing' }
```

### Note:
This package [can become deprecated](https://github.com/afitiskin/redux-saga-routines/pull/59)