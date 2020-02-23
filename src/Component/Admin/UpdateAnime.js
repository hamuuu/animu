import React from 'react'
import Back from './Back';
import { Form, FormGroup, Input  } from 'reactstrap'
import axios from 'axios';


class UpdateAnime extends React.Component {
  constructor () {
    super()
    this.state = {
      data: [],
      titleRomaji : '',
      titleJapanese : '',
      genre : '',
      rating : '',
      type : '',
      episode : '',
      releaseDate : '',
      studio : '',
      score : '',
      sinopsis : '',
      imageUrl : '',
      videoUrl : '',
      status : '',
      duration: '',
      id: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
    });
    if (e.target.name === 'titleRomaji' && e.target.value !== '') {
      this.setState({
        isDisplayed: true
      });
      this.search(e.target.value)
    }
  }

  handleClick = (items) => {
    this.setState({
       isDisplayed: false,
       titleRomaji : items.title,
       titleJapanese : items.title_japanese,
       genre : items.genre,
       rating : items.rating,
       type : items.type,
       episode : items.episode,
       releaseDate : items.release_date,
       studio : items.studio,
       score : items.score,
       sinopsis : items.synopsis,
       imageUrl : items.image_url,
       videoUrl : items.video_url,
       status : items.status,
       id: items.id,
       duration: items.duration
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('titleRomaji', this.state.titleRomaji)
    formData.append('id', this.state.id)
    formData.append('titleJapanese', this.state.titleJapanese)
    formData.append('genre', this.state.genre)
    formData.append('status', this.state.status)
    formData.append('rating', this.state.rating)
    formData.append('type', this.state.type)
    formData.append('episode', this.state.episode)
    formData.append('releaseDate', this.state.releaseDate)
    formData.append('studio', this.state.studio)
    formData.append('score', this.state.score)
    formData.append('sinopsis', this.state.sinopsis)
    formData.append('imageUrl', this.state.imageUrl)
    formData.append('videoUrl', this.state.videoUrl)
    formData.append('duration', this.state.duration)
    axios.post(window.url_api + 'update-anime', formData,
      {
        headers: {
                'Content-Type':'multipart/form-data',
              }
      }
    )
      .then(function (response) {
          alert(response.data)
      })
      .catch(function (error) {
          console.log(error);
          alert('Gagal Input gan.')
      });
}

  search = async (val) => {

    const res = await axios(window.url_api + 'search/'+val+'/no')
    const list = await res.data;
    this.setState({
      data : list,
    })
  }



  render () {
    return(
        <div className="container my-3">
        <div className="p-3 d-flex align-items-center justify-content-between border-bottom">
          <h5 className="recommend-title text-info">Update Detail Anime</h5>
          <Back />
        </div>
        <Form autoComplete="off" onSubmit={this.handleSubmit} className="p-3 my-3 mx-auto" style={{width: '30vw'}} >
          <FormGroup>
              <div style={{position: 'relative'}}>
                <Input
                  type="text"
                  name="titleRomaji"
                  placeholder="Masukkan Judul Anime"
                  value={this.state.titleRomaji}
                  onChange={this.handleChange}
                  />
                {this.state.data.length > 0 && this.state.titleRomaji !== '' && this.state.isDisplayed ?
                  <div className="border border-info shadow"
                    style={{position: 'absolute', top: 40, width: '100%', zIndex: 100, backgroundColor: 'white'}}
                  >
                    {this.state.data.map((items,index) =>
                        <div className="p-3" key={index} onClick={() => this.handleClick(items)}>{items.title}</div>)}
                      </div>
                    : ''}
              </div>
          </FormGroup>
          <FormGroup>
              <div className="d-flex">
                <Input
                  type="text"
                  name="titleJapanese"
                  value={this.state.titleJapanese}
                  onChange={this.handleChange}
                  placeholder="Judul Anime Jepang"
                  />
              </div>
          </FormGroup>
          <FormGroup>
              <div className="d-flex">
                <Input
                  type="text"
                  name="status"
                  value={this.state.status}
                  onChange={this.handleChange}
                  placeholder="Status Penayangan"
                  />
              </div>
          </FormGroup>
          <FormGroup>
              <div className="d-flex">
                <Input
                  type="text"
                  name="genre"
                  value={this.state.genre}
                  onChange={this.handleChange}
                  placeholder="Genre"
                  />
              </div>
          </FormGroup>
          <FormGroup>
              <div className="d-flex">
                <Input
                  type="text"
                  name="rating"
                  value={this.state.rating}
                  onChange={this.handleChange}
                  placeholder="Rating"
                  />
              </div>
          </FormGroup>
          <FormGroup>
              <div className="d-flex">
                <Input
                  type="text"
                  name="duration"
                  value={this.state.duration}
                  onChange={this.handleChange}
                  placeholder="Durasi Tayang"
                  />
              </div>
          </FormGroup>
          <FormGroup>
              <div className="d-flex">
                <Input
                  type="text"
                  name="type"
                  value={this.state.type}
                  onChange={this.handleChange}
                  placeholder="Type"
                  />
              </div>
          </FormGroup>
          <FormGroup>
              <div className="d-flex">
                <Input
                  type="text"
                  name="episode"
                  value={this.state.episode}
                  onChange={this.handleChange}
                  placeholder="Episodes"
                  />
              </div>
          </FormGroup>
          <FormGroup>
              <div className="d-flex">
                <Input
                  type="text"
                  name="releaseDate"
                  value={this.state.releaseDate}
                  onChange={this.handleChange}
                  placeholder="Release Date"
                  />
              </div>
          </FormGroup>
          <FormGroup>
              <div className="d-flex">
                <Input
                  type="text"
                  name="studio"
                  value={this.state.studio}
                  onChange={this.handleChange}
                  placeholder="Studios"
                  />
              </div>
          </FormGroup>
          <FormGroup>
              <div className="d-flex">
                <Input
                  type="text"
                  name="score"
                  value={this.state.score}
                  onChange={this.handleChange}
                  placeholder="Score"
                  />
              </div>
          </FormGroup>
          <FormGroup>
              <div className="d-flex">
                <Input
                  type="textarea"
                  name="sinopsis"
                  value={this.state.sinopsis}
                  onChange={this.handleChange}
                  placeholder="Sinopsis"
                  />
              </div>
          </FormGroup>
          <FormGroup>
              <div className="d-flex">
                <Input
                  type="text"
                  name="videoUrl"
                  value={this.state.videoUrl}
                  onChange={this.handleChange}
                  placeholder="videoUrl"
                  />
              </div>
          </FormGroup>
          <FormGroup>
              <div className="d-flex">
                <Input
                  type="text"
                  name="imageUrl"
                  value={this.state.imageUrl}
                  onChange={this.handleChange}
                  placeholder="imageUrl"
                  />
              </div>
          </FormGroup>
          <div className="text-center">
            <button type="submit" onClick={this.handleSubmit} className="btn btn-success">Save</button>
          </div>
        </Form>
      </div>
    )
  }
}

export default UpdateAnime;
