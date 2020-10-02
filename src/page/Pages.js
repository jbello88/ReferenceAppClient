import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import PageSummary from './PageSummary';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { GoPlus } from 'react-icons/go';
import { useHistory } from 'react-router-dom';

export default function Pages() {
  const pages = useStoreState(s => s.pStore.pages);
  const user = useStoreState(s => s.aStore.account);
  const createPage = useStoreActions(a => a.pStore.createPage);
  const history = useHistory();

  if (pages.length === 0) {
    history.push('/');
  }

  const addPageHandler = () => {
    createPage(user);
    history.push('/topic/newPage');
  };

  return (
    <div>
      <div className="level">
        <div className=" level-left">
          <h2 className="title  is-size-2">Documentation</h2>
        </div>
        <div className="level-right">
          {user ? (
            <button className="button is-light level-item" onClick={addPageHandler}>
              <GoPlus />
            </button>
          ) : null}
        </div>
      </div>
      {pages.map(p => (
        <div key={p._id}>
          <PageSummary page={p} />
        </div>
      ))}
    </div>
  );
}
