import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import MarkdownEditor from "./MarkdownEditor";
import useForm from "react-hook-form";

export default function PageEdit({ page }) {
  //const page = useStoreState((state) => state.pStore.page);
  const updatePageContent = useStoreActions(
    (actions) => actions.pStore.updatePageContent
  );

  const eduRef = useRef();
  const titelRef = useRef();
  const subtitelRef = useRef();

  if (!page) {
    return <div>loading</div>;
  }

  //const title = "This is the title";
  //const subtitle = "This is the subtitle";

  const saveText = () => {
    const para = {
      slug: page.slug,
      title: titelRef.current.value,
      subtitle: subtitelRef.current.value,
      content: eduRef.current,
    };

    console.log(para);

    //updatePageContent(para);
  };
  return (
    <>
      <div className="form-group">
        <label>Title</label>
        <input name="title" type="text" ref={titelRef} />
      </div>

      <div className="form-group">
        <label>Subtitle</label>
        <input name="subtitle" type="text" ref={subtitelRef} />
      </div>

      <MarkdownEditor val={page.content} updatedValue={eduRef} />
      <button onClick={saveText}>Save</button>
    </>
  );
}
