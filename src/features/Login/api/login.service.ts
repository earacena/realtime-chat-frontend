import { TokenResponse } from '../types/auth.types';

const baseUrl = 'http://localhost:3001/api/login';

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
  if (responseJson.error) {
    throw new Error(`${responseJson.error}`);
  } else {
    const tokenResponse = TokenResponse.check(responseJson);
    return tokenResponse;
  }
};

const loginService = { login };

export default loginService;