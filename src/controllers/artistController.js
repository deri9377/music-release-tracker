const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

exports.getArtist = async (req, res) => {
    const artistId = req.params.artistId;
    
    // Get Spotify access token
    const token = await getSpotifyToken();
  
    try {
        const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                limit: 10, // Limit the number of albums returned
                include_groups: 'album,single', // Only include albums and singles
                market: 'US' // Specify market (optional)
            }
        });
  
        const albums = response.data.items;
        
        // Get today's date
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1

        // Filter albums to get releases from the current month
        const monthlyReleases = albums.filter(album => {
            const releaseDate = new Date(album.release_date);
            const releaseYear = releaseDate.getFullYear();
            const releaseMonth = String(releaseDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
            return releaseYear === currentYear && releaseMonth === currentMonth;
        });
  
        if (monthlyReleases.length > 0) {
            res.json(monthlyReleases);
        } else {
            res.json({ message: 'No new releases this month' });
        }
    } catch (error) {
        console.error('Error fetching artist releases', error);
        res.status(500).json({ error: 'Failed to fetch artist releases' });
    }
};

const getSpotifyToken = async () => {
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', 
            new URLSearchParams({
                grant_type: 'client_credentials'
            }), {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching Spotify token', error);
    }
};
