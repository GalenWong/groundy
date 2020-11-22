const playlistSchema = {
  type: 'object',
  properties: {
    key: { type: 'string', default: 'playlist' },
    id: { type: 'string' },
    name: { type: 'string' },
    songs: { type: 'array', default: [] },
  },
  additionalProperties: false,
  required: ['id', 'name', 'songs'],
};

module.exports = playlistSchema;
