export function updateCurrentUrl(url) {
  return {
    type: 'UPDATE_CURRENT_URL',
    currentUrl: url,
  };
}