import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import PageSummary from "./PageSummary";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";

export default function Pages() {
  const pages = useStoreState((s) => s.pStore.pages);
  const createPage = useStoreActions((a) => a.pStore.createPage);
  const history = useHistory();

  const addPageHandler = () => {
    createPage();
    history.push("/topic/newPage");
  };

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
      <button onClick={addPageHandler}>Add Page</button>
    </Container>
  );
}
