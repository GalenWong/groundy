const tokenSchema = {
  type: 'object',
  properties: {
    refresh_token: { type: 'string' },
    expiry_date: { type: 'string' },
    access_token: { type: 'string' },
    token_type: { type: 'string' },
    id_token: { type: 'string' },
    scope: { type: 'string' },
  },
  required: ['id_token'],
  additionalProperties: false,
};

module.exports = tokenSchema;
