import { describe, it } from 'mocha';
import { expect } from 'chai';

import { createExtendedRoutine } from '../src';

const PREFIX = 'PREFIX';
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
const SOME = `${PREFIX}/SOME_LONG_TYPE`;
const someAction = {
  type: SOME,
  payload,
}
const OTHER = `${PREFIX}/OTHER`;
const otherAction = {
  type: OTHER,
  payload,
}

describe('createExtendedRoutine', () => {
  it('should be a function', () => {
    expect(createExtendedRoutine).to.be.a('function');
  });

  it('should throw an error if typePrefix is not a string', () => {
    expect(() =>  createExtendedRoutine()).to.throw('`typePrefix` must be a string');
  });

  it('should create a routine with more than `redux-saga-routines` default stages', () => {

    const routine = createExtendedRoutine(PREFIX, ['SOME_LONG_TYPE', 'OTHER']);

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

    expect(routine.someLongType).to.be.a('function');
    expect(routine.SOME_LONG_TYPE).to.equal(SOME);
    expect(routine.someLongType.toString()).to.equal(SOME);
    expect(routine.someLongType(payload)).to.deep.equal(someAction);

    expect(routine.other).to.be.a('function');
    expect(routine.OTHER).to.equal(OTHER);
    expect(routine.other.toString()).to.equal(OTHER);
    expect(routine.other(payload)).to.deep.equal(otherAction);
  });

  it('should create extened routine if types arg is string', () => {

    const routine = createExtendedRoutine(PREFIX, 'SOME_LONG_TYPE');

    expect(routine.someLongType).to.be.a('function');
    expect(routine.SOME_LONG_TYPE).to.equal(SOME);
    expect(routine.someLongType.toString()).to.equal(SOME);
    expect(routine.someLongType(payload)).to.deep.equal(someAction);
  });

  it('should create extened routine with long prefix', () => {

    const LONG_PREFIX = 'some/long/prefix'
    const PREFIXED = `${LONG_PREFIX}/SOME_LONG_TYPE`;
    const routine = createExtendedRoutine(LONG_PREFIX, 'SOME_LONG_TYPE');

    expect(routine.SOME_LONG_TYPE).to.equal(PREFIXED);
    expect(routine.someLongType.toString()).to.equal(PREFIXED);
  });

  it('should create extened routine with provided payload creators', () => {

    const routine = createExtendedRoutine(PREFIX, ['SOME_LONG_TYPE', 'OTHER'], {
      someLongType: (payload) => payload * 7,
      other: (payload) => payload * 8,
    });

    const SOME_LONG_TYPE = `${PREFIX}/SOME_LONG_TYPE`
    const OTHER = `${PREFIX}/OTHER`
    const originalPayload = 42;

    const someLongTypeAction = {
      type: SOME_LONG_TYPE,
      payload: 294, // originalPayload * 7,
    }
    const otherAction = {
      type: OTHER,
      payload: 336, // originalPayload * 8,
    }

    expect(routine.someLongType).to.be.a('function');
    expect(routine.SOME_LONG_TYPE).to.equal(SOME_LONG_TYPE);
    expect(routine.someLongType.toString()).to.equal(SOME_LONG_TYPE);
    expect(routine.someLongType(originalPayload)).to.deep.equal(someLongTypeAction);

    expect(routine.other).to.be.a('function');
    expect(routine.OTHER).to.equal(OTHER);
    expect(routine.other.toString()).to.equal(OTHER);
    expect(routine.other(originalPayload)).to.deep.equal(otherAction);
  });


  it('should create new routine with provided meta creator', () => {
    const someLongTypeMeta = { test: 'someLongTypeMeta' };

    const routine = createExtendedRoutine(PREFIX, 'SOME_LONG_TYPE', (payload) => payload, {
      someLongType: () => someLongTypeMeta,
    });

    const SOME_LONG_TYPE = `${PREFIX}/SOME_LONG_TYPE`

    const payload = {
      some: 'data',
    };

    const someLongTypeAction = {
      type: SOME_LONG_TYPE,
      payload,
      meta: someLongTypeMeta,
    };

    expect(routine.someLongType).to.be.a('function');
    expect(routine.SOME_LONG_TYPE).to.equal(SOME_LONG_TYPE);
    expect(routine.someLongType.toString()).to.equal(SOME_LONG_TYPE);
    expect(routine.someLongType(payload)).to.deep.equal(someLongTypeAction);
  });

});
