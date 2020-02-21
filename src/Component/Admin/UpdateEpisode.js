import React from 'react'
import { Form, FormGroup, Input, FormText } from 'reactstrap'
import axios from 'axios'
import Back from './Back'


class UpdateEpisode extends React.Component {

  constructor () {
    super()
    this.state = {
      isLoaded : false,
      title: '',
      id: '',
      episode: '',
      data: [],
      isDisplayed: false,
      linkStreams: [],
      link720: [],
      link480: [],
      link360: [],
      thumbnail: '',
      disabled: {
        pointerEvents:'none',
        opacity: 0.7
      }
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
    });
    if (e.target.name === 'title' && e.target.value !== '') {
      this.setState({
        isDisplayed: true
      });
      this.search(e.target.value)
    }
    if (e.target.name === 'thumbnail') {
      let files = e.target.files || e.dataTransfer.files
      if(!files.length)
        return
      this.createImage(files[0])
    }
  }

  createImage = (file) => {
    let reader = new FileReader()
    reader.onload = (e) => {
      this.setState({
        thumbnail: e.target.result
      });
    }
    reader.readAsDataURL(file)
  }


  handleClick = (items) => {
    this.setState({
       isDisplayed: false,
       title : items.title,
       id: items.id
    });
  }

  handleChangeLink = (e, i) => {
    let link = [...this.state[e.target.dataset.group]]
    link[i][e.target.name] =  e.target.value
    this.setState({
      [e.target.dataset.group]: link
    });
  }

  handleAddLink = (e) => {
    e.preventDefault()
    const { name } = e.target
    this.setState((prevState) => ({
      [name] : [...prevState[name], {link: '', hosting: ''}]
    }))
  }

  handleRemoveLink = (e, i) => {
    e.preventDefault()
     let link = [...this.state.linkStreams];
     link.splice(i,1);
     this.setState({ linkStreams : link });
  }

  checkData = (e) => {
    e.preventDefault()
    axios.get('http://localhost:8000/api/episode/'+this.state.id+'/'+this.state.episode)
      .then(res => {
        console.log(res.data);
        this.setState({
          linkStreams : res.data[0],
          link360 : res.data[1],
          link480 : res.data[2],
          link720 : res.data[3],
          disabled: {}
        })
      })
  }


  search = async (val) => {

    const res = await axios('http://localhost:8000/api/search/'+val+'/no')
    const list = await res.data;
    this.setState({
      data : list,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('id', this.state.id)
    formData.append('episode', this.state.episode)
    formData.append('linkStreams', JSON.stringify(this.state.linkStreams))
    formData.append('link360', JSON.stringify(this.state.link360))
    formData.append('link480', JSON.stringify(this.state.link480))
    formData.append('link720', JSON.stringify(this.state.link720))
    formData.append('thumbnail', this.state.thumbnail)

    axios.post('http://localhost:8000/api/post-episode', formData,
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
          alert('Gagal Input gan.')
      });
  }

  render () {
    return (
      <div className="container my-3">
        <div className="p-3 d-flex align-items-center justify-content-between border-bottom">
          <h5 className="recommend-titletext-info">Update Episode</h5>
          <Back />
        </div>
        <Form onSubmit={this.handleSubmit} className="p-3 my-3 mx-auto" style={{width: '30vw'}} >
          <FormGroup>
              <label>Judul Anime</label>
              <div style={{position: 'relative'}}>
                <Input
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  />
                {this.state.data.length > 0 && this.state.title !== '' && this.state.isDisplayed ?
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
              <label>Episode ke-</label>
              <div className="d-flex">
                <Input
                  type="number"
                  name="episode"
                  value={this.state.episode}
                  onChange={this.handleChange}
                  min={1}
                  />
              </div>
          </FormGroup>

          <FormGroup>
              <button className="btn btn-primary" onClick={this.checkData}>Cek</button>
          </FormGroup>

          <div style={this.state.disabled}>
            <div className="border border-primary rounded p-2 my-2">
              <FormGroup>
                <button name="linkStreams" className="btn btn-primary" onClick={this.handleAddLink}>+</button><span> Link Stream</span>
              </FormGroup>

              {this.state.linkStreams.map((items, index) =>
                <FormGroup className="d-flex align-items-end" key={index}>
                  <div>
                    {index === 0 ? <label>Hosting</label> : ''}
                    <div className="d-flex">
                      <Input
                        type="text"
                        name="hosting"
                        value={this.state.linkStreams[index].hosting}
                        onChange={(e) => this.handleChangeLink(e, index)}
                        data-group={'linkStreams'}
                        />
                    </div>
                  </div>
                  <div>
                    {index === 0 ? <label>Link</label> : ''}
                    <div className="d-flex">
                      <Input
                        type="text"
                        name="link"
                        value={this.state.linkStreams[index].link}
                        onChange={(e) => this.handleChangeLink(e, index)}
                        data-group={'linkStreams'}
                        />
                    </div>
                  </div>
                  <div>
                    <button name="linkStreams" className="btn btn-danger" onClick={this.handleRemoveLink}>-</button>
                  </div>
                </FormGroup>
              )}
            </div>
            <div className="border border-primary rounded p-2 my-2">
              <FormGroup>
                <button name="link360" className="btn btn-primary" onClick={this.handleAddLink}>+</button><span> Link Download 360p</span>
              </FormGroup>

              {this.state.link360.map((items, index) =>
                <FormGroup className="d-flex align-items-end" key={index}>
                  <div>
                    {index === 0 ? <label>Hosting</label> : ''}
                    <div className="d-flex">
                      <Input
                        type="text"
                        name="hosting"
                        value={this.state.link360[index].hosting}
                        onChange={(e) => this.handleChangeLink(e, index)}
                        data-group={'link360'}
                        />
                    </div>
                  </div>
                  <div>
                    {index === 0 ? <label>Link</label> : ''}
                    <div className="d-flex">
                      <Input
                        type="text"
                        name="link"
                        value={this.state.link360[index].link}
                        onChange={(e) => this.handleChangeLink(e, index)}
                        data-group={'link360'}
                        />
                    </div>
                  </div>
                  <div>
                    <button name="link360" className="btn btn-danger" onClick={this.handleRemoveLink}>-</button>
                  </div>
                </FormGroup>
              )}
            </div>
            <div className="border border-primary rounded p-2 my-2">
              <FormGroup>
                <button name="link480" className="btn btn-primary" onClick={this.handleAddLink}>+</button><span> Link Download 480p</span>
              </FormGroup>

              {this.state.link480.map((items, index) =>
                <FormGroup className="d-flex align-items-end" key={index}>
                  <div>
                    {index === 0 ? <label>Hosting</label> : ''}
                    <div className="d-flex">
                      <Input
                        type="text"
                        name="hosting"
                        value={this.state.link480[index].hosting}
                        onChange={(e) => this.handleChangeLink(e, index)}
                        data-group={'link480'}
                        />
                    </div>
                  </div>
                  <div>
                    {index === 0 ? <label>Link</label> : ''}
                    <div className="d-flex">
                      <Input
                        type="text"
                        name="link"
                        value={this.state.link480[index].link}
                        onChange={(e) => this.handleChangeLink(e, index)}
                        data-group={'link480'}
                        />
                    </div>
                  </div>
                  <div>
                    <button name="link480" className="btn btn-danger" onClick={this.handleRemoveLink}>-</button>
                  </div>
                </FormGroup>
              )}
            </div>
            <div className="border border-primary rounded p-2 my-2">
              <FormGroup>
                <button name="link720" className="btn btn-primary" onClick={this.handleAddLink}>+</button><span> Link Download 720p</span>
              </FormGroup>

              {this.state.link720.map((items, index) =>
                <FormGroup className="d-flex align-items-end" key={index}>
                  <div>
                    {index === 0 ? <label>Hosting</label> : ''}
                    <div className="d-flex">
                      <Input
                        type="text"
                        name="hosting"
                        value={this.state.link720[index].hosting}
                        onChange={(e) => this.handleChangeLink(e, index)}
                        data-group={'link720'}
                        />
                    </div>
                  </div>
                  <div>
                    {index === 0 ? <label>Link</label> : ''}
                    <div className="d-flex">
                      <Input
                        type="text"
                        name="link"
                        value={this.state.link720[index].link}
                        onChange={(e) => this.handleChangeLink(e, index)}
                        data-group={'link720'}
                        />
                    </div>
                  </div>
                  <div>
                    <button name="link720" className="btn btn-danger" onClick={this.handleRemoveLink}>-</button>
                  </div>
                </FormGroup>
              )}
            </div>
            <FormGroup>
              <Input name='thumbnail' type="file" onChange={this.handleChange} />
              <FormText color="muted">
                aplod thumbnail video nya disini
              </FormText>
            </FormGroup>
            <button className="btn btn-success" onSubmit={this.handleClick}>Submit</button>
          </div>
        </Form>
      </div>
    )
  }
}

export default UpdateEpisode;