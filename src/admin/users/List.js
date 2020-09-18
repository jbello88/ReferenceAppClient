import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

function List({ match }) {
  const users = useStoreState((s) => s.aStore.accounts);
  const getAllAccounts = useStoreActions((a) => a.aStore.getAllAccounts);
  const setEditAccount = useStoreActions((a) => a.aStore.setEditAccount);
  const deleteAccount = useStoreActions((a) => a.aStore.deleteAccount);
  const { path } = match;

  const history = useHistory();

  useEffect(() => {
    getAllAccounts();
    // eslint-disable-next-line
  }, []);

  function deleteUser(id) {
    deleteAccount(id);
  }

  function editUser(user) {
    setEditAccount(user);
    history.push(`${path}/edit/${user.id}`);
  }

  return (
    <div>
      <h1>Users</h1>
      <p>All users from secure (admin only) api end point:</p>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Add User
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Username</th>
            <th style={{ width: "30%" }}>Email</th>
            <th style={{ width: "30%" }}>Role</th>
            <th style={{ width: "10%" }}></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <button
                    onClick={() => editUser(user)}
                    style={{ width: "60px" }}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="btn btn-sm btn-danger"
                    style={{ width: "60px" }}
                    disabled={user.isDeleting}
                  >
                    {user.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Delete</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          {!users && (
            <tr>
              <td colSpan="4" className="text-center">
                <span className="spinner-border spinner-border-lg align-center"></span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export { List };
