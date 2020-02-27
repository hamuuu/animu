import React from 'react'

class LinkAnime extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      isLoaded: false
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.episodeId !== this.props.episodeId) {
        this.getData(this.props.animeId, this.props.episodeId)
    }
  }

  getData = (id, episode_id) => {
    fetch(window.url_api + 'episode/link/'+id+'/'+episode_id)
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

  componentDidMount() {
    this.getData(this.props.animeId, this.props.episodeId)
  }

  render() {
    return (
      <div className="link-container">
        <p className="p-2 bg-dark font-weight-bold text-light border-bottom" style={{marginBottom: 0}}>Link Download</p>
        <div className="border">

          <div className="d-flex p-2 font-weight-bold">
            <div className="border-right border-dark col-3">720p</div>
            <div className="d-flex flex-wrap col-9 justify-content-center">
              { this.state.isLoaded ? this.state.data[0].map((items, index) =>
                <div className="mx-2 text-break" key={items.id}>
                  <a href={items.link}>{items.hosting}</a>
                </div> )
                : ''
              }
            </div>
          </div>

          <div className="d-flex p-2 font-weight-bold">
            <div className="border-right border-dark col-3">480p</div>
              <div className="d-flex flex-wrap col-9 justify-content-center w-100">
                { this.state.isLoaded ? this.state.data[1].map((items, index) =>
                  <div className="mx-2 text-break" key={items.id}>
                    <a href={items.link}>{items.hosting}</a>
                  </div> )
                  : ''
                }
              </div>
          </div>

          <div className="d-flex p-2 font-weight-bold">
            <div className="border-right border-dark col-3">360p</div>
              <div className="d-flex flex-wrap col-9 justify-content-center w-100">
                { this.state.isLoaded ? this.state.data[2].map((items, index) =>
                  <div className="mx-2 text-break" key={items.id}>
                    <a href={items.link}>{items.hosting}</a>
                  </div> )
                  : ''
                }
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LinkAnime;
