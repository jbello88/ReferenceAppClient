import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';
import Comments from '../page/Comments';
import { GoPlus } from 'react-icons/go';
import { CloseButton } from 'react-bootstrap';
import { UserMatchOrAdmin } from '../_components';
import { MdModeEdit, MdDelete } from 'react-icons/md';

export default function PageDisplay() {
  const page = useStoreState(state => state.pStore.page);
  const user = useStoreState(s => s.aStore.account);
  const loadPage = useStoreActions(a => a.pStore.loadPage);
  const createNewComment = useStoreActions(a => a.pStore.createComment);
  const history = useHistory();

  let { slug } = useParams();

  useEffect(() => {
    if (slug === 'newPage') {
      history.push(`/topic/edit/${slug}`);
      return;
    }
    loadPage(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCommentHandler = () => {
    createNewComment(user);
    //history.push(`/topic/edit/${slug}`);
    history.push('/comment');
  };

  if (!page) return null;

  return (
    <div>
      <div className="level mb-0">
        <div className="level-left">
          <h2 className="title level-item mb-0 pb-0">{page?.title}</h2>
        </div>
        <div className="level-right">
          <UserMatchOrAdmin user={user} id={page?.ownerId}>
            <Link to={`/topic/edit/${slug}`} className="button is-link is-light level-item">
              <MdModeEdit />
            </Link>
          </UserMatchOrAdmin>
        </div>
      </div>
      {page?.ownerName ? <p>created by: {page?.ownerName}</p> : null}
      <div class="content mt-2">
        <ReactMarkdown source={page.content} escapeHtml={false} />
      </div>
      <hr className="mt-3 mb-3" />

      <div className="level mb-0">
        <div className="level-left">
          <h4 className="subtitle level-item mb-0 pb-0">Comments</h4>
        </div>
        <div className="level-right">
          {user ? (
            <button className="button is-link is-light level-item" onClick={addCommentHandler}>
              <GoPlus className="larger text-secondary mb-1" />
            </button>
          ) : null}
        </div>
      </div>

      <Comments comments={page?.comments ? page.comments : []} />
    </div>
  );
}
