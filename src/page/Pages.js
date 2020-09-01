import React from "react";
import { useStoreState } from "easy-peasy";
import PageSummary from "./PageSummary";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Pages() {
  const pages = useStoreState((s) => s.pStore.pages);

  if (pages?.length === 0) {
    return (
      <div>
        <p>loading</p>
      </div>
    );
  }

  return (
    <Container className="w-auto mt-5 ">
      {pages.map((p) => (
        <Row key={p._id}>
          <Col>
            <PageSummary page={p} />
          </Col>
        </Row>
      ))}
    </Container>
  );
}
