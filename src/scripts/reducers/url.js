export function currentUrl(state = '', action) {
  switch (action.type) {
    case 'UPDATE_CURRENT_URL':
      return action.currentUrl;
    default:
      return state;
  }
}