const tokenSchema = {
  type: 'object',
  properties: {
    key: { type: 'string', default: 'token' },
    refresh_token: { type: 'string' },
    expiry_date: { type: 'string' },
    access_token: { type: 'string' },
    token_type: { type: 'string' },
    id_token: { type: 'string' },
    scope: { type: 'string' },
  },
  additionalProperties: false,
};

module.exports = tokenSchema;
