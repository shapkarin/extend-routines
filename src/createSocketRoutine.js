import { createRoutineCreator } from 'redux-saga-routines';

export default function createSocketRoutine(typePrefix, stages = [], payloadCreator, metaCreator){
  if(typeof typePrefix !== 'string'){
    throw new Error('`typePrefix` must be a string');
  };

  const defaultSocketStages = ['CONNECTED', 'DISCONNECTED', 'SENDED', 'RECEIVED'];

  const allStages = defaultSocketStages.concat(stages);

  return createRoutineCreator(allStages)(typePrefix, payloadCreator, metaCreator);
};
