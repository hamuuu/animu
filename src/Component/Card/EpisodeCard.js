import React from 'react';
import { GoCalendar } from "react-icons/go";
import { Link } from 'react-router-dom';
import TimeAgo from 'timeago-react';

class EpisodeCard extends React.Component {

  render() {
    let path = this.props.data.anime.type === 'TV' ? 'anime/'+this.props.data.anime.title.replace(/[!.:;()]/g, '').toLowerCase()+'/'
              +this.props.data.anime_id+'/'+this.props.data.episode
            :  this.props.data.anime.type.toLowerCase()+'/'+this.props.data.anime.title.replace(/[!.:;()]/g, '').toLowerCase()+'/'+this.props.data.anime_id
              +'/'+this.props.data.episode
    path = path.replace(/[ ]/g, '-')
    return (
      <Link to={path} className="episode-container-card d-flex my-1" style={{ textDecoration: 'none' }}>
          <div className="episode-image-container">
            <img className="episode-image" src={'http://localhost:8000/images/'+this.props.data.thumbnail} alt=""/>
          </div>
          <div className="episode-detail pl-3">
            <p className="episode-title card-link">{this.props.data.anime.title}</p>
            <p className="text-dark" style={{margin: 0}}>Episode {this.props.data.episode}</p>
            <p className="text-muted mt-2" style={{fontSize: '0.7rem'}}><GoCalendar /> <TimeAgo datetime={this.props.data.created_at} locale='jk_ID'/></p>
          </div>
      </Link>
    );
  }
}

export default EpisodeCard;
