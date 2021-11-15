import { getApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

export const loginRequest = async (email, password) => {
  const app = getApp();
  const auth = getAuth(app);

  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    const message = err.message
      .toString()
      .split('/')[1]
      .split(')')[0]
      .split('-')
      .join(' ');
    console.log(err.toString());
    const newMessage = `${message.charAt(0).toUpperCase()}${message.slice(1)}`;
    throw new Error(newMessage);
  }
};

export const registerRequest = async (email, password, confirmPassword) => {
  const app = getApp();
  const auth = getAuth(app);

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    const message = err.message
      .toString()
      .split('/')[1]
      .split(')')[0]
      .split('-')
      .join(' ');
    console.log(err.toString());
    const newMessage = `${message.charAt(0).toUpperCase()}${message.slice(1)}`;
    throw new Error(newMessage);
  }
};
