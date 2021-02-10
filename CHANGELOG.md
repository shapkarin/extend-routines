### Version 3.0.10
Update dev dependencies

### Version 3.0.6
fix docs typo and remove useless imports

### Version 3.0.5 
fix: `createExtendedRoutine` throw an error if stages arg is not only `undefined`

### Version 3.0.4
remove `toArray` util

### Version 3.0.3
- with `createExtendedRoutine()` you can create routine that has more that just `redux-saga-routines` default stages.
- with `createCustomRoutine()` you can create routine with yours custom stages
- switch `extendRoutine()` to `redux-saga-routines API v.3.0.2`

note: from this ver you must have at least `redux-saga-routines 3.2.0` installed.

### Version 3.1.0
- update dev dependencies
- add `creteSocketRoutine()`

### Version 3.1.1
- change default stages for `creteSocketRoutine`:
  - rename 'MESSAGE_SENDED' and 'MESSAGE_RECEIVED' to 'SENDED' and 'RECEIVED'

### Version 3.2.0
- Change `creteSocketRoutine` default stages to 'CONNECTED', 'DISCONNECTED', 'JOIN_CHANNEL', 'CHANNEL_JOINED', 'LEAVE_CHANNEL', 'CHANNEL_LEAVED' and export defaultSocketStages
- Ability to create a bunch of routines with new method `createRoutines`
- Allow to pass one stage as a string for `createCustomRoutine`
- Fix typo in readme

### Version 3.2.1
- Update webpack

### Version 3.2.2
- `createCustomRoutine`
  - able to define needed routine method as a string `'default'` and `'socket'`
  - some refactoring
- able to pass empty stages to `createExtendedRoutine` and `createSocketRoutine`

### Version 3.2.3
- `createCustomRoutine` 
  - second argument 'defaultRoutines'
  - able to use first argument as 'defaultRoutines' if it's an array

### Version 3.2.5
Update documentation.

### Version 3.2.6
Add a couple of sections and links to the documentation.