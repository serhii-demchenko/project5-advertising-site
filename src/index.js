import './scss/main.scss';
import {
  requestUserRegistration,
  requestUserLogin,
  requestUserLogout,
} from './js/helpers';

// requestUserRegistration({
//   email: 'swok@kh.com',
//   password: 'Qwe1234',
// })
//   .then(console.log)
//   .catch(e => {
//     console.log('ss');
//   });
// requestUserLogout({ token: localStorage.getItem('accessToken') })
//   .then(console.log)
//   .catch(e => {
//     console.log(e);
//   });
// requestUserLogin({
//   email: 'swok@kh.com',
//   password: 'Qwe1234',
// })
//   .then(r => {
//     localStorage.setItem('accessToken', r.accessToken);
//     localStorage.setItem('refreshToken', r.refreshToken);
//     localStorage.setItem('sid', r.sid);
//   })
//   .catch(e => {
//     console.log('ss');
//   });
