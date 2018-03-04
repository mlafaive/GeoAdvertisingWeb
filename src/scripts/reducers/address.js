const initialState = {
  name: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  zipcode: '',
};

export function returnAddress(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_RETURN_ADDRESS':
      return action.returnAddress;
    default:
      return state;
  }
}
