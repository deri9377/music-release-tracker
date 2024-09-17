import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Artist from './components/Artist';

const App = () => {
  return (
    <div>
      <header>
        <h1>Music Release Tracker</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="api/artists/:artistId" element={<Artist />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
