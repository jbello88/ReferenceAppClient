import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import MarkdownEditor from "./MarkdownEditor";
import { useFormik, Form } from "formik";

export default function PageEdit({ page }) {
  //const page = useStoreState((state) => state.pStore.page);
  const updatePageContent = useStoreActions(
    (actions) => actions.pStore.updatePageContent
  );

  if (!page) {
    return <div>loading</div>;
  }

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: { title: page.title, subtitle: page.subtitle },
    onSubmit: (values) => {
      const para = {
        slug: page.slug,
        title: values.title,
        subtitle: values.subtitle,
        content: eduRef.current,
      };

      console.log(para);
      updatePageContent(para);
    },
  });

  const eduRef = useRef();
  const titelRef = useRef();
  const subtitelRef = useRef();

  //const title = "This is the title";
  //const subtitle = "This is the subtitle";

  const saveText = () => {
    /*     const para = {
      slug: page.slug,
      title: titelRef.current.value,
      subtitle: subtitelRef.current.value,
      content: eduRef.current,
    };

    console.log(para); */
    //updatePageContent(para);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group input-group-lg">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          className="form-control"
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="title">Subtitle</label>
        <textarea
          id="subtitle"
          row="4"
          name="subtitle"
          className="form-control"
          type="text"
          value={values.subtitle}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        {" "}
        <label htmlFor="content">Content</label>
        <MarkdownEditor
          id="content"
          val={page.content}
          updatedValue={eduRef}
        />{" "}
      </div>
      <button className="btn btn-primary" onClick={saveText}>
        Save
      </button>
    </form>
  );
}
