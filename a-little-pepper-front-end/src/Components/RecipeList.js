import React from 'react'
import { Col, Card } from "react-bootstrap";

export default function RecipeList({ recipe }) {

  return (
    <div>
      <h1>{recipe.id}</h1>
      <Col className="overflow-hidden">
        <Card bg="light" variant="light" style={{ alignItems: "center" }}>
          <Card.Img className="py-3" variant="top" src={recipe.image} style={{ width: "250px", borderRadius: "50%" }} />
          <Card.Body>
            <Card.Title><Card.Link href='/profile'
              style={{ color: "green" }}>{recipe.title}</Card.Link></Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </div>
  )
}