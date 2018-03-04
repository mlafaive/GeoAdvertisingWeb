export function stats(state = '', action) {
  switch (action.type) {
    case 'LOAD_STATS':
      return action.stats;
    default:
      return state;
  }
}
export function currentUrl(state = '', action) {
  switch (action.type) {
    case 'UPDATE_CURRENT_URL':
      return action.currentUrl;
    default:
      return state;
  }
}