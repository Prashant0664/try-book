import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Book from './components/Book';
import Manga from './components/Manga';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:book" element={<Book />} />
          <Route path="/manga/:manga" element={<Manga />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
