import { CreateUserFields } from '../types/users.types';

const baseUrl = 'http://localhost:3001/api/users';

const create = async ({ name, username, password }: CreateUserFields) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, username, password }),
  });

  const responseJson = await response.json();

  if (responseJson.error) {
    throw new Error(`${responseJson.error}`)
  }
};

const userService = { create };
export default userService; 
