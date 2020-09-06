import React, { useState } from "react";
import {fileService} from "@/_services";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const FileUploader = () => {
  const [file, setFile] = useState();
  const [filename, setFilename] = useState("Choose image to upload");

  const onChange = (e) => {
    console.log("file-set");
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("upload started");
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    await fileService.uploadFile(formData);
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
