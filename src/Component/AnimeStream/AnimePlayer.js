import React from 'react';
import TimeAgo from 'timeago-react';
import { GoCalendar } from "react-icons/go";
import LinkAnime from './LinkAnime';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavigateEpisode from './NavigateEpisode';


class AnimePlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videoUrl : '',
      data : [],
      dataEpisode : props.data
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataEpisode.id !== this.props.dataEpisode.id) {
      this.getData(this.props.dataEpisode.anime_id,this.props.dataEpisode.id)
      this.setState({
        dataEpisode : {...prevState.dataEpisode, episode: this.props.dataEpisode.episode}
      });
    }
  }

  getData = (anime_id, id) => {
    axios.get(window.url_api + 'episode/link_streams/'+this.props.dataEpisode.anime_id+'/'+this.props.dataEpisode.id)
      .then(res => {
        if (res.data[0] !== undefined) {
          this.setState({
            videoUrl : res.data[0].link,
            data: res.data
          });
        } else {
          this.setState({
            videoUrl : '/video_not_found.png'
          });
        }
      })
  }

  componentDidMount() {
    this.getData(this.props.dataEpisode.anime_id,this.props.dataEpisode.id)
  }

  changeStreamUrl = (link) => {
    this.setState({
      videoUrl : link
    });
  }

  render() {
    // console.log(this.props.dataEpisode.episode === '1');
    return (
      <div>
        <div className="breadcrumb d-flex align-items-center">
          <Link to="/">
            Home
          </Link>
          <div className="font-weight-bold px-2"> › </div>
          <Link to={'/'+this.state.dataEpisode.type}>
            {this.state.dataEpisode.type.charAt(0).toUpperCase() + this.state.dataEpisode.type.slice(1)}
          </Link>
          <div className="font-weight-bold px-2"> › </div>
          <Link to={'/'+this.state.dataEpisode.type+'/'+this.state.dataEpisode.name+'/'+this.state.dataEpisode.id}>
            {this.props.title}
          </Link>
          <div className="font-weight-bold px-2"> › </div>
          <Link to="">
            Episode {this.state.dataEpisode.episode}
          </Link>
        </div>

        <div className="pt-1 px-3 title-anime-watch-detail">
          {this.props.title} Episode {this.state.dataEpisode.episode} Subtitle Indonesia
        </div>
        <p className="text-muted px-3" style={{fontSize: '0.7rem'}}><GoCalendar /> <TimeAgo datetime={this.props.dataEpisode.created_at} locale='jk_ID'/></p>
        <hr/>

        <div id="video-player" className="row justify-content-center px-2">
          <div className="react-player col-12 col-md-10 border bg-dark rounded px-3 py-3">
            {this.state.videoUrl === '/video_not_found.png' ?
              <img src={this.state.videoUrl} alt="Video Not Found" style={{width: '100%', height: '100%', border:'none', overflow: 'hidden'}}/>
              :
              <div>
                <div className="col-12">
                  <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item"
                        src={this.state.videoUrl}
                        allowFullScreen
                        title={this.props.title}
                        frameBorder={0}
                        autoPlay={false}
                        style={{overflow: 'hidden'}}
                        >
                    </iframe>
                  </div>

                </div>
                <div className="d-flex justify-content-center pt-2 col-12">
                  {this.state.data.map((items, key) =>
                    <button onClick = {() => this.changeStreamUrl(items.link)}
                            className={this.state.videoUrl === items.link ? "bg-info btn m-1 p-2 text-dark font-weight-bold" : "bg-light btn m-1 p-2 text-dark" }
                            key={items.id}
                            style={{fontSize:'0.8rem'}}
                    >
                      {items.hosting}
                    </button>
                  )}
                </div>
              </div>
            }
          </div>
          <div className="col-12 mt-5 col-md-6 mb-3">
            <LinkAnime animeId = {this.props.dataEpisode.anime_id} episodeId = {this.props.dataEpisode.id} />
          </div>
        </div>
        <div className="row justify-content-center pb-3">
          <NavigateEpisode dataEpisode = {this.state.dataEpisode} />
        </div>

      </div>
    );
  }
}

export default AnimePlayer;
