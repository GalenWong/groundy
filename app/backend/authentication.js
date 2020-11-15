const { BrowserWindow } = require('electron')
const { OAuth2Client } = require('google-auth-library')
const { OAUTH_CLIENT } = require('./secrets')

function startOAuth() {
    const client = new OAuth2Client({
        clientId: OAUTH_CLIENT.client_id,
        clientSecret: OAUTH_CLIENT.client_secret,
        redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
    })
    const AuthURL = client.generateAuthUrl({
        scope: ['https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/userinfo.profile'],
    })
    return [client, AuthURL]
}

function getOAuthCode(AuthURL) {
    const authWin = new BrowserWindow({ x: 60, y: 60, useContentSize: true })
    authWin.loadURL(AuthURL, {userAgent: 'Chrome'})
    return new Promise((resolve, reject) => {
        const onclosed = () => {
            reject('Interaction ended intentionally ;(');
        };
        authWin.on('closed', onclosed);
        authWin.on('page-title-updated', (event) => {
            const url = new URL(event.sender.getURL());
            if (url.searchParams.get('approvalCode')) {
                authWin.removeListener('closed', onclosed);
                authWin.close();
                return resolve(url.searchParams.get('approvalCode'));
            }
            if ((url.searchParams.get('response') || '').startsWith('error=')) {
                authWin.removeListener('closed', onclosed);
                authWin.close();
                return reject(url.searchParams.get('response'));
            }
        })
    })
}

async function getOAuthToken(client, code) {
    const response = await client.getToken(code)
    return response.tokens
}

//FIXME: have to know the structure of database
function deleteOAuthToken() {
    console.log('Token Deleted')
}

module.exports.startOAuth = startOAuth
module.exports.getOAuthCode = getOAuthCode
module.exports.getOAuthToken = getOAuthToken
module.exports.deleteOAuthToken = deleteOAuthToken
