import React, { useState } from "react";
import { fileService } from "../_services";
import { useStoreActions } from "easy-peasy";

export const FileUploader = () => {
  const [file, setFile] = useState();
  const [filename, setFilename] = useState("Choose image to upload");
  const alertSuccess = useStoreActions((a) => a.iStore.success);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    const message = await fileService.uploadFile(formData);
    alertSuccess({ message: message, autoClose: false });
    setFilename("");
  };

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <div className="custom-file ">
        <input
          type="file"
          className="custom-file-input"
          id="customFile"
          onChange={onChange}
        />
        <label className="custom-file-label" htmlFor="customFile">
          {filename}
        </label>
      </div>

      <input
        type="submit"
        value="Upload"
        className="btn,  btn-light btn-block mt-3  float-left"
      />
    </form>
  );
};
