import { createAction } from 'redux-actions';

const createActionCreator = ({ type, typePrefix }) => createAction(`${typePrefix}/${type}`);
const toCamelCase = string => string.toLowerCase().replace(/[_.\- ]+(\w|$)/g, (_, p1) => p1.toUpperCase());

export default function extendRoutine(routine, types){
  if(routine === undefined){
    throw new Error('routine is undefined')
  }
  if(types === undefined){
    throw new Error('types is undefined')
  }
  const typePrefix = routine.toString().replace(/\/([^\/]+)\/?$/, '')
  const stages = [].concat(types);

  return stages.reduce(
    (result, stage) => {
      const actionCreator = createActionCreator({ type: stage, typePrefix });
      return Object.assign(result, {
        [toCamelCase(stage)]: actionCreator,
        [stage.toUpperCase()]: actionCreator.toString(),
      })
    },
    routine
  );
}