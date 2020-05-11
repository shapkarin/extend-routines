import { createRoutineCreator } from 'redux-saga-routines';

export const defaultSocketStages = ['CONNECTED', 'DISCONNECTED', 'JOIN_CHANNEL', 'CHANNEL_JOINED', 'LEAVE_CHANNEL', 'CHANNEL_LEAVED'];

export default function createSocketRoutine(typePrefix, stages, payloadCreator, metaCreator){
  if(typeof typePrefix !== 'string'){
    throw new Error('`typePrefix` must be a string');
  };
  if(!stages || stages.length === 0){
    throw new Error('`stages` must not be empty');
  };

  const allStages = defaultSocketStages.concat(stages);

  return createRoutineCreator(allStages)(typePrefix, payloadCreator, metaCreator);
};
