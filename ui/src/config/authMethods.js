import firebase from './firebase-config';

export const iuProvider = new firebase.auth.OAuthProvider('microsoft.com');
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();