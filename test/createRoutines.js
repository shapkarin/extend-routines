import { describe, it } from 'mocha';
import { expect } from 'chai';
import { defaultRoutineStages } from 'redux-saga-routines';

import { createRoutines, defaultSocketStages } from '../src';

const SCHEME = {
  default: null,
  multiplyPayloads: {
    _TRIGGER: [(payload) => payload * 2],
    _REQUEST: [(payload) => payload * 3],
    _SUCCESS: [(payload) => payload * 4],
    _FAILURE: [(payload) => payload * 5],
    _FULFILL: [(payload) => payload * 6]
  },
  customMeta: {
    _TRIGGER: [null, () => ({ some: 'data' })],
    _REQUEST: [null, () => ({ some: 'data' })],
    _SUCCESS: [null, () => ({ some: 'data' })],
    _FAILURE: [null, () => ({ some: 'data' })],
    _FULFILL: [null, () => ({ some: 'data' })]
  },
  additionalStages: {
    _ANY: null,
    _CUSTOM_PAYLOAD: [
      (payload) => payload * 2
    ],
    _CUSTOM_META: [
      null,
      () => ({ some: 'info' })
    ],
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
  socketRoutine: [
    { method: 'socket' },
  ],
  socketRoutineExtend: [
    { method: 'socket' },
    {
      _ADD: null
    }
  ],
  stringDefineDefault: 'default',
  stringDefineSocket: 'socket',
}

describe('create a bunch of routines with `createRoutines`', () => { 

  const routines = createRoutines(SCHEME);
  
  it('should throw an error if scheme is undefined or not an object', () => {
    expect(() => createRoutines()).to.throw('`scheme` must be an object');
  });

  it('should create default routine', () => {
    const routine = routines.default;
    
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

  it('should change payload to default stages', () => {
    const routine = routines.multiplyPayloads;
    
    const PREFIX = 'multiplyPayloads';
    const TRIGGER = `${PREFIX}/TRIGGER`;
    const REQUEST = `${PREFIX}/REQUEST`;
    const SUCCESS = `${PREFIX}/SUCCESS`;
    const FAILURE = `${PREFIX}/FAILURE`;
    const FULFILL = `${PREFIX}/FULFILL`;

    const originalPayload = 42;

    const triggerAction = {
      type: TRIGGER,
      payload: 84, // originalPayload * 2
    };
    const requestAction = {
      type: REQUEST,
      payload: 126, // originalPayload * 3,
    };
    const successAction = {
      type: SUCCESS,
      payload: 168, // originalPayload * 4,
    };
    const failureAction = {
      type: FAILURE,
      payload: 210, // originalPayload * 5,
    };
    const fulfillAction = {
      type: FULFILL,
      payload: 252, // originalPayload * 6,
    };
    
    expect(routine).to.be.a('function');
    expect(routine.toString()).to.equal(TRIGGER);
    expect(routine(originalPayload)).to.deep.equal(triggerAction);

    expect(routine.trigger).to.be.a('function');
    expect(routine.TRIGGER).to.equal(TRIGGER);
    expect(routine.trigger.toString()).to.equal(TRIGGER);
    expect(routine.trigger(originalPayload)).to.deep.equal(triggerAction);

    expect(routine.request).to.be.a('function');
    expect(routine.REQUEST).to.equal(REQUEST);
    expect(routine.request.toString()).to.equal(REQUEST);
    expect(routine.request(originalPayload)).to.deep.equal(requestAction);

    expect(routine.success).to.be.a('function');
    expect(routine.SUCCESS).to.equal(SUCCESS);
    expect(routine.success.toString()).to.equal(SUCCESS);
    expect(routine.success(originalPayload)).to.deep.equal(successAction);

    expect(routine.failure).to.be.a('function');
    expect(routine.FAILURE).to.equal(FAILURE);
    expect(routine.failure.toString()).to.equal(FAILURE);
    expect(routine.failure(originalPayload)).to.deep.equal(failureAction);

    expect(routine.fulfill).to.be.a('function');
    expect(routine.FULFILL).to.equal(FULFILL);
    expect(routine.fulfill.toString()).to.equal(FULFILL);
    expect(routine.fulfill(originalPayload)).to.deep.equal(fulfillAction);
    
  });

  it('should change meta to default stages', () => {
    const routine = routines.customMeta;
    
    const PREFIX = 'customMeta';
    const TRIGGER = `${PREFIX}/TRIGGER`;
    const REQUEST = `${PREFIX}/REQUEST`;
    const SUCCESS = `${PREFIX}/SUCCESS`;
    const FAILURE = `${PREFIX}/FAILURE`;
    const FULFILL = `${PREFIX}/FULFILL`;

    const meta = { some: 'data' };

    const triggerAction = {
      type: TRIGGER,
      meta
    };
    const requestAction = {
      type: REQUEST,
      meta
    };
    const successAction = {
      type: SUCCESS,
      meta
    };
    const failureAction = {
      type: FAILURE,
      meta
    };
    const fulfillAction = {
      type: FULFILL,
      meta
    };
    
    expect(routine).to.be.a('function');
    expect(routine.toString()).to.equal(TRIGGER);
    expect(routine()).to.deep.equal(triggerAction);

    expect(routine.trigger).to.be.a('function');
    expect(routine.TRIGGER).to.equal(TRIGGER);
    expect(routine.trigger.toString()).to.equal(TRIGGER);
    expect(routine.trigger()).to.deep.equal(triggerAction);

    expect(routine.request).to.be.a('function');
    expect(routine.REQUEST).to.equal(REQUEST);
    expect(routine.request.toString()).to.equal(REQUEST);
    expect(routine.request()).to.deep.equal(requestAction);

    expect(routine.success).to.be.a('function');
    expect(routine.SUCCESS).to.equal(SUCCESS);
    expect(routine.success.toString()).to.equal(SUCCESS);
    expect(routine.success()).to.deep.equal(successAction);

    expect(routine.failure).to.be.a('function');
    expect(routine.FAILURE).to.equal(FAILURE);
    expect(routine.failure.toString()).to.equal(FAILURE);
    expect(routine.failure()).to.deep.equal(failureAction);

    expect(routine.fulfill).to.be.a('function');
    expect(routine.FULFILL).to.equal(FULFILL);
    expect(routine.fulfill.toString()).to.equal(FULFILL);
    expect(routine.fulfill()).to.deep.equal(fulfillAction);
    
  });

  it('should add custom stages to routine', () => {
    const routine = routines.additionalStages;

    expect(routine._STAGES).to.deep.equal([...defaultRoutineStages, 'ANY', 'CUSTOM_PAYLOAD', 'CUSTOM_META']);
    // expect(routine._PREFIX).to.equal(PREFIX);

    const PREFIX = 'additionalStages';
    const ANY = `${PREFIX}/ANY`;
    const payload = { some: 'data' }
    const anyAction = {
      type: `${PREFIX}/ANY`,
      payload
    }

    expect(routine.any).to.be.a('function');
    expect(routine.ANY).to.equal(ANY);
    expect(routine.any.toString()).to.equal(ANY);
    expect(routine.any(payload)).to.deep.equal(anyAction);
  });

  it('should add payloadCreator to custom stage', () => {
    const routine = createRoutines(SCHEME).additionalStages;

    const PREFIX = 'additionalStages';
    const payload = 42;
    const customPayloadAction = {
      type: `${PREFIX}/CUSTOM_PAYLOAD`,
      payload: 84 // 42 * 2
    }

    expect(routine.customPayload(payload)).to.deep.equal(customPayloadAction);
  });

  it('should add metaCreator to custom stage', () => {
    const routine = routines.additionalStages;

    const PREFIX = 'additionalStages';
    const payload = 42;
    const customMetaAction = {
      type: `${PREFIX}/CUSTOM_META`,
      payload,
      meta: { 
        some: 'info'
      }
    }

    expect(routine.customMeta(payload)).to.deep.equal(customMetaAction);
  });

  it('should create a custom routines (without deafult stages)', () => {
    const routine = routines.customRoutine;

    expect(routine._STAGES).to.deep.equal(['OPEN', 'CLOSE']);
  });

  it('should create a socket routine', () => {
    const routine = routines.socketRoutine;

    expect(routine._STAGES).to.deep.equal(defaultSocketStages);
  });

  it('should create a socket routine with extend stages', () => {
    const routine = routines.socketRoutineExtend;

    expect(routine._STAGES).to.deep.equal([...defaultSocketStages, 'ADD']);
  });

  it('should works fine with routines method as a string', () => {
    const { stringDefineDefault, stringDefineSocket } = createRoutines(SCHEME);

    expect(stringDefineDefault._STAGES).to.deep.equal(defaultRoutineStages);
    expect(stringDefineSocket._STAGES).to.deep.equal([...defaultSocketStages]);
  });

  // it('should use scheme nesting', () => {})

});