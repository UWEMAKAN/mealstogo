import React from 'react';
import { LiteCreditCardInput } from 'react-native-credit-card-input';

import { cardTokenRequest } from '../../../services';

export const CreditCardInput = ({ name, onSuccess, onError }) => {
  const onChange = async (formData) => {
    const { status, values, valid } = formData;
    const isIncomplete = Object.values(status).includes('incomplete');
    if (!isIncomplete && valid) {
      const { number, cvc, expiry } = values;
      const [exp_month, exp_year] = expiry.split('/');
      const card = {
        number,
        exp_month,
        exp_year,
        cvc,
        name,
      };
      cardTokenRequest(card)
        .then((info) => {
          onSuccess(info);
        })
        .catch(() => onError());
    }
  };
  return <LiteCreditCardInput onChange={onChange} />;
};
