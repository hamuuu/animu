import React from 'react'

class LinkAnime extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      isLoaded: false
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/episode/link/'+this.props.animeId+'/'+this.props.episodeId)
      .then( res => {
        if(res.status === 200)
           return res.json()
         })
      .then( resJson => {
        this.setState({
            data: resJson,
            isLoaded: true
        })
     })
  }

  render() {
    return (
      <div className="link-container">
        <p className="p-2 title-anime-watch-detail bg-info border-bottom" style={{marginBottom: 0}}>Link Download</p>
        <div className="border">
          <div className="d-flex p-2 font-weight-bold">
            <p style={{width: '50%'}}>720p</p>
            { this.state.isLoaded ? this.state.data[0].map((items, index) => <div className="mx-2 text-break" key={items.id}><a href={items.link}>{items.hosting}</a></div> )
              : ''
            }
          </div>
          <div className="d-flex p-2 font-weight-bold">
            <p style={{width: '50%'}}>480p</p>
            { this.state.isLoaded ? this.state.data[1].map((items, index) => <div className="mx-2 text-break" key={items.id}><a href={items.link}>{items.hosting}</a></div> )
            : ''
            }
          </div>
          <div className="d-flex p-2 font-weight-bold">
            <p style={{width: '50%'}}>360p</p>
            { this.state.isLoaded ? this.state.data[2].map((items, index) => <div className="mx-2 text-break" key={items.id}><a href={items.link}>{items.hosting}</a></div> )
            : ''
            }
          </div>
        </div>
      </div>
    );
  }
}

export default LinkAnime;
