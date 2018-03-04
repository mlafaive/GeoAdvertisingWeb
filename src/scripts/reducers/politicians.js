export function selectedPoliticians(state = {}, action) {
  switch (action.type) {
    case 'ADD_POLITICIAN':
      if(state.length) {
        var tempArr = [];
        Object.assign(tempArr, state);
        for(var i = 0; i < state.length; ++i) {
          if(state[i].name == action.politician.name) {
            // do not add politician to selectedPoliticians list
            // but do increment the postcard count
            console.log("hello it is me");
            if(tempArr[i].numberPostcards < 999) {
              ++tempArr[i].numberPostcards;
            }
            return tempArr;
          }
        }
        tempArr.push(action.politician);
        return tempArr;
      }
      else {
        return [action.politician];
      }
    case 'DELETE_POLITICIAN':
    case 'REMOVE_POLITICIAN':
      for(var i = 0; i < state.length; ++i) {
        if(state[i] == action.politician) {
          var tempArr = [];
          Object.assign(tempArr, state);
          tempArr.splice(i, 1);
          return tempArr;
        }
      }
      return state;
    case 'INCREMENT_POLITICIAN_POSTCARD':
      for(var i = 0; i < state.length; ++i) {
        if(state[i] == action.politician) {
          var tempArr = [];
          Object.assign(tempArr, state);
          if(tempArr[i].numberPostcards < 999) {
            ++tempArr[i].numberPostcards;
          }
          return tempArr;
        }
      }
      return state;
    case 'DECREMENT_POLITICIAN_POSTCARD':
      for(var i = 0; i < state.length; ++i) {
        if(state[i] == action.politician) {
          var tempArr = [];
          Object.assign(tempArr, state);
          if(tempArr[i].numberPostcards > 1) {
            --tempArr[i].numberPostcards;
          }
          return tempArr;
        }
      }
      return state;
    case 'CLEAR_POLITICIANS':
      return [];
    default:
      return state;
  }
}

export function nonSelectedPoliticians(state = {}, action) {
  switch (action.type) {
    case 'REMOVE_POLITICIAN':
      action.politician.numberPostcards = 1;
      if(state.length) {
        for(var i = 0; i < state.length; ++i) {
          if(state[i].name == action.politician.name) {
            // do not add politician to nonSelectedPoliticians list
            return state;
          }
        }
        var tempArr = [];
        Object.assign(tempArr, state);
        tempArr.unshift(action.politician);
        return tempArr;
      }
      else {
        return [action.politician];
      }
    case 'DELETE_POLITICIAN':
    case 'ADD_POLITICIAN':
      for(var i = 0; i < state.length; ++i) {
        if(state[i] == action.politician) {
          var tempArr = [];
          Object.assign(tempArr, state);
          tempArr.splice(i, 1);
          return tempArr;
        }
      }
      return state;
    case 'POPULATE_POLITICIANS':
      return action.politicians;
    case 'CLEAR_POLITICIANS':
      return [];
    default:
      return state;
  }
}
