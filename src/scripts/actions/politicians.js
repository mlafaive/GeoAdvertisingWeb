export function addPolitician(politician) {
  return {
    type: 'ADD_POLITICIAN',
    politician: politician,
  };
}

export function removePolitician(politician) {
  return {
    type: 'REMOVE_POLITICIAN',
    politician: politician,
  };
}

export function populatePoliticians(politicians) {
  return {
    type: 'POPULATE_POLITICIANS',
    politicians: politicians,
  };
}

export function deletePolitician(politician) {
  return {
    type: 'DELETE_POLITICIAN',
    politician: politician,
  };
}

export function clearPoliticians() {
  return {
    type: 'CLEAR_POLITICIANS',
  };
}

export function incrementPostcardCount(politician) {
  return {
    type: 'INCREMENT_POLITICIAN_POSTCARD',
    politician: politician,
  };
}

export function decrementPostcardCount(politician) {
  return {
    type: 'DECREMENT_POLITICIAN_POSTCARD',
    politician: politician,
  };
}
