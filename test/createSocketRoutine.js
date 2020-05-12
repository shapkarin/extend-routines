import { describe, it } from 'mocha';
import { expect } from 'chai';

import { createSocketRoutine, defaultSocketStages } from '../src';


describe('createSokcetRoutine', () => {

  const PREFIX = 'PREFIX';
  const CONNECTED = `${PREFIX}/CONNECTED`;
  const DISCONNECTED = `${PREFIX}/DISCONNECTED`;
  const JOIN_CHANNEL = `${PREFIX}/JOIN_CHANNEL`;
  const CHANNEL_JOINED = `${PREFIX}/CHANNEL_JOINED`;
  const LEAVE_CHANNEL = `${PREFIX}/LEAVE_CHANNEL`;
  const CHANNEL_LEAVED = `${PREFIX}/CHANNEL_LEAVED`;
  const payload = {
    some: 'data',
  };
  const connectedAction = {
    type: CONNECTED,
    payload,
  };
  const disconnectedAction = {
    type: DISCONNECTED,
    payload,
  };
  const joinChannelAction = {
    type: JOIN_CHANNEL,
    payload,
  };
  const channelJoinedAction = {
    type: CHANNEL_JOINED,
    payload,
  };
  const leaveChannelAction = {
    type: LEAVE_CHANNEL,
    payload,
  };
  const channelLeavedAction = {
    type: CHANNEL_LEAVED,
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

  it('should be a function', () => {
    expect(createSocketRoutine).to.be.a('function');
  });

  it('should throw an error if typePrefix is not a string', () => {
    expect(() =>  createSocketRoutine()).to.throw('`typePrefix` must be a string');
  });

  it('should create a routine with more than `redux-saga-routines` default stages', () => {

    const stages = ['SOME_LONG_TYPE', 'OTHER'];
    const routine = createSocketRoutine(PREFIX, stages);

    expect(routine._STAGES).to.deep.equal([...defaultSocketStages, ...stages]);

    expect(routine.connected).to.be.a('function');
    expect(routine.CONNECTED).to.equal(CONNECTED);
    expect(routine.connected.toString()).to.equal(CONNECTED);
    expect(routine.connected(payload)).to.deep.equal(connectedAction);

    expect(routine.disconnected).to.be.a('function');
    expect(routine.DISCONNECTED).to.equal(DISCONNECTED);
    expect(routine.disconnected.toString()).to.equal(DISCONNECTED);
    expect(routine.disconnected(payload)).to.deep.equal(disconnectedAction);

    expect(routine.joinChannel).to.be.a('function');
    expect(routine.JOIN_CHANNEL).to.equal(JOIN_CHANNEL);
    expect(routine.joinChannel.toString()).to.equal(JOIN_CHANNEL);
    expect(routine.joinChannel(payload)).to.deep.equal(joinChannelAction);

    expect(routine.channelJoined).to.be.a('function');
    expect(routine.CHANNEL_JOINED).to.equal(CHANNEL_JOINED);
    expect(routine.channelJoined.toString()).to.equal(CHANNEL_JOINED);
    expect(routine.channelJoined(payload)).to.deep.equal(channelJoinedAction);

    expect(routine.leaveChannel).to.be.a('function');
    expect(routine.LEAVE_CHANNEL).to.equal(LEAVE_CHANNEL);
    expect(routine.leaveChannel.toString()).to.equal(LEAVE_CHANNEL);
    expect(routine.leaveChannel(payload)).to.deep.equal(leaveChannelAction);

    expect(routine.channelLeaved).to.be.a('function');
    expect(routine.CHANNEL_LEAVED).to.equal(CHANNEL_LEAVED);
    expect(routine.channelLeaved.toString()).to.equal(CHANNEL_LEAVED);
    expect(routine.channelLeaved(payload)).to.deep.equal(channelLeavedAction);

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

    const routine = createSocketRoutine(PREFIX, 'SOME_LONG_TYPE');

    expect(routine.someLongType).to.be.a('function');
    expect(routine.SOME_LONG_TYPE).to.equal(SOME);
    expect(routine.someLongType.toString()).to.equal(SOME);
    expect(routine.someLongType(payload)).to.deep.equal(someAction);
  });

  it('should create extened routine with long prefix', () => {

    const LONG_PREFIX = 'some/long/prefix'
    const PREFIXED = `${LONG_PREFIX}/SOME_LONG_TYPE`;
    const routine = createSocketRoutine(LONG_PREFIX, 'SOME_LONG_TYPE');

    expect(routine.SOME_LONG_TYPE).to.equal(PREFIXED);
    expect(routine.someLongType.toString()).to.equal(PREFIXED);
  });

  it('should create extened routine with provided payload creators', () => {

    const routine = createSocketRoutine(PREFIX, ['SOME_LONG_TYPE', 'OTHER'], {
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

    const routine = createSocketRoutine(PREFIX, 'SOME_LONG_TYPE', (payload) => payload, {
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
