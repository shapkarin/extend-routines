import { createRoutineCreator, defaultRoutineStages } from 'redux-saga-routines';

export default function createExtendedRoutine(optionsOrPrefix, stages = [], payloadCreator, metaCreator){
  if(typeof optionsOrPrefix !== 'string' || typeof optionsOrPrefix !== 'object'){
    throw new Error('`typePrefix` must be a string or object');
  };

  const allStages = defaultRoutineStages.concat(stages);
  const isObj = typeof optionsOrPrefix === 'object';
  
  return createRoutineCreator(allStages)(
    isObj ? optionsOrPrefix.prefix : optionsOrPrefix,
    isObj ? optionsOrPrefix.payloadCreator : payloadCreator,
    isObj ? optionsOrPrefix.metaCreator : metaCreator
  );
};