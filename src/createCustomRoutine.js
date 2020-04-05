import { createRoutineCreator } from 'redux-saga-routines';

export default function createCustomRoutine(typePrefix, stages, payloadCreator, metaCreator){
  if(typeof typePrefix !== 'string'){
    throw new Error('`typePrefix` must be a string');
  };
  if(!Array.isArray(stages)){
    throw new Error('createCustomRoutine `stages` must be an array');
  };

  return createRoutineCreator(stages)(typePrefix, payloadCreator, metaCreator);
};
