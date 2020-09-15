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
  console.log("PPPPPPPPPPPPPP", url);
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

// helper functions

function authHeader(url) {
  let user;
  const json = localStorage.getItem("account");
  console.log(json);
  if (json) {
    user = JSON.parse(json);
    console.log(user);
  }

  //const user = window.account;
  console.log("***************************", user);

  const isLoggedIn = user && user.jwtToken;
  const isApiUrl = url.startsWith(process.env.API_URL);
  if (isLoggedIn && isApiUrl) {
    console.log("Token added");
    return { Authorization: `Bearer ${user.jwtToken}` };
  } else {
    return {};
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      /*       if ([401, 403].includes(response.status) && user) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        accountxxxService.logout();
      } */

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
