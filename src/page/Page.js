import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import Container from "react-bootstrap/Container";
import PageDisplay from "./PageDisplay";
import PageEdit from "./PageEdit";
import { useHistory } from "react-router-dom";

import { MdModeEdit, MdDelete } from "react-icons/md";

export default function Page() {
  let { slug } = useParams();
  const page = useStoreState((state) => state.pStore.page);
  const user = useStoreState((state) => state.aStore.account);
  const loadPage = useStoreActions((a) => a.pStore.loadPage);
  const deletePage = useStoreActions((a) => a.pStore.deletePage);
  const [modus, setModus] = useState("show");
  const history = useHistory();

  useEffect(() => {
    if (slug === "NewPage") {
      setModus("edit");
      return;
    }
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

  const handleDelete = () => {
    deletePage(page);
    history.push("/content");
  };

  return (
    <Container className="w-auto mt-5 ">
      {user?.role === "Admin" ? (
        <div className="float-right">
          {modus === "show" ? (
            <button className="btn btn-light" onClick={handleDelete}>
              <MdDelete />
            </button>
          ) : null}

          <button className="btn btn-light" onClick={toogleEdit}>
            <MdModeEdit />
          </button>
        </div>
      ) : null}
      {modus === "show" ? <PageDisplay /> : null}
      {modus === "edit" ? <PageEdit page={page} /> : null}
    </Container>
  );
}
