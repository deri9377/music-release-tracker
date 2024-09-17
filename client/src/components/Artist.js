import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Artist = () => {
  const { artistId } = useParams(); // Get the artistId from the URL
  const [artistData, setArtistData] = useState(null);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await axios.get(`/api/artists/${artistId}`);
        setArtistData(response.data);
      } catch (error) {
        console.error('Error fetching artist data:', error);
      }
    };

    fetchArtistData();
  }, [artistId]);

  if (!artistData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{artistData.artists.name}</h1>
      <ul>
        {artistData.map((album) => (
          <li key={album.id}>{album.name} - {album.release_date}</li>
        ))}
      </ul>
    </div>
  );
};

export default Artist;
