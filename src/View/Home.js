import React from 'react';
import '../App.css';
import RecommendList from '../Component/List/RecommendList'
import SearchBar from '../Component/SearchMenu/SearchBar';
import NewEpisodeList from '../Component/List/NewEpisodeList';
import SocmedBar from '../Component/SideMenu/SocmedBar';
import ChatBar from '../Component/SideMenu/ChatBar';

function Home() {
  return (
    <div>
      <div className=" col-12 col-md-12">
        <SearchBar />
      </div>
      <div className="row">
        <div className="col-12 col-md-8">
          <div className="container col-md-12 home-main col-lg-10 mt-3 shadow-sm">
            <RecommendList />
          </div>
          <div className="container col-md-12 home-main col-lg-10 mt-3 shadow-sm">
            <NewEpisodeList />
          </div>
        </div>
        <div className="side-bar col-8 col-md-3 my-3 home-side side-bar p-0">
          <div className="container col-12">
            <SocmedBar />
          </div>
          <div className="container mt-3 col-12 mb-3">
            <ChatBar />
          </div>
        </div>
      </div>
    </div>

  );
}

export default Home;
