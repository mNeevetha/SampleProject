export const FLASH_MESSAGE__CREATE = 'FLASH_MESSAGE__CREATE';
export const FLASH_MESSAGE__DELETE = 'FLASH_MESSAGE__DELETE';

const DEFAULT_ERROR_MESSAGE = 'Oops something went wrong!';

export function createErrorMessage(text = DEFAULT_ERROR_MESSAGE) {
  const errorMessage = { text, messageType: 'error' };

  return { type: FLASH_MESSAGE__CREATE, errorMessage };
}

export function deleteMessage() {
  return { type: FLASH_MESSAGE__DELETE };
}
