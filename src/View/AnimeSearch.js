import React from 'react'
import ReactLoading from 'react-loading';
import AnimeCard from '../Component/Card/AnimeCard';
import Pagination from '../Component/Pagination';
import axios from 'axios';
import { MDBCol } from "mdbreact";
import { GoSearch } from "react-icons/go";
import { Link } from 'react-router-dom';


class AnimeSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      search: props.match.params.id,
      isLoaded: false
    }
  }

  getData = (id) => {
    axios.get(window.url_api + 'search/'+id+'/no')
      .then(res => {
        this.setState({
          isLoaded : true,
          data : res.data
        });
      })
  }

  componentDidMount() {
    this.getData(this.props.match.params.id)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getData(this.props.match.params.id)
    }
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    });
  }

  paginate = (number) => {
    this.setState({
      isLoaded: false
    });

    axios.get(window.url_api + `search/`+this.props.match.params.id+`/no?page=`+number)
      .then(res => {
        this.setState({
          isLoaded : true,
          data : res.data
        });
      })

    this.setState({
      currentPage : number
    })
  };


  render () {
    return(
      <div>
        <div>
          <div className="pt-4 pb-1">
            <form onSubmit={this.handleSubmit}>
              <MDBCol className="mx-auto" md="3">
                <div className="active-pink-3 active-pink-4 mb-4 d-flex">
                  <input style={{paddingRight: '20px'}} value={this.state.search} onChange={this.handleChange} className="form-control" type="text" placeholder="Cari disini gan.." aria-label="Search" />
                  <Link to={"/search/"+this.state.search} style={{textDecoration: 'none'}}>
                    <button className="text-muted pt-1" style={{border: 0, backgroundColor: 'transparent', marginLeft: '-35px', paddingBottom:'3px'}}><GoSearch /></button>
                  </Link>
                </div>
              </MDBCol>
            </form>
          </div>
        </div>
        <div className="container my-3">
          <div className="py-3">
            <h5 className="pb-2 recommend-title mb-3 text-info border-bottom">Hasil Penelusuran</h5>
            <div className="px-1 row">
              {this.state.isLoaded ?
                this.state.data.data.length > 0 ?
                  this.state.data.data.map((item, key) =>
                  <div key={item.id} className="p-1 col-md-3 col-lg-2 col-sm-4 col-6">
                    <AnimeCard data={item}/>
                  </div>)
                  :
                  <div className="mx-auto py-3">
                    <img src="/j69nf.jpg" className="img-fluid" alt="Not Found"/>
                  </div>
                :
                <ReactLoading className="mt-4 mx-auto" type={'spin'} color={'gray'} height={'8%'} width={'8%'} />
              }
            </div>
            <div>
              <Pagination currentPage = {this.state.data.current_page}
                          totalPost = {this.state.data.total}
                          paginate = {this.paginate}
                          postPerPage = {this.state.data.per_page}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AnimeSearch;
