import createStripe from 'stripe-client';

import { STRIPE_KEY, host } from '../../utils';

const stripe = createStripe(STRIPE_KEY);

export const cardTokenRequest = (card) => stripe.createToken({ card });

export const paymentRequest = (amount, name, token) => {
  const url = `${host}/pay`;
  return fetch(url, {
    body: JSON.stringify({ amount, name, token }),
    method: 'POST',
  }).then((res) => {
    if (res.status > 200) {
      return Promise.reject(
        new Error('Something went wrong processing your payment'),
      );
    }
    return res.json();
  });
};
