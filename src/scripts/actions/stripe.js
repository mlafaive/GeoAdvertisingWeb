export function updateStripeToken(token) {
  return {
    type: 'UPDATE_STRIPE_TOKEN',
    stripeToken: token,
  };
}
