import React from 'react';
import { FiMonitor } from "react-icons/fi";

class TypeAnime extends React.Component {
  render() {
    return (
      <div className="pt-2">
        <div className="d-flex">
          <FiMonitor color={'blue'} size={'1.5em'} />
          <p className = "ml-2 mr-3" style={{color:'blue'}}>{this.props.type}</p>
        </div>
      </div>
    );
  }
}

export default TypeAnime;
