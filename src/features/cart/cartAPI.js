export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/api/v1/cart', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(updated) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      'http://localhost:8080/api/v1/cart/' + updated.id,
      {
        method: 'PATCH',
        body: JSON.stringify(updated),
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchItemByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      'http://localhost:8080/api/v1/cart?user=' + userId
    );
    const data = await response.json();
    resolve({ data });
  });
}
export function deleteItemFormCart(itemId) {
  return new Promise(async (resolve) => {
    await fetch(`http://localhost:8080/api/v1/cart/${itemId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    resolve({ data: { id: itemId } });
  });
}

export async function reserCart(userId) {
  // get all items of user's cart - and then delete each
  return new Promise(async (resolve) => {
    const response = await fetchItemByUserId(userId);
    const items = response.data;

    for (let item of items) {
      await deleteItemFormCart(item.id);
    }
    resolve({ status: 'success' });
  });
}
