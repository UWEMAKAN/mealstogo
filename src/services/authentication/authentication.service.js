import { getApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

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
    throw new Error(message);
  }
};
