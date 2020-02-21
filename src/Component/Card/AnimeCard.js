import React from 'react'
import {Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'

class AnimeCard extends React.Component {

  render() {
    let path = this.props.data.type === 'TV' ? '/anime/'+this.props.data.title.replace(/[!.:;'"()]/g, '').toLowerCase()+'/'+this.props.data.id
    : '/'+this.props.data.type.toLowerCase()+'/'+this.props.data.title.replace(/[!.:'";()]/g, '').toLowerCase()+'/'+this.props.data.id
    path = path.replace(/[ ]/g, '-')
    return (
      <Link className="card-link"
            to= {{
              pathname: path
            }}>
        <Card className="anime-card p-1">
          <div className="image-card">
            <Card.Img variant="top" src={this.props.data.image_url} />
            <span>
              <p className="anime-card-description bg-info font-weight-bold text-center p-2 m-0 col-5" style={{opacity:0.8, position:'absolute', bottom: 0, left:0}}>{this.props.data.type}</p>
              <p className="anime-card-description bg-warning font-weight-bold text-center p-2 m-0 col-7" style={{opacity:0.8, position:'absolute', bottom: 0, right:0}}>{this.props.data.status}</p>
            </span>
          </div>
          <Card.Body>
            <p className="text-break text-center font-weight-bold" style={{fontSize:12}}>{this.props.data.title}</p>
          </Card.Body>
        </Card>
      </Link>
    );
  }
}

export default AnimeCard;
