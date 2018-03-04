export function stripeToken(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_STRIPE_TOKEN':
      return action.stripeToken;
    default:
      return state;
  }
}
