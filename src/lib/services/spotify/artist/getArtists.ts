import { getAccessToken } from '../auth/accessToken/getAccessToken' // Import your getAccessToken function

export const getArtists = async () => {
  // Get the access token using the getAccessToken function
  const accessToken = await getAccessToken()

  console.log(accessToken);
  
  if (!accessToken) {
    console.error('Access token is not available. Unable to fetch artists.')
    return null
  }

  try {
    // Define your request parameters for fetching artists
    const requestParameters = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      // Add any other necessary headers or parameters for your specific API request
    }

    // Replace 'your-api-endpoint' with the actual Spotify API endpoint for fetching artists
    const response = await fetch('https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg', requestParameters)

    if (response.ok) {
      const data = await response.json()
      // Parse and process the data as needed
      return data
    } else {
      console.error('Error fetching artists:', response.status, response.statusText)
      return null
    }
  } catch (error) {
    console.error('Error making the request:', error)
    return null
  }
}
