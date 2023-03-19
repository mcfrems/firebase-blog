import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import Auth from './pages/Auth/Auth';
import CategoryArticle from './pages/CategoryArticle/CategoryArticle';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/category/:categoryName" element={<CategoryArticle />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
