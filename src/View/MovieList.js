import React from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import SearchBar from '../Component/SearchMenu/SearchBar';

class MovieList extends React.Component {
  constructor() {
    super()
    this.state = {
      data : [],
      isLoaded : false
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/api/anime/list/movie`)
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

  render() {

    return (
      <div className="py-3">
        <SearchBar />
        <div className="container">
          <h5 className="py-3 recommend-title mb-3 text-info border-bottom">Daftar Movie</h5>
          <div className="pb-4">
          {this.state.isLoaded ?
            Object.keys(this.state.data).map((item, index) =>
              <div key={index}>
                <p className="sub-anime-detail ml-2 my-2" style={{margin: 0}}>{item}</p>
                <li className="row m-1 border p-3">
                  {this.state.data[item].map((anime, index) =>
                    <div key={index} className="col-md-6 col-12 py-2">
                        <Link to={this.generatePath(anime.type, anime.title, anime.id)} style={{textDecoration: 'none'}}>{anime.title}</Link>
                    </div>
                  )}
                </li>
              </div>)
            : <ReactLoading className="mt-4 mx-auto" type={'spin'} color={'gray'} height={'8%'} width={'8%'} />
          }
          </div>
        </div>
      </div>
    );
  }
}

export default MovieList;
