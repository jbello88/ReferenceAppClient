import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";

export default function CommentEdit() {
  const comment = useStoreState((s) => s.pStore.comment);
  const page = useStoreState((s) => s.pStore.page);
  const updateComment = useStoreActions((a) => a.pStore.saveComment);
  const clearComment = useStoreActions((a) => a.pStore.clearComment);
  const history = useHistory();

  const defaultValues = {
    content: comment?.content,
  };

  const onSubmit = (data) => {
    const updatedComment = { ...comment, content: data.content };
    updateComment(updatedComment);
    history.push("/topic/" + page.slug);
  };

  const onCancel = () => {
    clearComment();
    history.push("/topic/" + page.slug);
  };

  const { register, handleSubmit } = useForm({ defaultValues: defaultValues });

  return (
    <Container className="w-auto mt-5 ">
      <h3>Edit Comment</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="content">Comment</label>
          <textarea
            id="content"
            rows="4"
            name="content"
            className="form-control"
            ref={register}
          />
        </div>

        <input type="submit" value="Save" className="btn btn-primary" />
        <button onClick={onCancel} className="btn btn-secondary ml-2 ">
          Cancel{" "}
        </button>
      </form>
    </Container>
  );
}
