import { fetchWrapper, history } from "../_helpers";

const baseUrl = `${process.env.REACT_APP_API_URL}/accounts`;

export const accountService = {
  login,
  logout,
  refreshToken,
  register,
  verifyEmail,
  forgotPassword,
  validateResetToken,
  resetPassword,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  setToken,
};

function login(email, password) {
  return fetchWrapper.post(`${baseUrl}/authenticate`, { email, password });
}

function logout() {
  // revoke token, stop refresh timer, publish null to user subscribers and redirect to login page
  fetchWrapper.post(`${baseUrl}/revoke-token`, {});

  history.push("/"); // where should this go?????
}

function refreshToken() {
  return fetchWrapper.post(`${baseUrl}/refresh-token`, {});
}

function register(params) {
  return fetchWrapper.post(`${baseUrl}/register`, params);
}

function verifyEmail(token) {
  return fetchWrapper.post(`${baseUrl}/verify-email`, { token });
}

function forgotPassword(email) {
  return fetchWrapper.post(`${baseUrl}/forgot-password`, { email });
}

function validateResetToken(token) {
  return fetchWrapper.post(`${baseUrl}/validate-reset-token`, { token });
}

function resetPassword({ token, password, confirmPassword }) {
  return fetchWrapper.post(`${baseUrl}/reset-password`, {
    token,
    password,
    confirmPassword,
  });
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
  console.log(params);
  return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`).then((x) => {
    // auto logout if the logged in user deleted their own record
    /*     if (id === .value.id) {
      logout();
    } */
    return x;
  });
}

function setToken(jwtToken) {
  fetchWrapper.setToken(jwtToken);
}
