import { describe, it } from 'mocha';
import { expect } from 'chai';

import { createRoutines } from '../src';
import { defaultRoutineStages } from 'redux-saga-routines';

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
  people: {
    search: {
      _ANY: null,
      _CUSTOM_PAYLOAD: [
        (payload) => payload * 2
      ],
      _CUSTOM_META: [
        null,
        () => ({ some: 'info' })
      ],
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

  it('should change payload to default stages', () => {
    const routine = createRoutines(SCHEME).multiplyPayloads;
    
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
    const routine = createRoutines(SCHEME).customMeta;
    
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
    const routine = createRoutines(SCHEME).search;

    expect(routine._STAGES).to.deep.equal([...defaultRoutineStages, 'ANY', 'CUSTOM_PAYLOAD', 'CUSTOM_META']);
    // expect(routine._PREFIX).to.equal(PREFIX);

    const PREFIX = 'search';
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
    const routine = createRoutines(SCHEME).search;

    const PREFIX = 'search';
    const payload = 42;
    const customPayloadAction = {
      type: `${PREFIX}/CUSTOM_PAYLOAD`,
      payload: 84 // 42 * 2
    }

    expect(routine.customPayload(payload)).to.deep.equal(customPayloadAction);
  });

  it('should add metaCreator to custom stage', () => {
    const routine = createRoutines(SCHEME).search;

    const PREFIX = 'search';
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

});