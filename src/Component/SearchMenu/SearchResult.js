import React from 'react';
import AnimeCard from '../Card/AnimeCard';
import ReactLoading from 'react-loading';
import { AiFillRightCircle } from "react-icons/ai";
import {Link} from 'react-router-dom';

class SearchResult extends React.Component {

  handleClick = () => {
    this.props.getDataChild(true)
  }

  render() {
    return (
      <div className="py-3 my-3">
        <h5 className="pb-2 recommend-title mb-3 text-info border-bottom">Hasil Pencarian</h5>
        <div className="row mx-auto align-items-start" style={{width:'100%'}}>
          {this.props.isLoaded ?
              <ReactLoading className="mt-4 mx-auto" type={'spin'} color={'gray'} height={'8%'} width={'8%'} />
              :
              this.props.data.length > 0 ?
                this.props.data.map((items, key) =>
                  <div className="col-md-3 col-lg-2 col-sm-4 p-0 col-6" onClick={this.handleClick} key={items.id}>
                    <AnimeCard  data={items}/>
                  </div>)
                  :
                  <img src="./404_not_found.png.webp" alt="Not Found." className="col-12" />
          }
          { this.props.data.length === 11 ?
              <div className="text-center my-auto col-md-3 col-lg-2 col-sm-4 col-6">
                <Link to={"/search/"+this.props.query} style={{textDecoration: 'none'}}>
                  <AiFillRightCircle  size={'5em'} />
                  <p className="sub-anime-detail align-center">More..</p>
                </Link>
              </div>
              :
              ''
          }
        </div>
      </div>
    );
  }
}

export default SearchResult;
