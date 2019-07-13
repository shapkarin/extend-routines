import { createAction } from 'redux-actions';
import { createRoutineCreator } from 'redux-saga-routines';

export default function extendRoutine(routine, stages, payloadCreator, metaCreator){
  if(routine === undefined){
    throw new Error('`routine` must not be empty')
  }
  if(!stages || stages.length === 0){
    throw new Error('`stages` must not be empty')
  }

  const allStages = routine._STAGES.concat(stages);

  return createRoutineCreator(allStages)(routine._PREFIX, payloadCreator, metaCreator);
}
