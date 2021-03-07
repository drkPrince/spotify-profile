import axios from 'axios'

/*=======================================================
=            Token Logic            =
=======================================================*/

const gethashParams = () => {
    const hashParams = {}
    var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);

    while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2])
    }
    return hashParams;
}

const setTokenTimestamp = () => window.localStorage.setItem('spotify_token_timestamp', Date.now())
const setLocalRefreshToken = token => window.localStorage.setItem('spotify_refresh_token', token);
const setLocalAccessToken = token => {
    setTokenTimestamp();
    window.localStorage.setItem('spotify_access_token', token);
}


const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp')
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token')
const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token')

const EXPIRATION_TIME = 3600 * 1000 // 3600 seconds * 1000 = 1 hour in milliseconds

const refreshAccessToken = async () => {
    try {
        const { data } = await axios.get(`http://localhost:5000/refresh_token?refresh_token=${getLocalRefreshToken()}`)
        const { access_token } = data
        setLocalAccessToken(access_token)
        window.location.reload()
        return
    } catch (e) {
        console.error(e)
        logOut()
    }
}

const getAccessToken = () => {
    const {error, access_token, refresh_token} = gethashParams()
    if (error) {
        console.error(error)
        refreshAccessToken()
    }

    if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
        console.warn('Access token has expired, REFRESHING...')
        refreshAccessToken()
    }

    const localAccessToken = getLocalAccessToken()
    const localRefreshToken = getLocalRefreshToken()

    // If there is no REFRESH token in local storage, set it as `refresh_token` from params
    if (!localRefreshToken || localRefreshToken === 'undefined') {
        setLocalRefreshToken(refresh_token)
    }

    // If there is no ACCESS token in local storage, set it and return `access_token` from params
    if (!localAccessToken || localAccessToken === 'undefined') {
        setLocalAccessToken(access_token)
        return access_token
    }

    return localAccessToken
}


export const token = getAccessToken()


export const logOut = () => {
    window.localStorage.removeItem('spotify_token_timestamp')
    window.localStorage.removeItem('spotify_access_token')
    window.localStorage.removeItem('spotify_refresh_token')
    window.location.href='/'
}


/*=====  End of Token Logic  ======*/




/*============================================================================
\                    =            API Calls            =
==============================================================================*/

export const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
}

        
/*----------  User API Calls  ----------*/

export const getUser = () => axios.get('https://api.spotify.com/v1/me', { headers })

export const getUsersTop5Artists = () => axios.get('https://api.spotify.com/v1/me/top/artists?limit=4', {headers})
export const getUsersTopArtists = () => axios.get('https://api.spotify.com/v1/me/top/artists?limit=20', {headers})
export const getUsersTopArtistsSinceWeeks = () => axios.get('https://api.spotify.com/v1/me/top/artists?limit=20&time_range=short_term', {headers})
export const getUsersTopArtistsSinceAnYear = () => axios.get('https://api.spotify.com/v1/me/top/artists?limit=20&time_range=long_term', {headers})

export const getUsersTop5Tracks = () => axios.get('https://api.spotify.com/v1/me/top/tracks?limit=4', {headers})
export const getUsersTopTracks = () => axios.get('https://api.spotify.com/v1/me/top/tracks?limit=20', {headers})
export const getUsersTopTracksSinceWeeks = () => axios.get('https://api.spotify.com/v1/me/top/tracks?limit=20&time_range=short_term', {headers})
export const getUsersTopTracksSinceAnYear = () => axios.get('https://api.spotify.com/v1/me/top/tracks?limit=20&time_range=long_term', {headers})

export const getFollowing = () => axios.get('https://api.spotify.com/v1/me/following?type=artist', { headers })

export const getRecentlyPlayed = () => axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=10', { headers })

export const getPlaylists = () => axios.get('https://api.spotify.com/v1/me/playlists', {headers})





/*----------  Artists API Calls  ----------*/

export const getArtist = (id) => axios.get(`https://api.spotify.com/v1/artists/${id}`, {headers})

export const getArtistsTopTracks = (id) => axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=IN`, {headers})

export const getArtistsAlbums = id => axios.get(`https://api.spotify.com/v1/artists/${id}/albums?limit=30&include_groups=album`, {headers})

export const getArtistsRelatedArtists = id => axios.get(`https://api.spotify.com/v1/artists/${id}/related-artists?limit=5`, {headers})

export const isArtistFollowedByUser = id => axios.get(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${id}`, {headers})

export const followArtist = id => axios.put(`https://api.spotify.com/v1/me/following?type=artist`, {ids:[id]}, {headers})

export const unfollowArtist = id => axios.delete(`https://api.spotify.com/v1/me/following?type=artist&ids=${id}`, {headers})




/*----------  Track API Calls  ----------*/

export const getSong = id => axios.get(`https://api.spotify.com/v1/tracks/${id}`, {headers})

export const getSongFeatures = id => axios.get(`https://api.spotify.com/v1/audio-features/${id}`, {headers})




/*----------  Library API Calls  ----------*/

export const getLikedSongs = () => axios.get('https://api.spotify.com/v1/me/tracks?limit=50', {headers})

export const getUsersPodcasts = () => axios.get('https://api.spotify.com/v1/me/shows', {headers})

export const getUsersPlaylists = () => axios.get('https://api.spotify.com/v1/me/playlists', {headers})

export const getAPodcast = id => axios.get(`https://api.spotify.com/v1/shows/${id}`, {headers})

export const getAPlaylist = id => axios.get(`https://api.spotify.com/v1/playlists/${id}`, {headers})

export const getAPlaylistsTracks = id => axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {headers})

export const getAnAlbum = id => axios.get(`https://api.spotify.com/v1/albums/${id}`, {headers})

export const getAnAlbumsTracks = id => axios.get(`https://api.spotify.com/v1/albums/${id}/tracks`, {headers})




export const search = query => axios.get(`https://api.spotify.com/v1/search/?q=${query}&type=artist&limit=5`, {headers})




/*=====  End of API Calls  ======*/





