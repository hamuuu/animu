import React from 'react';
import {Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'


class EpisodeList extends React.Component {
  constructor() {
    super()
    this.state ={
      data : [],
      isLoaded: false
    }
  }

  airedString = (date) => {
    let aired = new Date(date)
    return (aired.toISOString().split('T')[0]);
  }

  render() {
    return (
      <div>
        <div className="border-bottom bg-info">
          <div className="p-2 text-light">List Episode</div>
        </div>
        <div className="p-3 episode-container">
          <Table bordered striped hover size="sm" className="table-episodes">
            <thead className="bg-info text-light">
              <tr>
                <th className="text-center col-9" style={{verticalAlign: 'middle'}}>Judul Episode</th>
                <th className="col-3"> </th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.map((items, index) =>
                <tr key={items.episode}>
                    <td><div className="sub-anime-detail text-center">{this.props.name + ' Episode ' + items.episode}</div></td>
                    <td className="text-center">
                      <Link to={{pathname : '/'+this.props.type+'/'+this.props.uri+'/'+this.props.id+'/'+items.episode, title: this.props.name }}
                            className="link-anime-watch"
                      >
                        Watch or Download
                      </Link>
                    </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default EpisodeList;
