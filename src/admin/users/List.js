import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { GoPlus } from 'react-icons/go';

function List({ match }) {
  const users = useStoreState(s => s.aStore.accounts);
  const getAllAccounts = useStoreActions(a => a.aStore.getAllAccounts);
  const setEditAccount = useStoreActions(a => a.aStore.setEditAccount);
  const { path } = match;

  const history = useHistory();

  useEffect(() => {
    getAllAccounts();
    // eslint-disable-next-line
  }, []);

  function editUser(user) {
    setEditAccount(user);
    history.push(`${path}/edit/${user.id}`);
  }

  return (
    <div>
      <div className="level is-vcentered">
        <div className=" level-left">
          <div className="level-item">
            <h1 className="title is-size-2 mb-0">Users</h1>
          </div>
        </div>
        <div className="level-right">
          <Link to={`${path}/add`} className="button is-light level-item">
            <GoPlus />
          </Link>
        </div>
      </div>
      <p className="mb-3">All users from secure (admin only) api end point:</p>
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map(user => (
              <tr key={user.id} onClick={() => editUser(user)}>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export { List };
