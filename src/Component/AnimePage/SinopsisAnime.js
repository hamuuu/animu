import React from 'react';

class SinopsisAnime extends React.Component {

  render() {
    return (
      <div>
        <p className="synopsis-anime">
          {this.props.synopsis}
        </p>
      </div>
    );
  }
}

export default SinopsisAnime;
