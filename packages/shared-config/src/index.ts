export const APP_CONFIG = {
  API_PREFIX: '/api/v1',
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Invalid email format',
  MIN_LENGTH: (length: number) => `Minimum length is ${length} characters`,
  MAX_LENGTH: (length: number) => `Maximum length is ${length} characters`,
};
