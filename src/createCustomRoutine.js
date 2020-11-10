import { createRoutineCreator } from 'redux-saga-routines';

export default function createCustomRoutine(optionsOrPrefix, stages, payloadCreator, metaCreator){
  if(typeof optionsOrPrefix !== 'string' || typeof optionsOrPrefix !== 'object'){
    throw new Error('`typePrefix` must be a string or object');
  };
  if(!stages || stages.length === 0){
    throw new Error('`stages` must not be empty');
  };

  const stagesArray = [].concat(stages);
  const isObj = typeof optionsOrPrefix === 'object';

  return createRoutineCreator(stagesArray)(
    isObj ? optionsOrPrefix.prefix : optionsOrPrefix,
    isObj ? optionsOrPrefix.payloadCreator : payloadCreator,
    isObj ? optionsOrPrefix.metaCreator : metaCreator
  );
};
