import jwt_decode from "jwt-decode";
import { User } from "../models/user.model";
import { AuthToken } from "../models/authToken.model";

export const roleUserGuard = () => {
  return checkRoleFromToken("ROLE_USER");
}

export const roleAdminGuard = () => {
  return checkRoleFromToken("ROLE_ADMIN");
}

const checkRoleFromToken = (userRole: string) => {
  // récupérer le JWT (header.body.signature)
  const token = localStorage.getItem('auth_token');
  if (token) {
    // le "decoder"
    var decoded = jwt_decode(token) as AuthToken;

    // récupérer les rôles la dedans
    // scope: "ROLE_ADMIN ROLE_USER"
    const roles = decoded.scope.split(' ');
    return roles.some((role) => role === userRole);
  }

  return false;
}

const userHasRole = (userRole: string) => {
  // récupère les rôles de l'utilisateur : à partir d'un objet user
  const userJson = localStorage.getItem('user');
  // TODO vérifier que le JSON est correctement formatté
  if (userJson) {
    const user = JSON.parse(userJson) as User;
    return user.roles.some((role) => role.name === userRole);
  }
  return false;
}
