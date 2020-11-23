export interface DbSong {
  ytid: string;
  title: string;
  channel: string;
  fileName?: string;
  downloaded: boolean;
  thumbnailUrl?: string;
  key: string;
}

const songSchema = {
  type: 'object',
  properties: {
    ytid: { type: 'string', unique: true },
    title: { type: 'string' },
    channel: { type: 'string' },
    fileName: { type: 'string' },
    thumbnailUrl: { type: 'string' },
    downloaded: { type: 'boolean', default: false },
    key: { value: 'song' },
  },
  additionalProperties: false,
  required: ['ytid', 'title', 'channel'],
};

export default songSchema;
