import { describe, it } from 'mocha';
import { expect } from 'chai';

import { createCustomRoutine } from '../src';


describe('createCustomRoutine', () => {

  const PREFIX = 'PREFIX';

  const SOME_LONG_TYPE = `${PREFIX}/SOME_LONG_TYPE`;
  const payload = {
    some: 'data',
  };

  const someAction = {
    type: SOME_LONG_TYPE,
    payload,
  }
  const OTHER = `${PREFIX}/OTHER`;
  const otherAction = {
    type: OTHER,
    payload,
  }

  it('should be a function', () => {
    expect(createCustomRoutine).to.be.a('function');
  });

  it('should throw an error if typePrefix is not a string or not defined', () => {
    expect(() =>  createCustomRoutine()).to.throw('`typePrefix` must be a string');
  });

  it('should throw an error if stages is not defined', () => {
    expect(() =>  createCustomRoutine(PREFIX)).to.throw('`stages` must not be empty');
  });

  it('should create a custom routine', () => {
    const routine = createCustomRoutine(PREFIX, ['SOME_LONG_TYPE', 'OTHER']);

    expect(routine.someLongType).to.be.a('function');
    expect(routine.SOME_LONG_TYPE).to.equal(SOME_LONG_TYPE);
    expect(routine.someLongType.toString()).to.equal(SOME_LONG_TYPE);
    expect(routine.someLongType(payload)).to.deep.equal(someAction);

    expect(routine.other).to.be.a('function');
    expect(routine.OTHER).to.equal(OTHER);
    expect(routine.other.toString()).to.equal(OTHER);
    expect(routine.other(payload)).to.deep.equal(otherAction);
  });

  it('should create extended routine with provided payload creators', () => {
    const routine = createCustomRoutine(PREFIX, ['SOME_LONG_TYPE', 'OTHER'], {
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

    expect(routine).to.be.a('function');
    expect(routine.toString()).to.equal(SOME_LONG_TYPE);
    expect(routine(originalPayload)).to.deep.equal(someLongTypeAction);

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

    const routine = createCustomRoutine(PREFIX, ['SOME_LONG_TYPE'], (payload) => payload, {
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


    expect(routine).to.be.a('function');
    expect(routine.toString()).to.equal(SOME_LONG_TYPE);
    expect(routine(payload)).to.deep.equal(someLongTypeAction);

    expect(routine.someLongType).to.be.a('function');
    expect(routine.SOME_LONG_TYPE).to.equal(SOME_LONG_TYPE);
    expect(routine.someLongType.toString()).to.equal(SOME_LONG_TYPE);
    expect(routine.someLongType(payload)).to.deep.equal(someLongTypeAction);

  });

  it('should create extened routine if types arg is string', () => {

    const routine = createCustomRoutine(PREFIX, 'SOME_LONG_TYPE');

    expect(routine.someLongType).to.be.a('function');
    expect(routine.SOME_LONG_TYPE).to.equal(SOME_LONG_TYPE);
    expect(routine.someLongType.toString()).to.equal(SOME_LONG_TYPE);
    expect(routine.someLongType(payload)).to.deep.equal(someAction);
  });
  
  it('should create a custom routine [object notation]', () => {
    const routine = createCustomRoutine({prefix: PREFIX, stages: ['SOME_LONG_TYPE', 'OTHER']});

    expect(routine.someLongType).to.be.a('function');
    expect(routine.SOME_LONG_TYPE).to.equal(SOME_LONG_TYPE);
    expect(routine.someLongType.toString()).to.equal(SOME_LONG_TYPE);
    expect(routine.someLongType(payload)).to.deep.equal(someAction);

    expect(routine.other).to.be.a('function');
    expect(routine.OTHER).to.equal(OTHER);
    expect(routine.other.toString()).to.equal(OTHER);
    expect(routine.other(payload)).to.deep.equal(otherAction);
  });

  it('should create extended routine with provided payload creators [object notation]', () => {
    const routine = createCustomRoutine({
      prefix: PREFIX,
      stages: ['SOME_LONG_TYPE', 'OTHER'],
      payloadCreator: {
        someLongType: (payload) => payload * 7,
        other: (payload) => payload * 8 
      }
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

    expect(routine).to.be.a('function');
    expect(routine.toString()).to.equal(SOME_LONG_TYPE);
    expect(routine(originalPayload)).to.deep.equal(someLongTypeAction);

    expect(routine.someLongType).to.be.a('function');
    expect(routine.SOME_LONG_TYPE).to.equal(SOME_LONG_TYPE);
    expect(routine.someLongType.toString()).to.equal(SOME_LONG_TYPE);
    expect(routine.someLongType(originalPayload)).to.deep.equal(someLongTypeAction);

    expect(routine.other).to.be.a('function');
    expect(routine.OTHER).to.equal(OTHER);
    expect(routine.other.toString()).to.equal(OTHER);
    expect(routine.other(originalPayload)).to.deep.equal(otherAction);
  });

  it('should create new routine with provided meta creator [object notation]', () => {
    const someLongTypeMeta = { test: 'someLongTypeMeta' };

    const routine = createCustomRoutine({
      prefix: PREFIX,
      stages: ['SOME_LONG_TYPE'],
      payloadCreator: (payload) => payload,
      metaCreator: { someLongType: () => someLongTypeMeta }
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


    expect(routine).to.be.a('function');
    expect(routine.toString()).to.equal(SOME_LONG_TYPE);
    expect(routine(payload)).to.deep.equal(someLongTypeAction);

    expect(routine.someLongType).to.be.a('function');
    expect(routine.SOME_LONG_TYPE).to.equal(SOME_LONG_TYPE);
    expect(routine.someLongType.toString()).to.equal(SOME_LONG_TYPE);
    expect(routine.someLongType(payload)).to.deep.equal(someLongTypeAction);

  });

  it('should create extened routine if types arg is string [object notation]', () => {

    const routine = createCustomRoutine({ prefix: PREFIX, stages: 'SOME_LONG_TYPE'});

    expect(routine.someLongType).to.be.a('function');
    expect(routine.SOME_LONG_TYPE).to.equal(SOME_LONG_TYPE);
    expect(routine.someLongType.toString()).to.equal(SOME_LONG_TYPE);
    expect(routine.someLongType(payload)).to.deep.equal(someAction);
  });
});
