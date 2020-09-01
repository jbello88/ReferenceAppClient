import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import Container from "react-bootstrap/Container";
import ReactMarkdown from "react-markdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MarkdownEditor from "./MarkdownEditor";
import PageDisplay from "./PageDisplay";
import PageEdit from "./PageEdit";
import { accountService } from "@/_services";

export default function Page() {
  let { slug } = useParams();
  const page = useStoreState((state) => state.pStore.page);
  const loadPage = useStoreActions((a) => a.pStore.loadPage);
  const [modus, setModus] = useState("edit");
  const user = accountService.user;

  useEffect(() => {
    loadPage(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!page) {
    return <div>still loading</div>;
  }

  const toogleEdit = () => {
    if (modus === "edit") {
      setModus("show");
      return;
    }

    setModus("edit");
  };

  console.log(user.value);
  //const markeddn = marked(page.content);
  //console.log(page);
  //  <MarkdownEditor val={page.content} />

  return (
    <Container className="w-auto mt-5 ">
      {true ? <button onClick={toogleEdit}>AAA</button> : null}
      {modus === "show" ? <PageDisplay /> : null}
      {modus === "edit" ? <PageEdit page={page} /> : null}
    </Container>
  );
}
