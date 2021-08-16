const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const express = require('express')
const axios = require("axios")
const cookieParser = require('cookie-parser')
const querystring = require('querystring')


const app = express()
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, '../frontend/build')))



// ❇ Get constants
const client_id = process.env.client_id
const client_secret = process.env.client_secret
const NODE_ENV = process.env.NODE_ENV

const PORT = process.env.PORT || 5000

let client_uri = process.env.FRONTEND_URI || 'http://localhost:3000'
let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:5000/callback'


console.log(client_id)
console.log(client_secret)
console.log(NODE_ENV)



/* 🎵 Spotify work */
const generateRandomString = function (length) {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
}



const stateKey = 'spotify_auth_state'



app.get("/login", (req, res) => {
    let state = generateRandomString(16)
    res.cookie(stateKey, state)
    // 🎟 Requesting authorization
    let scope = 'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public user-library-read'
    res.redirect(
        `https://accounts.spotify.com/authorize?${querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state,
        })}`,
    )
})




app.get("/callback", (req, res) =>
{
    let code = req.query.code || null
    let state = req.query.state || null
    let storedState = req.cookies ? req.cookies[stateKey] : null

    if (state === null || state !== storedState) {
        res.redirect("/#" + querystring.stringify({ error: "state_mismatch" }))
    }

    else {
        res.clearCookie(stateKey)
        // 🎟 All good. Requesting tokens
        const params = {client_id, client_secret, redirect_uri, code, grant_type: "authorization_code"}
        axios({method: "post", url: "https://accounts.spotify.com/api/token", params, headers: {"Content-Type": "application/x-www-form-urlencoded"}})
            .then(response => {
                const access_token = response.data.access_token
                const refresh_token = response.data.refresh_token
                axios({
                    method: "get",
                    url: "https://api.spotify.com/v1/me",
                    headers: { Authorization: "Bearer " + access_token }
                })

                .then(() => {
                    res.redirect(`${client_uri}/#` + querystring.stringify({ access_token, refresh_token }))
                })

                .catch(e => {
                    res.redirect("/#" + querystring.stringify({ error: e.response.data }))
                })
            })

            .catch(e => console.error(e.response.data))
    }
})




app.get("/refresh_token", (req, res) => {
    // ♻ Requesting access token again, using refresh token
    const refresh_token = req.query.refresh_token
    const params = {client_id, client_secret, grant_type: "refresh_token", refresh_token: refresh_token}
    axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        params,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then(response => {
        access_token = response.data.access_token
        res.send({access_token: access_token})
    })

    .catch(e => {
        console.error(e.response.data)
    })
})


if(process.env.NODE_ENV === 'production') {
    // ⚛ Render React
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
    
    
    //✈ Redirect everything else to the React App
    app.get('*' , (req, res) => {
        res.redirect('/')
    })
}




app.listen(PORT, function () {
    console.warn(`Running on ${PORT}`);
});




