import React, { Component, useEffect, useState } from 'react'

const CLIENT_ID = 'aad38f2633ec4bac9c9ac8027dcbed92'
const CLIENT_SECRET = 'aad38f2633ec4bac9c9ac8027dcbed92'

useEffect(() => {
  var authParameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'applications/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET,
  }
  fetch('https://accounts.spotify.com/api/token', authParameters)
    .then((result) => result.json())
    .then((data) => console.log(data))
}, [])

class SpotifyAccessToken extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchInput: '',
      CLIENT_ID: 'aad38f2633ec4bac9c9ac8027dcbed92',
      CLIENT_SECRET: 'aad38f2633ec4bac9c9ac8027dcbed92',
    }
  }

  getAccessToken = async () => {
    try {
      const res = fetch('https://accounts.spotify.com/api/token')
    } catch (error) {}
  }

  render() {
    return <div className="mt-20 flex  flex-col items-center justify-center "></div>
  }
}

export default SpotifyAccessToken