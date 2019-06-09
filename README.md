## Extend routine with custom types

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

console.log(projects.TOGGLE_INFO);
console.log(projects.toggleInfo({ id: 112 }));

// and with array
const other = extendRoutine(
  createRoutine('other'),
  ['SOME_OTHER', 'CUSTOM']
);

console.log(other.SOME_OTHER);
console.log(other.someOther());

console.log(other.CUSTOM);
console.log(other.custom());
```