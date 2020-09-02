import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useHistory } from "react-router-dom";
import { MdModeEdit, MdDelete } from "react-icons/md";

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
    <>
      <div>{data.content}</div>
      <div>{data.userName}</div>
      <button onClick={handleEdit}>
        {" "}
        <MdModeEdit />
      </button>{" "}
      <button onClick={handleDelete}>
        <MdDelete />
      </button>
    </>
  );
}
