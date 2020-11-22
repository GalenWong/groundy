class PalylistService {
    constructor(tokens) {
        this.accessToken = tokens.access_token;
        this.refreshToken = tokens.refresh_token; 
        this.scope = tokens.scope;
        this.tokenType = tokens.token_type;
        this.expiryDate = tokens.expiry_date;
    }
    unwrapPlaylist(respJSON) {
        // TODO: modification needed, have to know class Song
        var item;
        for (item of respJSON.items) {
            console.log(item.snippet.title)
            console.log(item.snippet.resourceId.videoId)
        }
        return item
    }
    getRelated(song) {
        const url = new URL('GET https://www.googleapis.com/youtube/v3/search')
        url.searchParams.set('part', 'snippet')
        url.searchParams.set('type', 'video')
        // FIXME: This needs modification, song should be an object
        url.searchParams.set('relatedToVideoId', song)
        return fetch(url.toString(), {
            headers: {
                Authorization: `${this.tokenType} ${this.accessToken}`,
            },
        })
        //console.log(rawResults)
        //const results = await rawResults.json()
        //console.log(results)
    }
    getSong(song) {
        const results = this.search(song)
        return results
    }
    getRecommend(maxResults) {
        const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
        url.searchParams.set('part', 'snippet')
        url.searchParams.set('playlistId', 'RDMM')
        url.searchParams.set('maxResults', maxResults.toString())
        return fetch(url.toString(), {
            headers: {
                Authorization: `${this.tokenType} ${this.accessToken}`,
            },
        }).then(resp => resp.json())
    }
    getPlaylist(id) {
        const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
        url.searchParams.set('part', 'snippet')
        url.searchParams.set('playlistId', id)
        return fetch(url.toString(), {
            headers: {
                Authorization: `${this.tokenType} ${this.accessToken}`,
            },
        })
    }
    search(query) {
        const url = new URL('https://www.googleapis.com/youtube/v3/search');
        url.searchParams.set('part', 'snippet');
        url.searchParams.set('q', query);
        return fetch(url.toString(), {
            headers: {
                Authorization: `${this.tokenType} ${this.accessToken}`,
            },
        })
    }
}

module.exports = PalylistService;
