import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import Logo from '../../../assets/images/cuppa-light.png'

const Navigation = ({userLoggedIn, currentUser, isTransparent}) => {
  let bgColor = isTransparent === true ? 'transparent' : 'primary';
  function handleLogin(){
    window.location.replace('/login')
  }
  return (
    <Navbar className="navigation" bg={bgColor} expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img className="navigation__logo" src={Logo} />
        </Navbar.Brand>
        <Button variant="primary" onClick={handleLogin}>Log in</Button>
      </Container>
    </Navbar>
  );
}

export default Navigation