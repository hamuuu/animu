import React from 'react'
import { Link } from 'react-router-dom';

class MenuAdmin extends React.Component {

  logout = () => {
      localStorage.clear()
      window.location.reload()
  }

  render () {
    return (
      <div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-danger" onClick={this.logout}>Logout</button>
        </div>
        <Link to="/new-anime"><div className="text-center mx-auto d-flex justify-content-center title-anime-detail">
          <p className="border border-danger rounded p-3 d-block" style={{width: '20vw'}}>New Anime</p>
        </div></Link>
        <Link to="/upload-episode"><div className="text-center mx-auto d-flex justify-content-center title-anime-detail">
          <p className="border border-danger rounded p-3 d-block" style={{width: '20vw'}}>Upload Episode</p>
        </div></Link>
        <Link to="/update-anime"><div className="text-center mx-auto d-flex justify-content-center title-anime-detail">
          <p className="border border-danger rounded p-3 d-block" style={{width: '20vw'}}>Update Anime</p>
        </div></Link>
      <Link to="/update-episode"><div className="text-center mx-auto d-flex justify-content-center title-anime-detail">
          <p className="border border-danger rounded p-3 d-block" style={{width: '20vw'}}>Update Episode</p>
        </div></Link>
        <br/>
      </div>
    )
  }
}

export default MenuAdmin;
