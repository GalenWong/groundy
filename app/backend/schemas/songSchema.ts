const songSchema = {
  type: 'object',
  properties: {
    ytid: { type: 'string', unique: true },
    title: { type: 'string' },
    channel: { type: 'string' },
    fileName: { type: 'string' },
    thumbnailUrl: { type: 'string' },
    downloaded: { type: 'boolean', default: false },
  },
  additionalProperties: false,
  required: ['ytid', 'title', 'channel', 'fileName'],
};

export default songSchema;
