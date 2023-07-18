// needs jwt-decode library: npm install jwt-decode
import jwt_decode from "jwt-decode";
import { Token } from "./models/Token.model";

export const authUserGuard = () => {
  return getRole().includes("ROLE_USER");
};

export const authAdminGuard = () => {
  return getRole().includes("ROLE_ADMIN");
};

const getRole = () => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    const decodedToken = jwt_decode(token) as Token;
    if (decodedToken?.scope) {
      return decodedToken.scope.split(' ');
    }
  }
  return [];
}


