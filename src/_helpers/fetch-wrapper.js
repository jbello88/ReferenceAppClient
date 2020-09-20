export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

function get(url) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(url),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    credentials: "include",
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(url),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// helper functions +

function authHeader(url) {
  let user;
  const json = localStorage.getItem("account");
  console.log(json);
  if (json) {
    user = JSON.parse(json);
    console.log(user);
  }

  //const user = window.account;

  const isLoggedIn = user && user.jwtToken;
  const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
  if (isLoggedIn && isApiUrl) {
    console.log("Token added");
    console.log(window.account);
    return { Authorization: `Bearer ${user.jwtToken}` };
  } else {
    return {};
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
