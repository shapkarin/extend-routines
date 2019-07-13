import { createRoutineCreator, defaultRoutineStages } from 'redux-saga-routines';

export default function createExtendedRoutine(typePrefix, stages, payloadCreator, metaCreator){
  if(typeof typePrefix !== 'string'){
    throw new Error('`typePrefix` must be a string');
  }
  if(!stages || stages.length === 0){
    throw new Error('`stages` must not be empty');
  }

  const allStages = defaultRoutineStages.concat(stages);
  
  return createRoutineCreator(allStages)(typePrefix, payloadCreator, metaCreator);
};