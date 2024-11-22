import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import MainFlashcard from './Pages/1stpage/MainFlashcard';
import MyFlashCard from './Pages/2ndpage/MyFlashcard';
import FlashCardDetails from './Pages/3rdpage/FlashcardDetails';
import WelcomePopup from './Components/WelcomePopup';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<MainFlashcard />} />
            <Route path="/myflashcard" element={<MyFlashCard />} />
            <Route path="/flashcarddetails/:id" element={<FlashCardDetails />} />
          </Routes>
        </main>
        <footer className="bg-gray-200/70 backdrop-blur-sm border-t border-gray-300/30 py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-600">All rights reserved.</p>
          </div>
        </footer>
        <WelcomePopup />
      </div>
    </div>
  );
}

export default App;
