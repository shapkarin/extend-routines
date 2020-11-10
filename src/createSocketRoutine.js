import { createRoutineCreator } from 'redux-saga-routines';

export const defaultSocketStages = ['CONNECTED', 'DISCONNECTED', 'JOIN_CHANNEL', 'CHANNEL_JOINED', 'LEAVE_CHANNEL', 'CHANNEL_LEAVED'];

export default function createSocketRoutine(optionsOrPrefix, stages = [], payloadCreator, metaCreator){
  if(typeof optionsOrPrefix !== 'string' || typeof optionsOrPrefix !== 'object'){
    throw new Error('`typePrefix` must be a string');
  };

  const allStages = defaultSocketStages.concat(stages);
  const isObj = typeof optionsOrPrefix === 'object';

  return createRoutineCreator(allStages)(
    isObj ? optionsOrPrefix.prefix : optionsOrPrefix,
    isObj ? optionsOrPrefix.payloadCreator : payloadCreator,
    isObj ? optionsOrPrefix.metaCreator : metaCreator
  );
};
