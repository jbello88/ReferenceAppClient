import React from "react";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function PageSummary({ page }) {
  const history = useHistory();
  console.log(page);

  return (
    <Card
      className="mb-3 mx-5 p-3"
      onClick={() => history.push("/topic/" + page.slug)}
    >
      <Card.Body>
        <Card.Title>{page.title}</Card.Title>
        <Card.Subtitle>{page.subtitle}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}
