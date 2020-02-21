import React from 'react'
import LoginAdmin from '../Component/Admin/LoginAdmin';
import MenuAdmin from '../Component/Admin/MenuAdmin';

class Admin extends React.Component {


  render () {
    return (
      <div className="container my-3" style={{padding:0}}>
          {localStorage.getItem('appState') ? <MenuAdmin /> : <LoginAdmin />}
      </div>
    )
  }
}

export default Admin;
