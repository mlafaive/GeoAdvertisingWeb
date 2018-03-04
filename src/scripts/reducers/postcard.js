export function currentPostcard(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_CURRENT_POSTCARD':
      return action.currentPostcard;
    default:
      return state;
  }
}
