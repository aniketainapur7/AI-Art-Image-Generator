import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

const REGION = import.meta.env.VITE_COGNITO_REGION;
const USER_POOL_ID = import.meta.env.VITE_COGNITO_USER_POOL_ID;
const CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;

// Use localStorage for persistence
const storage = window.localStorage;

export const userPool = new CognitoUserPool({
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID,
  Storage: storage,
});

// ---------- Helpers ----------
export function getCurrentCognitoUser() {
  return userPool.getCurrentUser();
}

export function getSession() {
  return new Promise((resolve, reject) => {
    const user = getCurrentCognitoUser();
    if (!user) return resolve(null);
    user.getSession((err, session) => {
      if (err) return reject(err);
      resolve(session);
    });
  });
}

export async function isAuthenticated() {
  const session = await getSession().catch(() => null);
  return !!(session && session.isValid());
}

export function signUp({ email, password }) {
  const attrList = [new CognitoUserAttribute({ Name: "email", Value: email })];

  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attrList, null, (err, result) => {
      if (err) return reject(err);
      resolve(result); // result.user, result.userConfirmed
    });
  });
}

export function confirmSignUp({ email, code }) {
  const user = new CognitoUser({ Username: email, Pool: userPool, Storage: storage });
  return new Promise((resolve, reject) => {
    user.confirmRegistration(code, true, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

export function signIn({ email, password }) {
  const authDetails = new AuthenticationDetails({ Username: email, Password: password });
  const user = new CognitoUser({ Username: email, Pool: userPool, Storage: storage });

  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: (session) => resolve({ user, session }),
      onFailure: (err) => reject(err),
      newPasswordRequired: (userAttributes) => {
        // Handle forced password change if admin created the user
        reject({ code: "NewPasswordRequired", userAttributes });
      },
    });
  });
}

export function signOut() {
  const user = getCurrentCognitoUser();
  if (user) user.signOut();
}

export function globalSignOut() {
  const user = getCurrentCognitoUser();
  return new Promise((resolve) => {
    if (!user) return resolve();
    user.globalSignOut({
      onSuccess: () => resolve(),
      onFailure: () => resolve(), // still resolve to avoid lockups
    });
  });
}
