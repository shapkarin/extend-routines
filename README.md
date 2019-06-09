## Extend redux-saga-routine with custom types

### Install 

```
npm install --save extend-saga-routines
```

### Example:
```js
import { createRoutine } from 'redux-saga-routines';
import extendRoutine from 'extend-saga-routines';

const projects = extendRoutine(createRoutine('projects'), ['TOGGLE_PROJECT_INFO']);

console.log(projects.TOGGLE_PROJECT_INFO);
console.log(projects.toggleProjectInfo({ id: 112 }));
```