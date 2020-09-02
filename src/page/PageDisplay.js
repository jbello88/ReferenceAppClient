import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import ReactMarkdown from "react-markdown";
import { useHistory } from "react-router-dom";
import Comments from "../page/Comments";
import { MdAddCircleOutline } from "react-icons/md";

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
      <h4>{page.subtitle}</h4>
      <ReactMarkdown source={page.content} />
      <hr />
      <div className="display-flex">
        <h4>
          Comments{" "}
          <button className="btn btn-light" onClick={addCommentHandler}>
            <MdAddCircleOutline />
          </button>{" "}
        </h4>
      </div>

      <Comments comments={page.comments ? page.comments : []} />
    </>
  );
}
