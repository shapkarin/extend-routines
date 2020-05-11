import { createRoutines } from '../src';

const SCHEME = {
  people: {
    search: {
      _ANY: null,
      _TRIGGER: [
        ({ number }) => number * 2,
        () => ({ trigger: true })
      ],
      _REQUEST: [
        null,
        () => ({ ignoreCache: true })
      ],
      _OTHER_STAGE: null,
      otherNameSpace: null
    },
    customRoutine: [
      { method: 'custom' },
      {
        _OPEN: [
          ({ number }) => number * 2
        ],
        _CLOSE: null
      }
    ],
    remove: null
  }
}

createRoutines(SCHEME);

const RESULT = {
  
}