import React from 'react';
import { Container } from 'react-bootstrap';

const TextBlock = ({title, content, image}) => {
  return (
    <section className="text-block">
      <Container>
        {image && <img className="text-block__image" src={image} alt="icon" />}
        <h2 className="text-block__title">{title}</h2>
        <p className="text-block__content">{content}</p>
      </Container>
    </section>
  );
}

export default TextBlock