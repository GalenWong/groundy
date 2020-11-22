const songSchema = {
  type: 'object',
  properties: {
    key: { type: 'string', default: 'song' },
    ytid: { type: 'string' },
    title: { type: 'string' },
    channel: { type: 'string' },
    fileName: { type: 'string' },
    thumbnailUrl: { type: 'string' },
    downloaded: { type: 'boolean', default: false },
  },
  additionalProperties: false,
  required: ['ytid', 'title', 'channel', 'fileName', 'thumbnailUrl'],
};

module.exports = songSchema;
