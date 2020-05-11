import { createRoutineCreator } from 'redux-saga-routines';

export default function createCustomRoutine(typePrefix, stages, payloadCreator, metaCreator){
  if(typeof typePrefix !== 'string'){
    throw new Error('`typePrefix` must be a string');
  };
  if(!stages || stages.length === 0){
    throw new Error('`stages` must not be empty');
  };

  const stagesArray = [].concat(stages);

  return createRoutineCreator(stagesArray)(typePrefix, payloadCreator, metaCreator);
};
