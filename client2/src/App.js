import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Book from './components/Book';
import Manga from './components/Manga';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <>
      <Helmet>
        <meta name="description" content="test description" data-rh="true" />
        <meta name="description"
          content="Manga, Comic, Online, Manag Reader, Latest Manga, Manhwa, Manwha, Japan, Web Development, Website, Scrapping, New, Trending Manga, Muse Asia, Latest, Newest, Funniest, MERN, MongoDB ExpessJS, ReactJs, NodeJs, Read Free, Children, #tags, old manga, anime, anime story, online anime, free anime, free manga, cartoon, online free anime, hidden anime, new anime, animes, muse asia anime, youtube anime, youtube cartoon" />
        <meta name="keywords"
          content="Manga, Comic, Online, Manag Reader, Latest Manga, Manhwa, Manwha, Japan, Web Development, Website, Scrapping, New, Trending Manga, Muse Asia, Latest, Newest, Funniest, MERN, MongoDB ExpessJS, ReactJs, NodeJs, Read Free, Children, #tags, old manga, anime, anime story, online anime, free anime, free manga, cartoon, online free anime, hidden anime, new anime, animes, muse asia anime, youtube anime, youtube cartoon" />
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:name/:book" element={<Book />} />
          <Route path="/manga/:name/:manga" element={<Manga />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
