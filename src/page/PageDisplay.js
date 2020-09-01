import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import ReactMarkdown from "react-markdown";

export default function PageDisplay() {
  const page = useStoreState((state) => state.pStore.page);
  return (
    <>
      <h2>{page.title}</h2>
      <h4>{page.subtitle}</h4>
      <ReactMarkdown source={page.content} />
    </>
  );
}
