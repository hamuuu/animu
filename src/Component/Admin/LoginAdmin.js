import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'


class LoginAdmin extends React.Component {

  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      isLoggedIn: false,
      error: []
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  login = (event, username, password) => {
    event.preventDefault()
    let formData = new FormData()
    formData.append("username", username);
    formData.append("password", password);
    axios
      .post("http://localhost:8000/api/user/login/", formData)
      .then(response => {
        return response;
      })
      .then(json => {
        if (json.data.success) {
          let userData = {
            name: json.data.data.name,
            id: json.data.data.id,
            email: json.data.data.email,
            timestamp: new Date().toString()
          };
          let appState = {
            isLoggedIn: true,
            user: userData
          };
          // save app state with user date in local storage
          localStorage["appState"] = appState.isLoggedIn;
          localStorage["userData"] = JSON.stringify(appState.user);
          this.setState({
            isLoggedIn: appState.isLoggedIn,
            user: appState.user
          });
          window.location.reload()
        } else alert("Login Failed!")
      })
  }

  render () {
    return(
      <div>
        <div className="text-center border-bottom title-anime-detail p-3" style={{fontSize: '1.5rem'}}>Login Admin</div>
        <Form id="loginForm" className="p-3 my-3 mx-auto" style={{width: '30vw'}} onSubmit={(event) => this.login(event, this.state.username, this.state.password)}>
          <FormGroup>
              <Label for="email">Username</Label>
              <Input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  id="username"
              />
          </FormGroup>
          <FormGroup>
              <Label for="password">Password</Label>
              <Input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  id="password"
              />
          </FormGroup>
          <div className="mb-3 text-center">
            <Button color="primary" size="md">Login</Button>
          </div>
        </Form>
      </div>
    )
  }
}

export default LoginAdmin;
