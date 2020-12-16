const requestsOptions = ({
  method,
  email,
  password,
  token,
  refreshToken,
  sid,
}) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  if (token) headers.append('Authorization', `Bearer ${token}`);
  if (refreshToken) headers.append('Authorization', `Bearer ${refreshToken}`);
  if (email || password || sid) {
    let body = {};
    if (email) body.email = email;
    if (password) body.password = password;
    if (sid) body.sid = sid;
    console.log(JSON.stringify(body));
    return {
      method,
      headers,
      body: JSON.stringify(body),
      redirect: 'follow',
    };
  }
  return {
    method,
    headers,
    redirect: 'follow',
  };
};
export const requestUserRegistration = async ({ email, password }) => {
  const response = await fetch(
    'https://callboard-backend.herokuapp.com/auth/register',
    requestsOptions({ method: 'POST', email, password }),
  );
  return response.json();
};
export const requestUserLogin = async ({ email, password }) => {
  const response = await fetch(
    'https://callboard-backend.herokuapp.com/auth/login',
    requestsOptions({ method: 'POST', email, password }),
  );
  return await response.json();
};
export const requestUserLoginGoogle = async () => {
  const response = await fetch(
    'https://callboard-backend.herokuapp.com/google',
    requestsOptions({ method: 'GET' }),
  );
  return response.json();
};
export const requestUserLogout = async ({ token }) => {
  const response = await fetch(
    'https://callboard-backend.herokuapp.com/auth/logout',
    requestsOptions({ method: 'POST', token }),
  );
  return { status: response.status, statusText: response.statusText };
};
export const requestRefreshUserCredentials = async ({ refreshToken, sid }) => {
  const response = await fetch(
    'https://callboard-backend.herokuapp.com/auth/refresh',
    requestsOptions({ method: 'POST', sid, refreshToken }),
  );
  return response.json();
};
export const requestUserInfo = async ({ token }) => {
  const response = await fetch(
    'https://callboard-backend.herokuapp.com/user',
    requestsOptions({ method: 'GET', token }),
  );
  return response.json();
};
export const requestPostProduct = async ({ token, product }) => {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);
  const formData = new FormData();
  formData.append('file', product.file);
  formData.append('description', product.description);
  formData.append('category', product.category);
  formData.append('price', product.price);
  formData.append('phone', product.phone);
  formData.append('title', product.title);
  const requestOptions = {
    method: 'POST',
    headers,
    body: formData,
    redirect: 'follow',
  };
  const response = await fetch(
    'https://callboard-backend.herokuapp.com/call',
    requestOptions,
  );
  return response.json();
};
export const requestEditProduct = async ({ token, _id, product }) => {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);
  const formData = new FormData();
  formData.append('file', product.file);
  formData.append('description', product.description);
  formData.append('category', product.category);
  formData.append('price', product.price);
  formData.append('phone', product.phone);
  formData.append('title', product.title);
  const requestOptions = {
    method: 'PATCH',
    headers,
    body: formData,
    redirect: 'follow',
  };
  const response = await fetch(
    `https://callboard-backend.herokuapp.com/call/${_id}`,
    requestOptions,
  );
  return response.json();
};
export const requestAdsPagination = async ({ page }) => {
  const response = await fetch(
    `https://callboard-backend.herokuapp.com/call?page=${page}`,
    requestsOptions({ method: 'GET' }),
  );
  return await response.json();
};
export const requestRemoveFromFavorites = async ({ token, _id }) => {
  const response = await fetch(
    `https://callboard-backend.herokuapp.com/call/favourite/${_id}`,
    requestsOptions({ method: 'DELETE', token }),
  );
  return await response.json();
};
export const requestAddToFavorites = async ({ token, _id }) => {
  const response = await fetch(
    `https://callboard-backend.herokuapp.com/call/favourite/${_id}`,
    requestsOptions({ method: 'POST', token }),
  );
  return await response.json();
};
export const requestRemoveProduct = async ({ token, _id }) => {
  const response = await fetch(
    `https://callboard-backend.herokuapp.com/call/${_id}`,
    requestsOptions({ method: 'DELETE', token }),
  );
  return await response.json();
};
export const requestUserFavorites = async ({ token }) => {
  const response = await fetch(
    'https://callboard-backend.herokuapp.com/call/favourites',
    requestsOptions({ method: 'GET', token }),
  );
  return response.json();
};
export const requestUserOwn = async ({ token }) => {
  const response = await fetch(
    'https://callboard-backend.herokuapp.com/call/own',
    requestsOptions({ method: 'GET', token }),
  );
  return response.json();
};
export const requestAdsByCategory = async ({ category }) => {
  const response = await fetch(
    `https://callboard-backend.herokuapp.com/call/specific/${category}`,
    requestsOptions({ method: 'GET' }),
  );
  return response.json();
};
export const requestFindAds = async ({ query }) => {
  const response = await fetch(
    `https://callboard-backend.herokuapp.com/call/find?search=${query}`,
    requestsOptions({ method: 'GET' }),
  );
  return response.json();
};
export const requestCategories = async () => {
  const response = await fetch(
    'https://callboard-backend.herokuapp.com/call/categories',
    requestsOptions({ method: 'GET' }),
  );
  return response.json();
};
