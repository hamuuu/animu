import React from 'react';
import AnimePlayer from '../Component/AnimeStream/AnimePlayer';
import ReactLoading from 'react-loading';
import SearchBar from '../Component/SearchMenu/SearchBar';
import EpisodeList from '../Component/List/EpisodeList';
import axios from 'axios';

class AnimeWatch extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      isLoaded: false
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/'+this.props.match.params.type+'/'+this.props.match.params.id+'/'+this.props.match.params.episode)
      .then( res => {
        if(res.status === 200)
           return res.json()
         })
      .then( resJson => {
        this.setState({
            data: resJson,
            isLoaded: true
        })
     })

     axios.get('http://localhost:8000/api/episode/'+this.props.match.params.id)
       .then(res => {
         this.setState({
           isLoadedEpisode : true,
           dataEpisode : res.data
         });
       })
  }

  render() {
    return (
      <div>
        <SearchBar />
        <div className="container container-player mt-3" style={{padding: 0}}>
          {

            this.state.isLoaded ?
            <AnimePlayer title={this.state.data[1].title} data={this.props.match.params} dataEpisode={this.state.data[0]} />
            :
            <div className="d-flex justify-content-center align-items-center" style={{height:'100px'}}>
              <ReactLoading type={'spin'} color={'gray'} height={'8%'} width={'8%'} />
            </div>

           }
        </div>
        <div className="container mt-3" style={{padding:0}}>
          {this.state.isLoadedEpisode ?
            <EpisodeList data={this.state.dataEpisode} id={this.props.match.params.id} uri={this.props.match.params.name} name={this.state.data[1].title} type={this.props.match.params.type === 'TV' ? 'anime' : this.props.match.params.type} />
            :
            <div className="d-flex justify-content-center align-items-center" style={{height:'100px'}}>
              <ReactLoading type={'spin'} color={'gray'} height={'8%'} width={'8%'} />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default AnimeWatch;
