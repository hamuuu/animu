import React from 'react'
import ReactLoading from 'react-loading';
import AnimeCard from '../Component/Card/AnimeCard';
import SearchBar from '../Component/SearchMenu/SearchBar';
import axios from 'axios';

class AnimeSearch extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      isLoaded: false
    }
  }

  componentDidMount() {
    axios.get(window.url_api + 'search/'+this.props.match.params.id+'/no')
      .then(res => {
        this.setState({
          isLoaded : true,
          data : res.data
        });
      })
  }

  render () {
    return(
      <div>
        <SearchBar />
        <div className="container my-3">
          <div className="py-3">
            <h5 className="pb-2 recommend-title mb-3 text-info border-bottom">Hasil Penelusuran</h5>
            <div className="row">
              {this.state.isLoaded ?
                this.state.data.map((item, key) =>
                <div key={item.id} className="p-1 col-md-3 col-lg-2 col-sm-4 col-6">
                  <AnimeCard data={item}/>
                </div>)
                :
                <ReactLoading className="mt-4 mx-auto" type={'spin'} color={'gray'} height={'8%'} width={'8%'} />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AnimeSearch;
