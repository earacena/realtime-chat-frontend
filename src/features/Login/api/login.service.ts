import { AuthResponse } from '../types/auth.types';

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api/login`;

interface Credentials {
  username: string;
  password: string;
}

const login = async (credentials: Credentials) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  const responseJson = await response.json();
 
  if (responseJson.error === 'invalid credentials') {
    throw new Error(`Invalid login information. Please try again`);
  } else if (responseJson.error) {
    throw new Error(`${responseJson.error}`)
  } else {
    const authResponse = AuthResponse.check(responseJson);
    return authResponse;
  }
};

const loginService = { login };
export default loginService;
