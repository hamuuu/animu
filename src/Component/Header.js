import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { GiSmallFire } from 'react-icons/gi';

class Header extends React.Component {

  render() {
    return (
      <Navbar expand="lg" className="shadow" style={{backgroundColor : 'transparent', backgroundImage : `url(${process.env.PUBLIC_URL}/sky.jpg)`, backgroundRepeat: 'repeat-x'}}>
        <Link to="/">
          <Navbar.Brand><img src="/animu/logo512.png" alt="apa ya." className="logo"/><span className="text-danger mr-5">Animu</span></Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav className="mr-4 my-auto"><Link className="text-decoration-none header-nav" to="/anime">Anime Series</Link></Nav>
            <Nav className="mr-4 my-auto"><Link className="text-decoration-none header-nav" to="/movie">Anime Movies</Link></Nav>
            <Nav className="mr-4 my-auto"><Link className="text-decoration-none header-nav" to="/anime-batch">Batch</Link></Nav>
            <Nav className="mr-1 my-auto"><Link className="text-decoration-none header-nav" to="/anime-batch">Hot <GiSmallFire size={'1.5em'} color={'#d63c44'} /></Link></Nav>
            <NavDropdown variant='light' title="Anime Series" id="basic-nav-dropdown">
              <NavDropdown.Item href="/anime-ongoing"> <p className="text-decoration-none">On Going</p> </NavDropdown.Item>
              <NavDropdown.Item href="/anime-completed"><p className="text-decoration-none">Completed</p></NavDropdown.Item>
              <NavDropdown.Item href="/genres"><p className="text-decoration-none">Genres</p></NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
