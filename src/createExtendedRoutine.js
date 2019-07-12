import { createRoutineCreator, defaultRoutineStages } from 'redux-saga-routines';

import toArray from './toArray';

export default function createExtendedRoutine(typePrefix, stages, payloadCreator, metaCreator){
  const stagesArray = toArray(stages);
  
  if(typeof typePrefix !== 'string'){
    throw new Error('`typePrefix` must be a string');
  }
  if(!stages || stagesArray.length === 0){
    throw new Error('`stages` must not be empty');
  }

  const allStages = [...defaultRoutineStages, ...stagesArray];
  return createRoutineCreator(allStages)(typePrefix, payloadCreator, metaCreator);
};