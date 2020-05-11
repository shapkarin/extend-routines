import { createRoutineCreator, defaultRoutineStages } from 'redux-saga-routines';

export default function createRoutines(scheme){
  if(typeof scheme !== 'object' || Array.isArray(scheme)){
    throw new Error('`typePrefix` must be an object');
  };

  let result = {};

  function iterate(obj){
    for(let [prefix, inside] of Object.entries(obj)) {
      if(prefix.startsWith('_')) {
        continue;
      }
      
      let payloadAndMeta = {payload: () => {}, meta: () => {}};
      if(inside != null){
        payloadAndMeta = Object.keys(inside).reduce((acc, cur) => 
          cur.startsWith('_') ? 
            { ...acc,
              payload: { ...acc.payload, [cur.substring(1).toLowerCase()]: inside[cur].payload },
              meta: { ...acc.meta, [cur.substring(1).toLowerCase()]: inside[cur].meta }
            } 
            :
            acc,
          payloadAndMeta
        );
      }

      result[prefix] = createRoutineCreator(defaultRoutineStages)(prefix, {...payloadAndMeta});

      if (typeof inside == "object" && inside != null){
        iterate(inside);
      } 
    }
  }

  iterate({
    people: {
      search: {
        _TRIGGER: {
          payload: ({ phone }) => parseInt(phone, 2),
          meta: () => ({ trigger: true })
        },
        otherNameSpace: null
       },
      add: null,
      remove: null
    }
  });

  console.log(result.search.trigger({ phone: 101010 }));
  ///console.log(result);

};
