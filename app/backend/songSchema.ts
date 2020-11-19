const songSchema = {
  type: 'object',
  properties: {
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
