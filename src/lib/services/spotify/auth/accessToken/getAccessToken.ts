import { Buffer } from 'buffer'

const CLIENT_ID = import.meta.env.SPOTIFY_CLIENT_ID

const CLIENT_SECRET = import.meta.env.SPOTIFY_CLIENT_SECRET

export const getAccessToken = async () => {
  try {
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    }

    const response = await fetch('https://accounts.spotify.com/api/token', authParameters)

    if (response.ok) {
      const data = await response.json()

      return data.access_token // Return the access token
    } else {
      console.error('Access token request failed:', response.status, response.statusText)
      return null
    }
  } catch (error) {
    console.error('Error making access token request:', error)
    return null
  }
}

