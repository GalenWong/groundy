import { BrowserWindow } from 'electron';
import { OAuth2Client } from 'google-auth-library';
import { Token } from '../../types';
import Database from '../database';
/**
 * This file is a JSON containing two fields: 'client_id' and 'client_secret'.
 * The value of these can be found in the shared drive
 */
import OAUTH_CLIENT from './secrets.json';

const getOAuthClient = (): [OAuth2Client, string] => {
  const client = new OAuth2Client({
    clientId: OAUTH_CLIENT.client_id,
    clientSecret: OAUTH_CLIENT.client_secret,
    redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
  });
  const AuthURL = client.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
    access_type: 'offline',
  });
  return [client, AuthURL];
};

const getOAuthCode = async (AuthURL: string): Promise<string> => {
  const authWin = new BrowserWindow({ x: 60, y: 60, useContentSize: true });
  authWin.loadURL(AuthURL, { userAgent: 'Chrome' });
  return new Promise((resolve, reject) => {
    const onclosed = () => {
      // TODO: seng signal
      reject(new Error('auth ended. check ipcMain'));
    };
    authWin.on('closed', onclosed);
    authWin.on('page-title-updated', (event: Electron.Event) => {
      const url = new URL((<any>event).sender.getURL());
      const approvalCode = url.searchParams.get('approvalCode');
      if (approvalCode) {
        authWin.removeListener('closed', onclosed);
        authWin.close();
        resolve(approvalCode);
      }
      if ((url.searchParams.get('response') || '').startsWith('error=')) {
        authWin.removeListener('closed', onclosed);
        authWin.close();
        reject(url.searchParams.get('response'));
      }
    });
  });
};

const startAuth = async () => {
  const [client, authURL] = getOAuthClient();
  const code = await getOAuthCode(authURL);
  const tokens = await client.getToken(code);
  const db = Database.getInstance();
  await db.createToken(tokens.tokens as Token);
};

const deleteToken = async () => {
  const db = Database.getInstance();
  await db.deleteToken();
};

const getToken = async () => {
  const db = Database.getInstance();
  return db.getToken();
};

export { startAuth, getToken, deleteToken, getOAuthClient, getOAuthCode };
