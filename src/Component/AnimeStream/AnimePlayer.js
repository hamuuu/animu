import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import TimeAgo from 'timeago-react';
import { GoCalendar } from "react-icons/go";
import LinkAnime from './LinkAnime';
import axios from 'axios';


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
    console.log(link);
    this.setState({
      videoUrl : link
    });
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="/" className="text-dark">
              Home
          </Breadcrumb.Item>
          <Breadcrumb.Item href={'/'+this.props.data.type} className="text-dark">
              {this.props.data.type.charAt(0).toUpperCase() + this.props.data.type.slice(1)}
          </Breadcrumb.Item>
          <Breadcrumb.Item href={'/'+this.props.data.type+'/'+this.props.data.name+'/'+this.props.data.id} className="text-dark">
              {this.props.title}
          </Breadcrumb.Item>
          <Breadcrumb.Item className="font-weight-bold text-dark" active>
              Episode {this.props.data.episode}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="pt-1 px-3 title-anime-watch-detail">
          {this.props.title} Episode {this.props.data.episode} Subtitle Indonesia
        </div>
        <p className="text-muted px-3" style={{fontSize: '0.7rem'}}><GoCalendar /> <TimeAgo datetime={this.props.dataEpisode.created_at} locale='jk_ID'/></p>
        <hr/>
        <div className="d-flex pb-5">
          <div className="react-player px-3">
            {this.state.videoUrl === '/video_not_found.png' ?
              <img src={this.state.videoUrl} alt="Video Not Found" style={{width: '100%', height: '100%', border:'none', overflow: 'hidden'}}/>
              :
              <video controls src={this.state.videoUrl}  style={{width: '100%', height: '100%', border:'none', overflow: 'hidden'}} />
            }
            <div className="d-flex bg-dark">
              {this.state.data.map((items, key) =>
                <button onClick = {() => this.changeStreamUrl(items.link)} className="bg-light btn m-1 p-2 text-dark font-weight-bold" key={items.id} style={{fontSize:'0.7rem'}}>{items.hosting}</button>
              )}
            </div>
          </div>
          <LinkAnime animeId = {this.props.dataEpisode.anime_id} episodeId = {this.props.dataEpisode.id} />
        </div>
      </div>
    );
  }
}

export default AnimePlayer;
