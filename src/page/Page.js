import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import Container from "react-bootstrap/Container";
import PageDisplay from "./PageDisplay";
import PageEdit from "./PageEdit";
import Modal from "react-bootstrap/modal";
import Button from "react-bootstrap/button";
import { useHistory } from "react-router-dom";

import { MdModeEdit, MdDelete } from "react-icons/md";

export default function Page() {
  let { slug } = useParams();
  const page = useStoreState((state) => state.pStore.page);
  const user = useStoreState((state) => state.aStore.account);
  const loadPage = useStoreActions((a) => a.pStore.loadPage);
  const deletePage = useStoreActions((a) => a.pStore.deletePage);
  const [modus, setModus] = useState("show");
  const [showConfirmation, setShowConfirmation] = useState();
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
    if (showConfirmation) return;
    setShowConfirmation(true);
  };

  const deleteConfirmed = () => {
    deletePage(page);
    setShowConfirmation(false);
    history.push("/content");
  };

  return (
    <>
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
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete this page?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteConfirmed}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
