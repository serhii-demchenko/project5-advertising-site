// User registration
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
  if (response.status === 409 || response.status === 400) {
    return {
      status: response.status,
      statusText: response.statusText,
    };
  }
  return response.json();
};
