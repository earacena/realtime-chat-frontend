import { AuthResponse } from '../../Login/types/auth.types';
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
  try {
    const authResponse = AuthResponse.check(await response.json());
    return authResponse;
  } catch (error: unknown) {
    console.error(error);
  }
};

const userService = { create };
export default userService; 
