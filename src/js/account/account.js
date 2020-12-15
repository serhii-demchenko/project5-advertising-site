// Здесь нужно добавить импорт ф-ции которая рендерит мои товары
import { renderMyFav } from '../favorites/favorites';

export async function renderMyAccPage() {
  await renderMyFav();
}
