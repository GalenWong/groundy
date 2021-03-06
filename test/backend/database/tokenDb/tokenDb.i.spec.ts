/* eslint-disable no-underscore-dangle */
import * as os from 'os';
import * as path from 'path';
import Database from '../../../../app/backend/database';
import { Token } from '../../../../app/types';
// import { Song, Playlist, Token } from '../types/index.d';

function getRand() {
  return Math.floor(Math.random() * 10000);
}

describe('database', () => {
  const tempDir = path.join(os.tmpdir(), getRand().toString());
  it('createToken', async () => {
    const database = Database.getInstance(tempDir);

    const data: Token = {
      scope: 'my_scope',
      refresh_token: 'my_refresh_token',
      expiry_date: 1234567,
      access_token: 'my_access_token',
      token_type: 'my_token_type',
    };

    const t = await database.createToken(data);
    expect(t.key).toEqual('token');
    expect(t.scope).toEqual('my_scope');
    expect(t.refresh_token).toEqual('my_refresh_token');
    expect(t.expiry_date).toEqual(1234567);
    expect(t.access_token).toEqual('my_access_token');
    expect(t.token_type).toEqual('my_token_type');
  });

  it('getOneToken', async () => {
    const database = Database.getInstance(tempDir);

    const data: Token = {
      scope: 'my_scope',
      refresh_token: 'my_refresh_token',
      expiry_date: 1234567,
      access_token: 'my_access_token',
      token_type: 'my_token_type',
    };

    const t = await database.createToken(data);
    let result = await database.getToken();
    expect(t.key).toEqual('token');
    expect(t.scope).toEqual('my_scope');
    expect(t.refresh_token).toEqual('my_refresh_token');
    expect(t.expiry_date).toEqual(1234567);
    expect(t.access_token).toEqual('my_access_token');
    expect(t.token_type).toEqual('my_token_type');

    await database.deleteToken();
    result = await database.getToken();
    expect(result).toEqual(null);
  });

  it('invalid token', async () => {
    const database = Database.getInstance(tempDir);
    expect(database.validateToken('abd')).toBe(false);
  });
});
