export const requestUserRegistration = async ({ email, password }) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const body = JSON.stringify({
    email,
    password,
  });
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body,
    redirect: 'follow',
  };
  const response = await fetch(
    'https://callboard-backend.herokuapp.com/auth/register',
    requestOptions,
  );
  return response.json();
};
export const requestUserLogin = async ({ email, password }) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const body = JSON.stringify({
    email,
    password,
  });
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body,
    redirect: 'follow',
  };
  const response = await fetch(
    'https://callboard-backend.herokuapp.com/auth/login',
    requestOptions,
  );
  return response.json();
};
export const requestUserLogout = async ({ token }) => {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);
  const requestOptions = {
    method: 'POST',
    headers,
    redirect: 'follow',
  };
  const response = await fetch(
    'https://callboard-backend.herokuapp.com/auth/logout',
    requestOptions,
  );
  return { status: response.status, statusText: response.statusText };
};
export const requestRefreshUserCredentials = async ({ refreshToken, sid }) => {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${refreshToken}`);
  headers.append('Content-Type', 'application/json');
  const body = JSON.stringify({ sid });
  const requestOptions = {
    method: 'POST',
    headers,
    body,
    redirect: 'follow',
  };
  const response = await fetch(
    'https://callboard-backend.herokuapp.com/auth/refresh',
    requestOptions,
  );
  return response.json();
};
export const requestUserInfo = async ({ token }) => {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  const requestOptions = {
    method: 'GET',
    headers,
    redirect: 'follow',
  };

  const response = await fetch(
    'https://callboard-backend.herokuapp.com/user',
    requestOptions,
  );
  return response.json();
};
export const requestCategories = async () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const response = await fetch(
    'https://callboard-backend.herokuapp.com/call/categories',
    requestOptions,
  );
  return response.json();
};
export const requestAds = async () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  const ads = [];
  for (let i = 1; i <= 3; i += 1) {
    const response = await fetch(
      `https://callboard-backend.herokuapp.com/call?page=${i}`,
      requestOptions,
    );
    const data = await response.json();
    const obj = {};
    for (const category in data) {
      if (data.hasOwnProperty(category)) {
        obj[category] = [...data[category]];
      }
    }
    ads.push(obj);
  }
  return ads;
};
export const requestFindAds = async ({ token, query }) => {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);
  const requestOptions = {
    method: 'GET',
    headers,
    redirect: 'follow',
  };

  const response = await fetch(
    `https://callboard-backend.herokuapp.com/call/find?search=${query}`,
    requestOptions,
  );
  return response.json();
};
export const requestAddToFavorites = async ({ token, _id }) => {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  const requestOptions = {
    method: 'POST',
    headers,
    redirect: 'follow',
  };
  const response = await fetch(
    `https://callboard-backend.herokuapp.com/call/favourite/${_id}`,
    requestOptions,
  );
  return await response.json();
};
