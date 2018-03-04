export function updateCurrentPostcard(postcard) {
  return {
    type: 'UPDATE_CURRENT_POSTCARD',
    currentPostcard: postcard,
  };
}
