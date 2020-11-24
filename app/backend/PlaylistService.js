/* eslint-disable */
// These two are dummy classes I made only for testing purposes
class Song{
    constructor(title, channel, ytID, downloaded = false, fileName = null) {
        this.title = title
        this.channel = channel
        this.ytID = ytID
        this.downloaded = downloaded
        this.fileName = fileName
    }
}

class Playlist{
    constructor(id, name, songs = []) {
        this.id = id
        this.name = name
        this.songs = songs
    }
}

class PalylistService {
    constructor(apiKey) {
        this.apiKey = apiKey
        this.accessToken = null
        this.refreshToken = null
        this.scope = null
        this.tokenType = null
        this.expiry_date = null
        this.tokenExist = false
    }

    // Private functions user should NOT call:
    async unwrapIntoPlaylist(respJSON, isRelated = false, relatedTo = '') {
        var item;
        var songs = []
        for (item of respJSON.items) {
            console.log(item)
            try {
                var videoId = item.snippet.resourceId.videoId
            }
            catch (err) {
                videoId = item.id.videoId
            }
            finally {
                const song = new Song(
                    item.snippet.title,
                    item.snippet.channelId,
                    videoId,
                )
                songs.push(song)
            }
        }
        if (isRelated == true) {
            return new Playlist(
                null,
                `Related songs to ${relatedTo}`,
                songs
            )
        }

        const url = new URL('https://www.googleapis.com/youtube/v3/playlists')
        url.searchParams.set('part', 'snippet')
        url.searchParams.set('id', item.snippet.playlistId)
        url.searchParams.set('key', this.apiKey)
        const response = await fetch(url.toString()).then(resp => resp.json())

        try {
            var playlistName = response.items[0].snippet.title
        } catch (err) {
            console.log(err)
            //playlistName = 'Unknown Playlist'
        }
        finally {
            playlistName = item.snippet.playlistId == 'RDMM' ? 'My Mix' : playlistName
            var list = new Playlist(
                item.snippet.playlistId,
                playlistName,
                songs
            )
        }
        return list
    }

    search(query) {
        const url = new URL('https://www.googleapis.com/youtube/v3/search');
        url.searchParams.set('part', 'snippet');
        url.searchParams.set('maxResults', '1');
        url.searchParams.set('q', query);
        if (this.tokenExist) {
            return fetch(url.toString(), {
                headers: {
                    Authorization: `${this.tokenType} ${this.accessToken}`,
                },
            }).then(resp => resp.json())
        }
        else {
            url.searchParams.set('key', this.apiKey)
            return fetch(url.toString()).then(resp => resp.json())
        }
    }

    // Public functions:

    // This function should be called right away after logging in
    setTokens(tokens) {
        this.accessToken = tokens.access_token
        this.refreshToken = tokens.refresh_token
        this.scope = tokens.scope
        this.tokenType = tokens.token_type
        this.expiryDate = tokens.expiry_date
        this.tokenExist = true
    }

    async getRecommend(maxResults = 10) {
        if (!this.tokenExist) {
            console.log('This function requires user login.')
            return null
        }
        const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
        url.searchParams.set('part', 'snippet')
        url.searchParams.set('playlistId', 'RDMM')
        url.searchParams.set('maxResults', maxResults.toString())
        const response = await fetch(url.toString(), {
            headers: {
                Authorization: `${this.tokenType} ${this.accessToken}`,
            },
        }).then(resp => resp.json())
        return this.unwrapIntoPlaylist(response)
    }

    async getPlaylist(playlistId, maxResults = 10) {
        const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
        url.searchParams.set('part', 'snippet')
        url.searchParams.set('playlistId', playlistId)
        url.searchParams.set('maxResults', maxResults.toString())
        var respJson = null
        if (this.tokenExist) {
            respJson = await fetch(url.toString(), {
                headers: {
                    Authorization: `${this.tokenType} ${this.accessToken}`,
                },
            }).then(resp => resp.json())
        }
        else {
            url.searchParams.set('key', this.apiKey)
            respJson = await fetch(url.toString()).then(resp => resp.json())
        }
        return this.unwrapIntoPlaylist(respJson)
    }

    async getRelated(songId) {
        const url = new URL('https://www.googleapis.com/youtube/v3/search')
        url.searchParams.set('part', 'snippet')
        url.searchParams.set('relatedToVideoId', songId)
        url.searchParams.set('type', 'video')
        var respJson = null
        if (this.tokenExist) {
            respJson = await fetch(url.toString(), {
                headers: {
                    Authorization: `${this.tokenType} ${this.accessToken}`,
                },
            }).then(resp => resp.json())
        }
        else {
            url.searchParams.set('key', this.apiKey)
            respJson = await fetch(url.toString()).then(resp => resp.json())
        }
        //this.unwrapPlaylist(respJson)
        return this.unwrapIntoPlaylist(respJson, true, songId)
    }

    async getSongByName(songName) {
        const result = await this.search(songName)
        console.log(result)
        try {
            var item = result.items[0]
            var song = new Song(
                item.snippet.title,
                item.snippet.channelId,
                item.id.videoId,
            )
        }
        catch (err) {
            song = null
        }
        return song
    }

    async getSongById(songId) {
        const url = new URL('https://www.googleapis.com/youtube/v3/videos')
        url.searchParams.set('part', 'snippet')
        url.searchParams.set('id', songId)
        if (this.tokenExist) {
            var response = await fetch(url.toString(), {
                headers: {
                    Authorization: `${this.tokenType} ${this.accessToken}`,
                },
            }).then(resp => resp.json())
        }
        else {
            url.searchParams.set('key', this.apiKey)
            response = await fetch(url.toString()).then(resp => resp.json())
        }
        console.log(response)
        try {
            var item = response.items[0]
            var song = new Song(
                item.snippet.title,
                item.snippet.channelId,
                item.id,
            )
        }
        catch (err) {
            song = null
        }
        return song
    }
}

module.exports = PalylistService;
