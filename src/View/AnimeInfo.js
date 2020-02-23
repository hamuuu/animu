import React, {Component} from 'react';
import AnimeDetail from '../Component/AnimePage/AnimeDetail';
import ReactLoading from 'react-loading';
import EpisodeList from '../Component/List/EpisodeList';
import SearchBar from '../Component/SearchMenu/SearchBar';
import axios from 'axios';



class AnimeInfo extends Component {
  constructor() {
    super()
    this.state = {
      dataAnime: {},
      dataEpisode: {},
      isLoadedDetail: false,
      isLoadedEpisode: false
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.match.params.id !== state.dataAnime.id) {
      return {
        dataAnime: {...state.dataAnime , id: props.match.params.id}
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getData(this.state.dataAnime.id)
    }
  }


  getData = (id) => {
      axios.get(window.url_api + 'anime/'+id)
        .then(res => {
          this.setState({
            isLoadedDetail : true,
            dataAnime : res.data
          });
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
      this.getData(this.props.match.params.id)
  }

  render() {
    return (
      <div>
        <SearchBar />
        <div className="container" style={{padding:0}}>
          {this.state.isLoadedDetail ?
            <AnimeDetail data={this.state.dataAnime}/>
            :
            <div className="d-flex justify-content-center align-items-center" style={{height:'100px'}}>
              <ReactLoading type={'spin'} color={'gray'} height={'8%'} width={'8%'} />
            </div>
          }
        </div>
        <div className="container mt-3" style={{padding:0}}>
          {this.state.isLoadedEpisode ?
            <EpisodeList data={this.state.dataEpisode} id={this.props.match.params.id} uri={this.props.match.params.name} name={this.state.dataAnime.title} type={this.props.match.params.type === 'TV' ? 'anime' : this.props.match.params.type} />
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

export default AnimeInfo;
