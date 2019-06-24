import { describe, it } from 'mocha';
import { expect } from 'chai';
import { createRoutine } from 'redux-saga-routines';

import extendRoutine from '../src/index';


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

describe('extendRoutine', () => {
  it('should be a function', () => {
    expect(extendRoutine).to.be.a('function');
  });

  it('should create an extened routine', () => {

    const routine = extendRoutine(createRoutine(PREFIX), ['SOME_LONG_TYPE', 'OTHER']);

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

    const routine = extendRoutine(createRoutine(PREFIX), 'SOME_LONG_TYPE');

    expect(routine.someLongType).to.be.a('function');
    expect(routine.SOME_LONG_TYPE).to.equal(SOME);
    expect(routine.someLongType.toString()).to.equal(SOME);
    expect(routine.someLongType(payload)).to.deep.equal(someAction);
  });

  it('should create extened routine with long prefix', () => {

    const LONG_PREFIX = 'some/long/prefix'
    const PREFIXED = `${LONG_PREFIX}/SOME_LONG_TYPE`;
    const routine = extendRoutine(createRoutine(LONG_PREFIX), 'SOME_LONG_TYPE');

    expect(routine.SOME_LONG_TYPE).to.equal(PREFIXED);
    expect(routine.someLongType.toString()).to.equal(PREFIXED);
  });

});
