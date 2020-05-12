import { createRoutineCreator, defaultRoutineStages } from 'redux-saga-routines';

export default function createExtendedRoutine(typePrefix, stages, payloadCreator, metaCreator){
  if(typeof typePrefix !== 'string'){
    throw new Error('`typePrefix` must be a string');
  };
  const allStages = defaultRoutineStages.concat(stages);
  
  return createRoutineCreator(allStages)(typePrefix, payloadCreator, metaCreator);
};