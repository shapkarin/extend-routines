import { createAction } from 'redux-actions';

const toCamelCase = string => string.toLowerCase().replace(/[_.\- ]+(\w|$)/g, (_, p1) => p1.toUpperCase());
const isFunction = value => typeof value === 'function';
const getCreatorForType = (type, creator) => {
  if (!creator) {
    return creator;
  }
  if (isFunction(creator[type])) {
    return creator[type];
  }
  if (isFunction(creator[toCamelCase(type)])) {
    return creator[toCamelCase(type)];
  }
  if (isFunction(creator)) {
    return creator;
  }
  return undefined;
};

export default function extendRoutine(routine, types, payloadCreator, metaCreator){
  if(routine === undefined){
    throw new Error('routine is undefined')
  }
  if(types === undefined){
    throw new Error('types is undefined')
  }
  const createActionCreator = ({ type, typePrefix }) => createAction(`${typePrefix}/${type}`, getCreatorForType(type, payloadCreator), getCreatorForType(type, metaCreator));
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
