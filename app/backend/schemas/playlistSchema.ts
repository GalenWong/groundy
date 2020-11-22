const playlistSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    songs: { type: 'array', default: [] },
  },
  additionalProperties: false,
  required: ['name', 'songs'],
};

module.exports = playlistSchema;
