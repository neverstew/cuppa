import React from 'react';
import { Container, Button } from 'react-bootstrap';

const VideoHero = ({title, subtitle}) => {
  function handleSignUp(){
    window.location.replace('/sign_up')
  }
  return (
  <header className="video-hero">
    <div className="video-hero__overlay"></div>
    <video className="video-hero__video" playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
      <source src="https://rona-hack-assets.s3.eu-west-2.amazonaws.com/header_video.mp4" type="video/mp4" />
    </video>
    <Container className="video-hero__container h-100">
      <div className="d-flex h-100 text-center align-items-center">
        <div className="w-100 text-white">
          <h1 className="display-4">{title}</h1>
          <p className="lead">{subtitle}</p>
          <Button variant="primary" onClick={handleSignUp}>Sign up now</Button>
        </div>
      </div>
    </Container>
  </header>
  );
}

export default VideoHero