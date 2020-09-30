import React, { useState } from 'react';
import { fileService } from '../_services';
import { useStoreActions } from 'easy-peasy';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const FileUploader = () => {
  const [file, setFile] = useState();
  const [filename, setFilename] = useState('Choose image to upload');
  const alertSuccess = useStoreActions(a => a.iStore.success);

  const onChange = e => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);

    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);
    const message = await fileService.uploadFile(formData);
    alertSuccess({ message: message, autoClose: false });
    setFilename('');
  };

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data" className="d-flex">
      <Col xs={10} className="custom-file flex-grow-1">
        <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
        <label className="custom-file-label" htmlFor="customFile">
          {filename}
        </label>
      </Col>
      <Col className="pr-0">
        <button type="submit" className="btn btn-secondary form-control mr-0">
          Upload image
        </button>
      </Col>
    </form>
  );
};
