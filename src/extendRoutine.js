import { createAction } from 'redux-actions';


const createActionCreator = ({ type, typePrefix }) => createAction(`${typePrefix}/${type}`);
const toCamelCase = string => string.toLowerCase().replace(/[_.\- ]+(\w|$)/g, (_, p1) => p1.toUpperCase())

export default function extendRoutine(routine, types = []){
  const triggerType = routine.toString();
  const typePrefix = triggerType.substring(0, triggerType.lastIndexOf('/'));
  const stages = typeof types === 'string' ? [types] : types;

  return stages.reduce(
    (result, stage) => {
      const actionCreator = createActionCreator({ type: stage, typePrefix });
      return Object.assign(result, {
        [toCamelCase(stage)]: actionCreator,
        [stage.toUpperCase()]: actionCreator.toString(),
      });
    },
    routine
  );
}
