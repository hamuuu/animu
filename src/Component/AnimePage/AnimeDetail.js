import React from 'react';
import ReactPlayer from 'react-player';
import TypeAnime from './TypeAnime';
import SinopsisAnime from './SinopsisAnime'
import { TiStarFullOutline } from "react-icons/ti";

class AnimeDetail extends React.Component {

  render() {
    return (
      <div style={{borderRadius:50}} className="pb-5">
        {this.props.data.video_url === '-' ?
          <img src="/video_not_found.png" alt="" style={{width:'100%', height:'360px'}} />
          :
          <ReactPlayer url={this.props.data.video_url} width = {'100%'} />
        }
        <div className="row justify-content-center">

          <div className="image-detail text-center col-md-2 col-sm-3 col-7">
            <img src={this.props.data.image_url} className="border border-outline-light" alt="Not Found." style={{width:'100%'}} />
            <div className = "font-weight-bold text-center mt-1 text-primary info-anime">{this.props.data.status}</div>
          </div>

          <div className="col-md-9 col-12">
            <div className="col-12 title-anime-detail anime-title mt-3"> {this.props.data.title}</div>
            <div className="col-12 text-muted">{this.props.data.title_japanese}</div>
            <div className="row col-md-12 mt-1 align-items-center title-anime-detail justify-content-between">
              <div className="col-md-10 col-8">
                <TiStarFullOutline className="text-warning mr-1" size={'1em'} />
                {this.props.data.score}
              </div>
              <div className="col-md-2 col-4 pr-0">
                <TypeAnime type={this.props.data.type}/>
              </div>
            </div>

            <div className="row ml-2 justify-content-around">
              <div className="row col-md-6 col-12 mt-2 sub-anime-detail text-break info-anime">
                <p className="col-md-2 col-3 p-0 font-weight-bold">Genres</p>
                <p className="col-md-1 col-1 p-0">:</p>
              <p className="col-md-9 col-7 p-0">{this.props.data.genre.replace(/,/g , ', ')}</p>
              </div>
              <div className="row col-md-6 col-12 mt-2 sub-anime-detail text-break info-anime">
                <p className="col-md-2 col-3 p-0 font-weight-bold">Episode</p>
                <p className="col-md-1 col-1 p-0">:</p>
                <p className="col-md-9 col-7 p-0">{this.props.data.episode}</p>
              </div>
            </div>

            <div className="row ml-2 justify-content-around">
              <div className="row col-md-6 col-12 mt-2 sub-anime-detail text-break info-anime">
                <p className="col-md-2 col-3 p-0 font-weight-bold">Release Date</p>
                <p className="col-md-1 col-1 p-0">:</p>
                <p className="col-md-9 col-7 p-0">{this.props.data.release_date}</p>
              </div>
              <div className="row col-md-6 col-12 mt-2 sub-anime-detail text-break info-anime">
                <p className="col-md-2 col-3 p-0 font-weight-bold">Duration</p>
                <p className="col-md-1 col-1 p-0">:</p>
                <p className="col-md-9 col-7 p-0">{this.props.data.duration}.</p>
              </div>
            </div>

            <div className="row ml-2 justify-content-around">
              <div className="row col-md-6 col-12 mt-2 sub-anime-detail text-break info-anime">
                <p className="col-md-2 col-3 p-0 font-weight-bold">Studio</p>
                <p className="col-md-1 col-1 p-0">:</p>
                <p className="col-md-9 col-7 p-0">{this.props.data.studio}</p>
              </div>
              <div className="row col-md-6 col-12 mt-2 sub-anime-detail text-break info-anime">
                <p className="col-md-2 col-3 p-0 font-weight-bold">Rating</p>
                <p className="col-md-1 col-1 p-0">:</p>
                <p className="col-md-9 col-7 p-0">{this.props.data.rating}.</p>
              </div>
            </div>

          </div>
        </div>

        <hr style={{width:'96%'}}/>

        <div className="mx-3 text-justify text-muted font-weight-bold">
          <h5 className="text-info">Sinopsis</h5>
          <br />
          <SinopsisAnime synopsis={this.props.data.synopsis}/>
        </div>

      </div>
    );
  }
}

export default AnimeDetail;
