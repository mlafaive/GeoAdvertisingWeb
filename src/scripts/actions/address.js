export function updateReturnAddress(address) {
  return {
    type: 'UPDATE_RETURN_ADDRESS',
    returnAddress: address,
  };
}
