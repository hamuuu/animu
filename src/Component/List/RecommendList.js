import React from 'react';
import AnimeCard from '../Card/AnimeCard';
import ReactLoading from 'react-loading';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class RecommendList extends React.Component {
  constructor() {
    super()
    this.state={
      isLoaded: false,
      data: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/api/anime`)
      .then(res => {
        this.setState({
          isLoaded : true,
          data : res.data
        });
      })
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 780,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 550,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 420,
          settings: {
            dots: false,
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 260,
          settings: {
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="pt-3 pb-1">
        <h5 className="pb-2 recommend-title mb-3 text-info border-bottom">Recommend Just For You!</h5>
          <div className="mb-4">
            {this.state.isLoaded ?
              <Slider {...settings}>
                   {this.state.data.map((item, key) => <div key={item.id}><AnimeCard data={item}/></div>)}
              </Slider>
              : <ReactLoading className="mt-4 mx-auto" type={'spin'} color={'gray'} height={'8%'} width={'8%'} />
            }
          </div>
      </div>
    );
  }
}

export default RecommendList;
