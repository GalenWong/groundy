/* eslint-disable no-underscore-dangle */
import * as os from 'os';
import * as path from 'path';
import Database from '../../app/backend/database';
// import { Song, Playlist, Token } from '../types/index.d';

function getRand() {
  return Math.floor(Math.random() * 10000);
}

describe('database', () => {
  const tempDir = path.join(os.tmpdir(), getRand().toString());
  it('createToken', async () => {
    const database = Database.getInstance(tempDir);

    const data = {
      id_token: `my_id_token_${getRand()}`,
      scope: 'my_scope',
      refresh_token: 'my_refresh_token',
      expiry_date: 'my_expiry_date',
      access_token: 'my_access_token',
      token_type: 'my_token_type',
    };

    const t = await database.createToken(data);
    expect(t.key).toEqual('token');
    expect(t.id_token).toEqual(data.id_token);
    expect(t.scope).toEqual('my_scope');
    expect(t.refresh_token).toEqual('my_refresh_token');
    expect(t.expiry_date).toEqual('my_expiry_date');
    expect(t.access_token).toEqual('my_access_token');
    expect(t.token_type).toEqual('my_token_type');
  });

  it('getOneToken', async () => {
    const database = Database.getInstance(tempDir);

    const data = {
      id_token: `my_id_token_${getRand()}`,
      scope: 'my_scope',
      refresh_token: 'my_refresh_token',
      expiry_date: 'my_expiry_date',
      access_token: 'my_access_token',
      token_type: 'my_token_type',
    };

    const t = await database.createToken(data);
    let result = await database.getToken(data.id_token);
    expect(t.key).toEqual('token');
    expect(t.id_token).toEqual(data.id_token);
    expect(t.scope).toEqual('my_scope');
    expect(t.refresh_token).toEqual('my_refresh_token');
    expect(t.expiry_date).toEqual('my_expiry_date');
    expect(t.access_token).toEqual('my_access_token');
    expect(t.token_type).toEqual('my_token_type');

    database.updateToken(t.id_token, { scope: 'hello world' });
    result = await database.getToken(data.id_token);
    expect(result.scope).toEqual('hello world');
  });
});
