import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import PageSummary from "./PageSummary";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MdAdd } from "react-icons/md";
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
      <button className="float-right btn btn-light" onClick={addPageHandler}>
        <MdAdd />
      </button>
      <Container className="w-auto mt-5 ">
        <h2 className="mb-3 ml-5">Documentation</h2>
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
