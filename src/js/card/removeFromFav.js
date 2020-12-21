import { findCheckedCard } from './card';
import { delFavItem } from '../favorites/remove-favorite';
import { changeFavoriteStyle } from './card';

// Замена иконки сердечко при удалении из Избранного
export async function removeAddToFavorites(event) {
  const selector = findCheckedCard(event, 'card');
  await delFavItem(event);
  changeFavoriteStyle(
    selector,
    '.card__favorite-btn',
    '.card__favorite-btn--orange',
    'block',
    'none',
  );
}
