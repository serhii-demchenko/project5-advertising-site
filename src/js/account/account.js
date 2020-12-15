// Здесь нужно добавить импорт ф-ции которая рендерит мои товары
import { renderMyFav } from '../favorites/favorites';
import { renderMyCalls } from '../my-calls/my-calls';

export async function renderMyAccPage() {
  await renderMyFav();
  await renderMyCalls();
}
