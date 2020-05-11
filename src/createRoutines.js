import { createRoutineCreator, defaultRoutineStages } from 'redux-saga-routines';

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
      let allStages = [];
      let payloadAndMeta = [];
      let customStages = [];
      let method = '';
      let inside = null;

      if(Array.isArray(value)){
        method = value[0].method;
        inside = value[1];
      } else {
        inside = value;
      }

      if(inside != null){
        let insideStages = Object.keys(inside).filter(i => i.startsWith('_'))
        customStages = insideStages.reduce((acc, cur) => !defaultRoutineStages.includes(cur) ? [...acc, cur.substring(1)] : acc ,[]);
        payloadAndMeta = insideStages.reduce((acc, cur) => 
          [
            { ...acc[0], [cur.substring(1).toLowerCase()]: inside[cur] !== null ? inside[cur][0] : null },
            { ...acc[1], [cur.substring(1).toLowerCase()]: inside[cur] !== null ? inside[cur][1] : null }
          ],
          payloadAndMeta
        );
      } else if(!nameSpace.startsWith('_')){
        
      }

      switch(method) {
        case 'custom':
          allStages = customStages;
          break;
        default:
          allStages = [...defaultRoutineStages, ...customStages]
      }

      result[nameSpace] = createRoutineCreator(allStages).apply(null, [nameSpace, ...payloadAndMeta]);

      if (typeof inside === "object" && inside != null){
        iterate(inside);
      }
    }
  }

  iterate(scheme);
  return result;
};
