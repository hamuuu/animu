import React from 'react';
import TimeAgo from 'timeago-react';
import { GoCalendar } from "react-icons/go";
import LinkAnime from './LinkAnime';
import axios from 'axios';
import { Link } from 'react-router-dom';


class AnimePlayer extends React.Component {
  constructor() {
    super()
    this.state = {
      videoUrl : '',
      data : []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/episode/link_streams/'+this.props.dataEpisode.anime_id+'/'+this.props.dataEpisode.id)
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

  changeStreamUrl = (link) => {
    this.setState({
      videoUrl : link
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div className="breadcrumb d-flex align-items-center">
          <Link to="/">
            Home
          </Link>
          <div className="font-weight-bold px-2"> › </div>
          <Link to={'/'+this.props.data.type}>
            {this.props.data.type.charAt(0).toUpperCase() + this.props.data.type.slice(1)}
          </Link>
          <div className="font-weight-bold px-2"> › </div>
          <Link to={'/'+this.props.data.type+'/'+this.props.data.name+'/'+this.props.data.id}>
            {this.props.title}
          </Link>
          <div className="font-weight-bold px-2"> › </div>
          <Link to="">
            Episode {this.props.data.episode}
          </Link>
        </div>

        <div className="pt-1 px-3 title-anime-watch-detail">
          {this.props.title} Episode {this.props.data.episode} Subtitle Indonesia
        </div>
        <p className="text-muted px-3" style={{fontSize: '0.7rem'}}><GoCalendar /> <TimeAgo datetime={this.props.dataEpisode.created_at} locale='jk_ID'/></p>
        <hr/>

        <div className="row justify-content-center px-2">
          <div className="react-player col-12 col-md-7 px-3">
            {this.state.videoUrl === '/video_not_found.png' ?
              <img src={this.state.videoUrl} alt="Video Not Found" style={{width: '100%', height: '100%', border:'none', overflow: 'hidden'}}/>
              :
              <div>
                <video controls src={this.state.videoUrl}  style={{width: '100%', height: '100%', border:'none', overflow: 'hidden'}} />
                <div className="d-flex col-md-7">
                  {this.state.data.map((items, key) =>
                    <button onClick = {() => this.changeStreamUrl(items.link)}
                      className={this.state.videoUrl === items.link ? "bg-info btn m-1 p-2 text-dark font-weight-bold" : "bg-light btn m-1 p-2 text-dark" }
                      key={items.id}
                      style={{fontSize:'0.7rem'}}
                      >
                      {items.hosting}
                    </button>
                  )}
                </div>
              </div>
            }
          </div>
          <div className="col-12 mt-5 col-md-5 mb-3">
            <LinkAnime animeId = {this.props.dataEpisode.anime_id} episodeId = {this.props.dataEpisode.id} />
          </div>
        </div>
        <div className="row justify-content-center pb-3">
          <Link to={'/' + this.props.data.type + '/' + this.props.data.name + '/' + this.props.data.id + '/' + (this.props.data.episode - 1)}>
            <div className="p-2 m-2"><button name="prev" className="bg-dark text-light btn">« Prev Episode</button></div>
          </Link>
          <Link to={'/' + this.props.data.type + '/' + this.props.data.name + '/' + this.props.data.id + '/' + (this.props.data.episode + 1)}>
            <div className="p-2 m-2"><button name="next" className="bg-dark text-light btn">Next Episode »</button></div>
          </Link>
        </div>

      </div>
    );
  }
}

export default AnimePlayer;
