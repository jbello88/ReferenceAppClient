import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import Title from "./Title";
import Paragraph from "./Paragraph";
import Picture from "./Picture";
import Code from "./Code";
import Video from "./Video";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const createElement = (data) => {
  switch (data.type) {
    case "T":
      return (
        <>
          <Row>
            <Col>
              <Title data={data} />
            </Col>
          </Row>
        </>
      );
    case "P":
      return (
        <>
          <Row>
            <Col>
              <Paragraph data={data} />
            </Col>
          </Row>
        </>
      );

    case "I":
      return (
        <>
          <Row>
            <Col>
              <Picture data={data} />
            </Col>
          </Row>
        </>
      );

    case "C":
      return (
        <>
          <Row>
            <Col>
              <Code data={data} />
            </Col>
          </Row>
        </>
      );

    case "V":
      return (
        <>
          <Row>
            <Col>
              <Video data={data} />
            </Col>
          </Row>
        </>
      );

    default:
      return (
        <>
          <Row>
            <Col>
              <Title data={data} />
            </Col>
          </Row>
        </>
      );

    /*  return <div></div>; */
  }
};

export default function PageDisplay() {
  let { slug } = useParams();
  const page = useStoreState((state) => state.pStore.page);
  const loadPage = useStoreActions((a) => a.pStore.loadPage);

  useEffect(() => {
    loadPage(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!page?.elements?.length) {
    return <div>Page</div>;
  }

  return (
    <Container className="w-auto mt-5 ">
      {page.elements
        .sort((a, b) => a.order - b.order)
        .map((e) => createElement(e))}
    </Container>
  );
}
