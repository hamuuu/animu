import React from 'react'
import SearchBar from '../Component/SearchMenu/SearchBar';

class AnimeBatch extends React.Component {
  render () {
    return (
      <div>
        <SearchBar />
          <div className="container mt-3">
            <div className="row border-bottom align-items-center">
              <h5 className="pt-3 px-3 col-12 recommend-title mb-3 text-info">Daftar Anime Batch</h5>
            </div>
          </div>
      </div>
    )
  }
}

export default AnimeBatch;
