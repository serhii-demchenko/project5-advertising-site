# Helpers and API

First import:

```js
import { 'the functions you need' } from '{PATH to SRC/js}/helpers';
```

## Helpers

- `setUrlHash(hash)` - changing url hash without page reload.

## API

### Functions for working with API

!!!all of these functions return promise

- `requestUserRegistration({ email, password })`

- `requestUserLogin({ email, password })`

- `requestUserLogout({ token })`

- `requestRefreshUserCredentials({ refreshToken, sid })`

- `requestUserInfo({ token })`
