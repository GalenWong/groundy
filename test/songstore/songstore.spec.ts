import { assert } from 'console';
import { SongStore } from '../../app/components/SongStore';
const fs = require('fs');  
jest.mock('fs'); 
const path = require('path'); 

describe('songstore', () => {
  it('getInstance', () => { 
    expect(function() { SongStore.getInstance(''); })
      .toThrow(new Error('Invalid argument: storageDirectory'));
  });

  it('getInstance', () => {
    expect(SongStore.getInstance('home')).toBeInstanceOf(SongStore); 
  });

  it('getStorageDirectory', () => {
    assert(SongStore.getInstance('home').getStorageDirectory(), 'home'); 
  });

  it('getWriteStream', () => {
    expect(SongStore.getInstance('home').getWriteStream('dummy')).toBeUndefined;
  }); 

  it('doesFileExistErr', () => {
    fs.existsSync.mockReturnValue(false); 
    expect(SongStore.getInstance('home').doesFileExists('dummy')).toBeFalsy;
  });

  it('doesFileExist', () => {
    fs.existsSync.mockReturnValue(true); 
    expect(SongStore.getInstance('home').doesFileExists('dummy')).toBeTruthy;
  }); 

  it('getAllSongs', () => {
    fs.existsSync.mockReturnValue(true); 
    expect(SongStore.getInstance('home').getAllSongs()).toBeTruthy;
  }); 
}); 