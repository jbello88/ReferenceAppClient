import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import ReactMarkdown from "react-markdown";
import { useHistory } from "react-router-dom";
import Comments from "../page/Comments";
import { MdAdd } from "react-icons/md";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function PageDisplay() {
  const page = useStoreState((state) => state.pStore.page);
  const user = useStoreState((s) => s.aStore.account);
  const createNewComment = useStoreActions((a) => a.pStore.createComment);
  const history = useHistory();

  const addCommentHandler = () => {
    createNewComment(user);
    history.push("/comment");
  };

  return (
    <>
      <h2>{page.title}</h2>

      <ReactMarkdown source={page.content} escapeHtml={false} />
      <hr />
      <div>
        <Row>
          <Col>
            <h4 className="mt-2">Comments</h4>
          </Col>
          (user ? <Col>
            <button
              className="float-right btn btn-light"
              onClick={addCommentHandler}
            >
              <MdAdd />
            </button>
          </Col>: null)
        </Row>
      </div>

      <Comments
        className="float-none"
        comments={page.comments ? page.comments : []}
      />
    </>
  );
}
