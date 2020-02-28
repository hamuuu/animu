import React from 'react'
import {Link} from 'react-router-dom';

const NotFoundEpisode = (props) => {
  return (
    <div className="container text-center">
      <div className="font-weight-bold pt-5">
        Episode Not Found :D
        <div>
          <img src="/j69nf.jpg" alt="" className="img-fluid mt-2"/>
        </div>
      </div>
      <div className="row justify-content-center">
        <Link to={{pathname : '/'+props.type+'/'+props.uri+'/'+props.id}}>
          <button className="btn btn-primary mt-5">Go To  [<span className="font-weight-bold">{props.name}</span>]  Page</button>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundEpisode
