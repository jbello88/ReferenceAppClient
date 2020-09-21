import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useHistory } from "react-router-dom";
import { MdModeEdit, MdDelete } from "react-icons/md";
import Card from "react-bootstrap/Card";

export default function Comment({ data }) {
  const history = useHistory();
  const page = useStoreState((s) => s.pStore.page);
  const user = useStoreState((s) => s.aStore.account);
  const editComment = useStoreActions((a) => a.pStore.editComment);
  const deleteComment = useStoreActions((a) => a.pStore.deleteComment);

  const handleEdit = () => {
    editComment(data);
    history.push("/comment");
  };

  const handleDelete = () => {
    deleteComment(data);
    history.push("/topic/" + page.slug);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Comment by {data.userName}</Card.Title>
        <Card.Text>{data.content}</Card.Text>
        {user && (user.id === data.userId || user.role === "Admin") ? (
          <div className="float-right">
            <button className="btn btn-link" onClick={handleDelete}>
              <MdDelete className="larger text-secondary" />
            </button>{" "}
            <button className="btn btn-link" onClick={handleEdit}>
              <MdModeEdit className="larger text-secondary" />
            </button>{" "}
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
}
