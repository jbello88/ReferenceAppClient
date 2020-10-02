import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

export default function PageSummary({ page }) {
  const history = useHistory();
  console.log(page);

  return (
    <div className="box my-2" onClick={() => history.push('/topic/show/' + page.slug)}>
      <div className="title is-size-5"> {page.title} </div>
      <div className="subtitle is-size-6"> {page.subtitle} </div>
    </div>
  );
}
