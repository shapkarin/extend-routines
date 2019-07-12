import { createAction } from 'redux-actions';
import { createRoutineCreator } from 'redux-saga-routines';

import toArray from './toArray';

export default function extendRoutine(routine, stages, payloadCreator, metaCreator){
  if(routine === undefined){
    throw new Error('`routine` must not be empty')
  }
  if(stages === undefined){
    throw new Error('`stages` must not be empty')
  }

  const allStages = [...routine._STAGES, ...toArray(stages)];
  
  return createRoutineCreator(allStages)(routine._PREFIX, payloadCreator, metaCreator);
}
