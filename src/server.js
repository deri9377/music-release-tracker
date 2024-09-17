const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

console.log('SPOTIFY_CLIENT_ID:', process.env.SPOTIFY_CLIENT_ID);
console.log('SPOTIFY_CLIENT_SECRET:', process.env.SPOTIFY_CLIENT_SECRET);

const express = require('express');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'client/build')));

// Use userRoutes for user-related endpoints
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Use artistRoutes for artist related endpoints
const artistRoutes = require('./routes/artistRoutes');
app.use('/api/artists', artistRoutes);

// The "catchall" handler: for any request that doesn't match an API route,
// send back the index.html file from the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


