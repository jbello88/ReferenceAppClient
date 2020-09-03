import React, { useEffect, useRef } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import MarkdownEditor from "./MarkdownEditor";
import { useForm } from "react-hook-form";
import { MdSave } from "react-icons/md";
import { FileUploader } from "./FileUploader";

export default function PageEdit({ page }) {
  //const page = useStoreState((state) => state.pStore.page);
  const updatePageContent = useStoreActions(
    (actions) => actions.pStore.updatePageContent
  );

  const defaultValues = {
    title: "",
    slug: "",
    subtitle: "",
  };

  //     <input type="submit"  className="btn btn-primary" />

  const { register, handleSubmit } = useForm({ defaultValues: defaultValues });

  if (!page) {
    return <div>loading</div>;
  }

  defaultValues.title = page.title;
  defaultValues.subtitle = page.subtitle;
  defaultValues.slug = page.slug;

  const eduRef = useRef();

  const onSubmit = (data) => {
    const para = {
      _id: page._id,
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle,
      content: eduRef?.current,
    };

    console.log(para);
    updatePageContent(para);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit" className="btn btn-light float-right ">
          <MdSave />
        </button>
        <div className="form-group input-group-lg">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            className="form-control"
            name="title"
            type="text"
            ref={register}
          />
        </div>

        <div className="form-group ">
          <label htmlFor="slug">Slug</label>
          <input
            id="slug"
            className="form-control"
            name="slug"
            type="text"
            ref={register}
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Subtitle</label>
          <textarea
            id="subtitle"
            rows="4"
            name="subtitle"
            className="form-control"
            ref={register}
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
      </form>
      <FileUploader className="m-3" />
    </>
  );
}
