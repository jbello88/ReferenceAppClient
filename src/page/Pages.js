import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import PageSummary from "./PageSummary";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { GoPlus } from "react-icons/go";
import { useHistory } from "react-router-dom";

export default function Pages() {
  const pages = useStoreState((s) => s.pStore.pages);
  const createPage = useStoreActions((a) => a.pStore.createPage);
  const history = useHistory();

  const addPageHandler = () => {
    createPage();
    history.push("/topic/newPage");
  };

  return (
    <>
      <Container className="w-auto mt-5 ">
        <button
          className="float-right btn btn-link mr-5"
          onClick={addPageHandler}
        >
          <GoPlus className="larger mt-1  text-secondary" />
        </button>
        <Row>
          <h2 className="mb-3 ml-5">Documentation</h2>
        </Row>

        {pages.map((p) => (
          <Row key={p._id}>
            <Col>
              <PageSummary page={p} />
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
}
