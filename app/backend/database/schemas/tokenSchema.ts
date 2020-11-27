const tokenSchema = {
  type: 'object',
  properties: {
    refresh_token: { type: 'string' },
    expiry_date: { type: 'number' },
    access_token: { type: 'string' },
    token_type: { type: 'string' },
    scope: { type: 'string' },
    key: { value: 'token' },
  },
  additionalProperties: false,
};

export default tokenSchema;
