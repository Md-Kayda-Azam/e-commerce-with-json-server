export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function checkUser(loggedInfo) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch('http://localhost:8080/auth', {
      method: 'POST',
      body: JSON.stringify(loggedInfo),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function signOut(userData) {
  return new Promise(async (resolve, reject) => {
    resolve({ data: 'Log out successfull' });
  });
}
