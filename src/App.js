import React from 'react';
import './App.css';
import Header from './Component/Header'
import Footer from './Component/Footer'
import Home from './View/Home'
import AnimeInfo from './View/AnimeInfo'
import AnimeWatch from './View/AnimeWatch';
import MovieList from './View/MovieList';
import AnimeList from './View/AnimeList';
import AnimeBatch from './View/AnimeBatch';
import AnimeSearch from './View/AnimeSearch';
import Admin from './View/Admin';
import NewAnime from './Component/Admin/NewAnime';
import UploadEpisode from './Component/Admin/UploadEpisode';
import UpdateEpisode from './Component/Admin/UpdateEpisode';
import UpdateAnime from './Component/Admin/UpdateAnime';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

function App() {
  window.url_image = 'http://localhost:8000/images/'
  window.url_api = 'http://localhost:8000/api/'

  return (
    <div>
      <Router>
        <Header />
            <div className="wrapper pb-3">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/movie" exact component={MovieList} />
                <Route path="/anime" exact component={AnimeList} />
                <Route path="/anime-batch" exact component={AnimeBatch} />
                <Route path="/:type/:name/:id/:episode" exact component={AnimeWatch} />
                <Route path="/:type/:name/:id" exact component={AnimeInfo} />
                <Route path="/admin" exact component={Admin} />
                <Route path="/search/:id" exact component={AnimeSearch} />
                { (localStorage.getItem('appState')) ?
                  <>
                    <Switch>
                      <Route path="/new-anime" exact component={NewAnime} />
                      <Route path="/upload-episode" exact component={UploadEpisode} />
                      <Route path="/update-anime" exact component={UpdateAnime} />
                      <Route path="/update-episode" exact component={UpdateEpisode} />
                      <Route component={Home} />
                    </Switch>
                  </>
                :
                  <Route component={Home} />
                }


              </Switch>
            </div>
          <Footer />
      </Router>
    </div>

  );
}

export default App;
