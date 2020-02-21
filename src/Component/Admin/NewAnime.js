import React from 'react'
import { Button, Form, FormGroup, Input  } from 'reactstrap'
import axios from 'axios'
import Back from './Back'


class NewAnime extends React.Component {
  constructor () {
    super()
    this.state = {
      id : '',
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
      status : ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  getDataFromMal = () => {
    fetch('https://api.jikan.moe/v3/anime/'+this.state.id)
      .then( res => {
        if(res.status === 200)
           return res.json()
       })
      .then( resJson => {
        this.setState({
          titleRomaji : resJson.title  || '-',
          titleJapanese : resJson.title_japanese  || '-',
          genre : resJson.genres.map((items,index) => items.name)  || '-',
          rating : resJson.rating  || '-',
          type : resJson.type  || '-',
          episode : resJson.episodes  || '-',
          releaseDate : resJson.aired.string  || '-',
          studio : resJson.studios.map((items,index) => items.name)  || '-',
          score : resJson.score  || '',
          sinopsis : resJson.synopsis.replace(" [Written by MAL Rewrite]", "")  || '-',
          imageUrl : resJson.image_url  || '-',
          videoUrl : resJson.trailer_url  || '-' ,
          status : resJson.status  || '-',
          duration : resJson.duration  || '-',
        })
     })
     .catch(error => alert('Anime Not Found'))
  }

  handleSubmit = (event) => {
    event.preventDefault()
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
    axios.post('http://localhost:8000/api/post-anime', formData,
      {
        headers: {
                'Content-Type':'multipart/form-data',
              }
      }
    )
      .then(function (response) {
          alert(response.data)
          window.location.reload()
      })
      .catch(function (error) {
          console.log(error);
          alert('Gagal Input gan.')
      });
  }

  render () {
    return (
      <div className="container my-3">
        <div className="p-3 d-flex align-items-center justify-content-between border-bottom">
          <h5 className="recommend-title text-info">Tambahkan Anime Baru</h5>
          <Back />
        </div>
        <Form onSubmit={this.handleSubmit} className="p-3 my-3 mx-auto" style={{width: '30vw'}} >
          <FormGroup>
              <div className="d-flex">
                <Input
                  type="text"
                  name="id"
                  value={this.state.id}
                  onChange={this.handleChange}
                  placeholder="ID MAL"
                  />
                <Button color="primary" onClick={this.getDataFromMal}>Cek</Button>
              </div>
          </FormGroup>
          <FormGroup>
              <div className="d-flex">
                <Input
                  type="text"
                  name="titleRomaji"
                  value={this.state.titleRomaji}
                  onChange={this.handleChange}
                  placeholder="Judul Anime Romaji"
                  />
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
            <button type="submit" onClick={this.handleClick} className="btn btn-success">Save</button>
          </div>
        </Form>
      </div>
    )
  }
}

export default NewAnime;
