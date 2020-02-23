import React from 'react';
import EpisodeCard from '../Card/EpisodeCard';
import ReactLoading from 'react-loading';
import Pagination from '../Pagination';
import axios from 'axios';

class NewEpisodeList extends React.Component {
  constructor() {
    super()
    this.state ={
      data: [],
      isLoaded : false,
      currentPage : 1,
      dataPerPage : 9
    }
  }

  componentDidMount() {
    axios.get(window.url_api + `episode`)
      .then(res => {
        this.setState({
          isLoaded : true,
          data : res.data
        });
      })
  }

  paginate = (number) => this.setState({
    currentPage : number
  });

  render() {
    const indexOfLastPost = this.state.currentPage * this.state.dataPerPage
    const indexOfFirstPost = indexOfLastPost - this.state.dataPerPage
    const currentPosts = this.state.data.slice(indexOfFirstPost, indexOfLastPost)
    return (
      <div className="py-3" id="new-episode">
        <h5 className="pb-2 recommend-title mb-3 text-info border-bottom">Tonton Episode Terbaru</h5>
        <div className="row">
          {this.state.isLoaded ?
            currentPosts.map((item, key) =><div key={item.id} className="col-md-4 col-sm-6 col-12"><EpisodeCard data={item}/></div>)
            :
            <ReactLoading className="mt-4 mx-auto" type={'spin'} color={'gray'} height={'8%'} width={'8%'} />
          }
        </div>
        {this.state.isLoaded ?
          <Pagination currentPage = {this.state.currentPage}
                      totalPost = {this.state.data.length}
                      paginate = {this.paginate}
                      postPerPage = {this.state.dataPerPage}
                       />
          : ''
        }
      </div>
    );
  }
}

export default NewEpisodeList;
