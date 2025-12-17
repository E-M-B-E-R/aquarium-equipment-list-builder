import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BuildProvider } from './context/BuildContext';
import { ListingPage } from './components/ListingPage';
import { BuildPage } from './components/BuildPage';

export default function App() {
  return (
    <BrowserRouter>
      <BuildProvider>
        <Routes>
          <Route path="/" element={<ListingPage />} />
          <Route path="/build" element={<BuildPage />} />
        </Routes>
      </BuildProvider>
    </BrowserRouter>
  );
}
