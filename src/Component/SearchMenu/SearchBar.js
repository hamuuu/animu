import React from 'react';
import { MDBCol } from "mdbreact";
import { GoSearch } from "react-icons/go";
import SearchResult from './SearchResult';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor() {
    super()
    this.state = {
      search : '',
      data : [],
      isLoaded: false,
      searchDisplay : false
    }
  }

  handleChange = async (event) => {
    if (event.target.value !== '') {
      this.search(event.target.value)
      this.setState({
        searchDisplay : true
      });
    } else {
      this.setState({
        searchDisplay : false
      });
    }
    this.setState({
      search : event.target.value
    })
  }

  search = async (val) => {
    this.setState({
      isLoaded : true
    });

    const res = await axios(window.url_api + 'search/'+val+'/yes')
    const list = await res.data;
    this.setState({
      data : list,
      isLoaded : false
    });
  }

  getDataChild = (data) => {
    if (data) {
      this.setState({
        searchDisplay : false
      });
    }
  }

  render() {
    return (
      <div>
        <div className="pt-4 pb-1">
          <form onSubmit={this.handleSubmit}>
            <MDBCol className="mx-auto" md="3">
              <div className="active-pink-3 active-pink-4 mb-4 d-flex">
                <input style={{paddingRight: '20px'}} value={this.state.search} onChange={this.handleChange} className="form-control" type="text" placeholder="Cari disini gan.." aria-label="Search" />
                <Link to={"/search/"+this.state.search} style={{textDecoration: 'none'}}>
                  <button className="text-muted" style={{border: 0, backgroundColor: 'transparent', marginLeft: '-35px', paddingBottom:'3px'}}><GoSearch /></button>
                </Link>
              </div>
            </MDBCol>
          </form>
        </div>
        <CSSTransition
          in={this.state.searchDisplay}
          timeout={100}
          classNames="list-transition"
          unmountOnExit
          appear
         >
          <div className="mt-3 container search-result">
            <SearchResult data = {this.state.data} getDataChild = {this.getDataChild} query= {this.state.search} isLoaded = {this.state.isLoaded}/>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export default SearchBar;
