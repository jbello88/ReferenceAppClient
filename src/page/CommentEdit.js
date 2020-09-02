import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

export default function CommentEdit() {
  const comment = useStoreState((s) => s.pStore.comment);
  const page = useStoreState((s) => s.pStore.page);
  const updateComment = useStoreActions((a) => a.pStore.saveComment);
  const history = useHistory();

  const defaultValues = {
    content: comment?.content,
  };

  const onSubmit = (data) => {
    const updatedComment = { ...comment, content: data.content };
    updateComment(updatedComment);
    history.push("/topic/" + page.slug);
  };

  const { register, handleSubmit } = useForm({ defaultValues: defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="content">Subtitle</label>
        <textarea
          id="content"
          rows="4"
          name="content"
          className="form-control"
          ref={register}
        />
      </div>

      <input type="submit" className="btn btn-primary" />
    </form>
  );
}
