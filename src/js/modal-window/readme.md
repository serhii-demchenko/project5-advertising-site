# Add modal window manual

## Steps fo adding modal window

- import a functions

  ```js
  import { openModal, closeModal } from '{path to SRC/JS}/modal';
  ```

- For opening modal window, call function `openModal`. Example:

    - Inserting `<p>` into modal:

    ```js
    openModal('<p>Lorem ipsum dolor sit </p>');
    ```

    - Inserting `handlebars template` into modal"

    ```js
    openModal(yourHbsTemplate());
    ```

    - Inserting `DOMElement` into modal

    ```js
    const el = document.createElement('p');
    el.textContent = 'Lorem ipsum dolor sit ';

    openModal(el);
    ```

- For closing modal window call `closeModal()`. Example:

  ```js
  closeModal();
  ```

## After calling function `closeModal()`, modal window with all of items will delete from DOM
