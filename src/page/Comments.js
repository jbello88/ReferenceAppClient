import React from "react";
import Comment from "./Comment";

export default function Comments({ comments } = []) {
  return (
    <>
      {comments.map((c) => (
        <Comment data={c} />
      ))}
    </>
  );
}
