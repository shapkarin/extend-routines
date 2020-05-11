import { describe, it } from 'mocha';
import { expect } from 'chai';

import { createRoutines } from '../src';
import { defaultRoutineStages } from 'redux-saga-routines';

const SCHEME = {
  default: null,
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

describe('create a bunch of routines with `createRoutines`', () => { 
  
  it('should throw an error scheme is undefined of not an object', () => {
    expect(() => createRoutines()).to.throw('`scheme` must be an object');
  });

  it('should create default routine', () => {
    const routine = createRoutines(SCHEME).default;

    const PREFIX = 'default';
    const TRIGGER = `${PREFIX}/TRIGGER`;
    const REQUEST = `${PREFIX}/REQUEST`;
    const SUCCESS = `${PREFIX}/SUCCESS`;
    const FAILURE = `${PREFIX}/FAILURE`;
    const FULFILL = `${PREFIX}/FULFILL`;

    const payload = {
      some: 'data',
    };
    const triggerAction = {
      type: TRIGGER,
      payload,
    };
    const requestAction = {
      type: REQUEST,
      payload,
    };
    const successAction = {
      type: SUCCESS,
      payload,
    };
    const failureAction = {
      type: FAILURE,
      payload,
    };
    const fulfillAction = {
      type: FULFILL,
      payload,
    };

    expect(routine).to.be.a('function');
    expect(routine.toString()).to.equal(TRIGGER);
    expect(routine(payload)).to.deep.equal(triggerAction);

    expect(routine._STAGES).to.deep.equal(defaultRoutineStages);
    expect(routine._PREFIX).to.equal(PREFIX);

    expect(routine.trigger).to.be.a('function');
    expect(routine.TRIGGER).to.equal(TRIGGER);
    expect(routine.trigger.toString()).to.equal(TRIGGER);
    expect(routine.trigger(payload)).to.deep.equal(triggerAction);

    expect(routine.request).to.be.a('function');
    expect(routine.REQUEST).to.equal(REQUEST);
    expect(routine.request.toString()).to.equal(REQUEST);
    expect(routine.request(payload)).to.deep.equal(requestAction);

    expect(routine.success).to.be.a('function');
    expect(routine.SUCCESS).to.equal(SUCCESS);
    expect(routine.success.toString()).to.equal(SUCCESS);
    expect(routine.success(payload)).to.deep.equal(successAction);

    expect(routine.failure).to.be.a('function');
    expect(routine.FAILURE).to.equal(FAILURE);
    expect(routine.failure.toString()).to.equal(FAILURE);
    expect(routine.failure(payload)).to.deep.equal(failureAction);

    expect(routine.fulfill).to.be.a('function');
    expect(routine.FULFILL).to.equal(FULFILL);
    expect(routine.fulfill.toString()).to.equal(FULFILL);
    expect(routine.fulfill(payload)).to.deep.equal(fulfillAction);
  });

  // it('should be able to change payload to default stages', () => {
  //   const routines = createRoutines(SCHEME);
  //   const result = 
    
  //   expect(routines.trigger).to.be.a('function');
  //   expect(routines.TRIGGER).to.equal(SOME_LONG_TYPE);
  //   expect(routines.someLongType.toString()).to.equal(SOME_LONG_TYPE);
  //   expect(routines.someLongType(payload)).to.deep.equal(someLongTypeAction);
  // })
});