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
