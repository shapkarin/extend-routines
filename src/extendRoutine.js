import { createRoutineCreator } from 'redux-saga-routines';

export default function extendRoutine(routine, optionsOrStages, payloadCreator, metaCreator){
  if(routine === undefined){
    throw new Error('`routine` must not be empty')
  }
  if(!optionsOrStages.payloadCreator || !stages || stages.length === 0){
    throw new Error('`stages` must not be empty')
  }

  const allStages = routine._STAGES.concat(stages);
  const isObj = typeof optionsOrtypePrefix === 'object';

  return createRoutineCreator(allStages)(
    routine._PREFIX,
    isObj ? optionsOrPrefix.payloadCreator : payloadCreator,
    isObj ? optionsOrPrefix.metaCreator : metaCreator
  );
}
