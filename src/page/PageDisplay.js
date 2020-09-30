import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';
import Comments from '../page/Comments';
import Container from 'react-bootstrap/Container';
import { GoPlus } from 'react-icons/go';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function PageDisplay() {
  const page = useStoreState(state => state.pStore.page);
  const user = useStoreState(s => s.aStore.account);
  const createNewComment = useStoreActions(a => a.pStore.createComment);

  const history = useHistory();

  const addCommentHandler = () => {
    createNewComment(user);
    history.push('/comment');
  };

  return (
    <div className="section mt-0 pt-0">
      <h2 className="title">{page?.title}</h2>
      {page?.ownerName ? <p>created by: {page?.ownerName}</p> : null}

      <ReactMarkdown source={page?.content} escapeHtml={false} />
      <hr className="mt-3 mb-3" />

      <h4 className="mt-1 is-size-5">Comments</h4>

      {user ? (
        <button className="float-right btn btn-link" onClick={addCommentHandler}>
          <GoPlus className="larger text-secondary mb-1" />
        </button>
      ) : null}

      <Comments comments={page?.comments ? page.comments : []} />
    </div>
  );
}
