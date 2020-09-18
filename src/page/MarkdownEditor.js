import React from "react";
import MarkdownEditor2 from "@uiw/react-markdown-editor";

export default function MarkdownEditor({ val, updatedValue }) {
  const updateMarkdown = (e, d, v) => {
    updatedValue.current = v;
  };

  return (
    <>
      <MarkdownEditor2 value={val} height="300" onChange={updateMarkdown} />
    </>
  );
}
