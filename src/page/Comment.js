import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useHistory } from "react-router-dom";
import { MdModeEdit, MdDelete } from "react-icons/md";
import Card from "react-bootstrap/Card";

export default function Comment({ data }) {
  const history = useHistory();
  const page = useStoreState((s) => s.pStore.page);
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
    <Card className="m-3">
      <Card.Body>
        <Card.Title>Comment by {data.userName}</Card.Title>
        <Card.Text>{data.content}</Card.Text>
        <button className="btn btn-light" onClick={handleEdit}>
          <MdModeEdit />
        </button>{" "}
        <button className="btn btn-light" onClick={handleDelete}>
          <MdDelete />
        </button>
      </Card.Body>
    </Card>
  );
}
