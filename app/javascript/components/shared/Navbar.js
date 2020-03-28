import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Navigation = ({userLoggedIn, currentUser, isTransparent}) => {
  let bgColor = isTransparent === true ? 'transparent' : 'primary';
  function handleLogin(){
    window.location.replace('/users/login')
  }
  return (
    <Navbar className="navigation" bg={bgColor} expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img className="navigation__logo" src="https://fakeplasticwebsites.com/wp-content/uploads/2017/03/FPW_Logo_White_transparent.png" />
        </Navbar.Brand>
        <Button variant="primary" onClick={handleLogin}>Log in</Button>
      </Container>
    </Navbar>
  );
}

export default Navigation