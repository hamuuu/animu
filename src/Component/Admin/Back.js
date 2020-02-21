import React from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'

class Back extends React.Component {
  handleClick = () => {
    window.history.back()
  }

  render () {
    return(
      <div>
          <button onClick={this.handleClick} className="text-info border rounded"><IoIosArrowRoundBack size={'2em'}/></button>
      </div>
    )
  }
}

export default Back;
