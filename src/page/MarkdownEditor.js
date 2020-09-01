import React, { useState, useRef } from "react";
import MarkdownEditor2 from "@uiw/react-markdown-editor";
import * as Showdown from "showdown";

//import "react-mde/lib/styles/css/react-mde-all.css";
//  onChange={updateMarkdown}
/* 
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
}); */

export default function MarkdownEditor({ val, updatedValue }) {
  const [value, setValue] = useState(val);

  const updateMarkdown = (e, d, v) => {
    updatedValue.current = v;
  };

  return (
    <>
      <MarkdownEditor2 value={value} height="699" onChange={updateMarkdown} />
    </>
  );
}
