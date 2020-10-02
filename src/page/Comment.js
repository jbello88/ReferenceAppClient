import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useHistory } from 'react-router-dom';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import Card from 'react-bootstrap/Card';

export default function Comment({ data }) {
  const history = useHistory();
  const page = useStoreState(s => s.pStore.page);
  const user = useStoreState(s => s.aStore.account);
  const editComment = useStoreActions(a => a.pStore.editComment);
  const deleteComment = useStoreActions(a => a.pStore.deleteComment);

  const handleEdit = () => {
    editComment(data);
    history.push('/comment');
  };

  const handleDelete = () => {
    deleteComment(data);
    history.push('/topic/' + page.slug);
  };

  return (
    <div className="section my-1 py-2">
      <div className="box">
        <div>
          <div className="subtitle">Comment by {data.userName}</div>
          <div>{data.content}</div>
        </div>
        {user && (user.id === data.userId || user.role === 'Admin') ? (
          <div className="float-right">
            <button className="btn btn-link" onClick={handleDelete}>
              <MdDelete className="larger text-secondary" />
            </button>{' '}
            <button className="btn btn-link" onClick={handleEdit}>
              <MdModeEdit className="larger text-secondary" />
            </button>{' '}
          </div>
        ) : null}
      </div>
    </div>
  );
}
