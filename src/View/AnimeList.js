import React from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import SearchBar from '../Component/SearchMenu/SearchBar';
import AnimeCard from '../Component/Card/AnimeCard';
import {FaRegImage} from 'react-icons/fa';
import {GoTextSize} from 'react-icons/go';

class AnimeList extends React.Component {
  constructor() {
    super()
    this.state = {
      data : [],
      isLoaded : false,
      mode: false //false text mode, true image mode
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/api/anime/list/tv`)
      .then(res => {
        this.setState({
          isLoaded : true,
          data : res.data
        });
      })
  }

  generatePath = (type, name, id) => {
    let path = type === 'TV' ? 'anime/'+name.replace(/[!.:;()]/g, '').toLowerCase()+'/'+id
             : type.toLowerCase()+'/'+name.replace(/[!.:;()]/g, '').toLowerCase()+'/'+id
    path = path.replace(/[ ]/g, '-')

    return path;
  }

  changeMode = () => {
    this.setState({
      mode : !this.state.mode
    });
  }

  render() {
    console.log(this.state.data);
    return (
      <div className="py-3">
        <SearchBar />
        <div className="container">
          <div className="row justify-content-around border-bottom align-items-center">
            <h5 className="pt-3 px-3 col-6 recommend-title mb-3 text-info">Daftar Anime</h5>
            <div className="col-6 py-3 text-right">
              <button className="btn btn-primary text-light" onClick={this.changeMode} style={{fontSize: '0.8rem'}}>
                { this.state.mode ?
                    <div><GoTextSize className="mx-1" /> Text Mode List</div>
                  :
                    <div><FaRegImage className="mx-1" /> Image Mode List</div>
                  }
              </button>
            </div>
          </div>
          <div className="pb-4">
          {this.state.isLoaded ?
             !this.state.mode ?
              Object.keys(this.state.data[0]).map((item, index) =>
                <div key={index}>
                  <p className="sub-anime-detail ml-2 my-2" style={{margin: 0}}>{item}</p>
                  <li className="row m-1 border p-3">
                    {this.state.data[0][item].map((anime, index) =>
                      <div key={index} className="col-md-6 col-12 py-2">
                          <Link to={this.generatePath(anime.type, anime.title, anime.id)} style={{textDecoration: 'none'}}>
                            {anime.title}
                          </Link>
                      </div>
                    )}
                  </li>
                </div>)
                : ''

            : <ReactLoading className="mt-4 mx-auto" type={'spin'} color={'gray'} height={'8%'} width={'8%'} />
          }
          {this.state.isLoaded ?
                this.state.mode ?
                  <div className="row col-12">
                    {this.state.data[1].map((item, index) =>
                      <div className="col-md-2 p-0 col-6">
                        <AnimeCard data = {item} />
                      </div>
                    )}
                  </div>
                :
                ''
              :
            ''}
          </div>
        </div>
      </div>
    );
  }
}

export default AnimeList;
