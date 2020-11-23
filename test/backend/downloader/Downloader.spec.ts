import downloader from '../../../app/backend/downloader';

describe('Downloader', () => {
  it('throw when ID does not exist', () => {
    expect(() => {
      downloader.addFinishDownloadListener('id-not-exists', () => {});
    }).toThrow();

    expect(() => {
      downloader.addProgressListener('id-not-exists', () => {});
    }).toThrow();
  });
});
