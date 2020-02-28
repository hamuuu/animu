import React from 'react'
import {Link} from 'react-router-dom';

const NavigateEpisode = (props) => {
  return (
    <>
      <Link to={'/' + props.dataEpisode.type + '/' + props.dataEpisode.name + '/' + props.dataEpisode.id + '/' + (parseInt(props.dataEpisode.episode) - 1)}>
        <div className="p-2 m-2">
          <button name="prev" className="bg-dark text-light btn" style={{ display: props.dataEpisode.episode === '1' ? 'none' : ''}}>
            « Prev Episode
          </button>
        </div>
      </Link>
      <Link to={'/' + props.dataEpisode.type + '/' + props.dataEpisode.name + '/' + props.dataEpisode.id + '/' + (parseInt(props.dataEpisode.episode) + 1)}>
        <div className="p-2 m-2">
          <button name="next" className="bg-dark text-light btn">
            Next Episode »
          </button>
        </div>
      </Link>
    </>
  )
}

export default NavigateEpisode
