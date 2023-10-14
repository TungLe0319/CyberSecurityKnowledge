// let codeVerifier = generateRandomString(128)

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomString = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomString += characters.charAt(randomIndex)
  }

  return randomString
}

async function generateCodeChallenge(codeVerifier) {
  function base64encode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
  }

  const encoder = new TextEncoder()
  const data = encoder.encode(codeVerifier)
  const digest = await window.crypto.subtle.digest('SHA-256', data)

  return base64encode(digest)
}
export { generateRandomString, generateCodeChallenge }

const codeVerifier = generateRandomString(128)
const codeChallenge = await generateCodeChallenge(codeVerifier)

const CLIENT_ID = import.meta.env.SPOTIFY_CLIENT_ID

// generateCodeChallenge(codeVerifier).then((codeChallenge) => {
//   let state = generateRandomString(16)
//   let scope = 'user-read-private user-read-email'

//   localStorage.setItem('code_verifier', codeVerifier)

//   let args = new URLSearchParams({
//     response_type: 'code',
//     client_id: CLIENT_ID,
//     scope: scope,
//     redirect_uri: 'http:localhost:4321/user-profile',
//     state: state,
//     code_challenge_method: 'S256',
//     code_challenge: codeChallenge,
//   })

//   window.location.assign('https://accounts.spotify.com/authorize?' + args)
// })

export async function requestUserAuth() {
  let state = generateRandomString(16)
  let scope = 'user-read-private user-read-email'

  let args = new URLSearchParams({
    response_type: 'code',
    client_id: 'aad38f2633ec4bac9c9ac8027dcbed92',
    scope: scope,
    redirect_uri: 'http://localhost:4321/spotify/user',
    state: state,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
  })
  window.location.assign('https://accounts.spotify.com/authorize?' + args)
}
