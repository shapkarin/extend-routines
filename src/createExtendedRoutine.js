import routineStages from './routineStages';
import createRoutineCreator from './createRoutineCreator';

import { isFunction } from './utils';


export default function createExtendedRoutine(input, stages, payloadCreator, metaCreator) {
  const typePrefix = isFunction(input) ? input.toString().replace(/\/([^\/]+)\/?$/, '') : input;

  const extendedStages = [...routineStages, ...[].concat(stages)];
  const extendedRoutineCreator = createRoutineCreator(extendedStages);

  return extendedRoutineCreator(typePrefix, payloadCreator, metaCreator);
}
