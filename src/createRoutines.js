import { defaultRoutineStages } from 'redux-saga-routines';
import * as routeCreators from './index'; 


const getCreator = method => {
  const methods = {
    'custom': routeCreators.createCustomRoutine,
    'socket': routeCreators.createSocketRoutine,
    'default': routeCreators.createExtendedRoutine
  };
  return methods[method] || methods['default'];
};

export default function createRoutines(scheme){
  if(typeof scheme !== 'object' || Array.isArray(scheme)){
    throw new Error('`scheme` must be an object');
  };


  let result = {};

  function iterate(obj){
    for(let [nameSpace, value] of Object.entries(obj)) {
      if(nameSpace.startsWith('_')) {
        continue;
      }
      let payloadAndMeta = [null, null];
      let customStages = [];
      let method = '';
      let inside = null;

      if(Array.isArray(value)){
        inside = value[1];
        method = value[0]['method']
      } else {
        inside = value;
        if(typeof value === 'string'){
          method = value;
        }
      }

      if(inside != null && typeof inside === 'object'){
        let insideStages = Object.keys(inside).filter(i => i.startsWith('_'))
        customStages = insideStages.reduce((acc, cur) => !defaultRoutineStages.includes(cur) ? [...acc, cur.substring(1)] : acc ,[]);
        payloadAndMeta = insideStages.reduce((acc, cur) => 
          [
            { ...acc[0], [cur.substring(1).toLowerCase()]: inside[cur] !== null ? inside[cur][0] : null },
            { ...acc[1], [cur.substring(1).toLowerCase()]: inside[cur] !== null ? inside[cur][1] : null }
          ],
          payloadAndMeta
        );
      } 

      result[nameSpace] = getCreator(method).apply(null, [nameSpace, customStages, ...payloadAndMeta]);

      if (typeof inside === "object" && inside != null){
        iterate(inside);
      }
    }
  }

  iterate(scheme);
  return result;
};
