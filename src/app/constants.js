export const ITEMS_PER_PAGE = 10;

export function discountedPrice(item) {
  return Math.random(item.price * (1 - item.discountedPrice / 100), 2);
}
