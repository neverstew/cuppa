import React from 'react'
import { Card } from 'react-bootstrap'

const RoleCards = ({cards}) => {
  return (
    <section className="role-cards">
      {cards.map(card => {
        return (
          <Card key={card.title} className="role-cards__card">
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>
                {card.content}
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </section>
  );
}

export default RoleCards;