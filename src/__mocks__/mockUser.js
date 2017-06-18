const defaultMockUserAttributes = {
  email: 'user@example.com',
  id: 1,
  firstName: 'User',
  lastName: 'Name',
  createdAt: '',
  updatedAt: '',
};

export const getMockUser = (userAttributes = {}) => {
  return Object.assign({}, defaultMockUserAttributes, userAttributes);
};
