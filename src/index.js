import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import MoviesSearchPage from "./pages/MoviesSearchPage/MoviesSearchPage";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<MoviesSearchPage />} />
        </Routes>
    </Router>
);

reportWebVitals();
