import React from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import {Link} from 'react-router-dom';

class Back extends React.Component {

  render () {
    return(
      <div>
          <Link to="/admin">
            <button className="text-info border rounded"><IoIosArrowRoundBack size={'2em'}/></button>
          </Link>
      </div>
    )
  }
}

export default Back;
