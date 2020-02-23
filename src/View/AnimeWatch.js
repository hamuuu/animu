import React from 'react';
import AnimePlayer from '../Component/AnimeStream/AnimePlayer';
import ReactLoading from 'react-loading';
import SearchBar from '../Component/SearchMenu/SearchBar';
import EpisodeList from '../Component/List/EpisodeList';
import NotFoundEpisode from '../Component/NotFoundEpisode';
import axios from 'axios';

class AnimeWatch extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      isLoaded: false
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (state.isLoaded) {
      if (state.data[0] !== null) {
        if (props.match.params.episode !== state.data[0].episode) {
          let temp = {...state.data}
          temp[0].episode = props.match.params.episode
          return {
            data: temp
          };
        }
      }
    }

    // Return null if the state hasn't changed
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.episode !== prevProps.match.params.episode) {
      this.getData(this.props.match.params.type, this.props.match.params.id, this.state.data[0].episode)
    }
  }


  getData = (type, id, episode) => {

    fetch(window.url_api + ''+type+'/'+id+'/'+ episode)
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

     axios.get(window.url_api + 'episode/'+id)
       .then(res => {
         this.setState({
           isLoadedEpisode : true,
           dataEpisode : res.data
         });
       })
  }

  componentDidMount() {
    this.getData(this.props.match.params.type, this.props.match.params.id, this.props.match.params.episode)
  }

  render() {
    console.log(this.state.data[0]);
    return (
      <div>
        <SearchBar />
        { this.props.dataEpisode !== null ?
          <div>
            <div className="container container-player mt-3" style={{padding: 0}}>
              {

                this.state.isLoaded ?
                  this.state.data[0] !== null ?
                    <AnimePlayer title={this.state.data[1].title} data={this.props.match.params} dataEpisode={this.state.data[0]} />
                    : <NotFoundEpisode />

                :
                <div className="d-flex justify-content-center align-items-center" style={{height:'100px'}}>
                  <ReactLoading type={'spin'} color={'gray'} height={'8%'} width={'8%'} />
                </div>

              }
            </div>
            <div className="container mt-3" style={{padding:0}}>
              {this.state.isLoadedEpisode ?
                <EpisodeList data={this.state.dataEpisode}
                  id={this.props.match.params.id}
                  uri={this.props.match.params.name}
                  name={this.state.data[1].title}
                  type={this.props.match.params.type === 'TV' ? 'anime' : this.props.match.params.type}
                  />
                :
                <div className="d-flex justify-content-center align-items-center" style={{height:'100px'}}>
                  <ReactLoading type={'spin'} color={'gray'} height={'8%'} width={'8%'} />
                </div>
              }
            </div>
          </div>
         : <NotFoundEpisode />
        }
      </div>
    );
  }
}

export default AnimeWatch;
