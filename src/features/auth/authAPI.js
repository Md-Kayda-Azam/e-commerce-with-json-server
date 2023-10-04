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
    const email = loggedInfo.email;
    const password = loggedInfo.password;
    const response = await fetch('http://localhost:8080/users?email=' + email);
    const data = await response.json();
    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: 'wrong credentials' });
      }
    } else {
      reject({ message: 'User not found' });
    }
    resolve({ data });
  });
}

export function signOut(userData) {
  return new Promise(async (resolve, reject) => {
    resolve({ data: 'Log out successfull' });
  });
}
